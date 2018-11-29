import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { throttle } from "throttle-debounce"

import { getSearchURL } from '../utility'
import MovieListItem from './MoviesListItem'
import PageNavigation from './PageNavigation'
import RefreshPNG from '../../assets/refresh/refresh.png'
import { saveMoviesAction } from '../../actions/moviesAction';
import { PADDING_LEFT, PADDING_RIGHT } from '../constants'

class MoviesList extends Component {

  constructor(props) {
    super(props);

    const { page, query } = this.props.searchStore;
    const movieStore = this.props.movieStore;

    this.state = {
      movies: movieStore.movies,
      searchQuery: query,
      moviePage: page,
      noOfPage: 0,
      loading: true,
      error: false
    }

    this.throttledFetchMovies = throttle(1000, this.fetchMovies);
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies() {

    this.setState({ loading: true, error: false })

    const { searchQuery, moviePage } = this.state;
    const errorState = { loading: false, error: true };

    if (searchQuery.length > 0) {
      return fetch(
        getSearchURL('faf7e5bb', searchQuery, moviePage)
      )
      .then(res => res.json())
      .then((resJSON) => { 
        let newState = errorState
  
        if (resJSON.Response === "True") {
          newState = { 
            movies: resJSON.Search,
            noOfPage: Math.ceil(resJSON.totalResults / resJSON.Search.length),
            loading: false,
          };
          this.props.saveMovies(newState.movies);
        }
  
        this.setState(newState)
      })
      .catch(() => this.setState(errorState))
    } else {
      this.setState({ movies: [], loading: false, error: false })
    }
  }

  componentDidUpdate() {
    const { query, page } = this.props.searchStore;
    const newState = {};

    if (query !== this.state.searchQuery){
      newState.searchQuery = query
    }
    
    if (page !== this.state.moviePage) {
      newState.moviePage = page;
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState, () => this.throttledFetchMovies())
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={ styles.loadingContainer }>
          <ActivityIndicator 
            size="small" 
            color="#6c6c6c" 
          />
          <Text 
            style={styles.loadingText}
          >
            Loading Movies
          </Text>
        </View>
      )
    } else if (this.state.error) {
      return (
        <TouchableOpacity 
          onPress={ this.fetchMovies } 
          style={ styles.loadingContainer }
        >
          <Image 
            source={ RefreshPNG } 
            style={ styles.refreshIcon } 
          />
          <Text 
            style={ styles.errorText }
          >
            Error Occured.
          </Text>
        </TouchableOpacity>
      )
    }

    if (this.state.movies.length > 0) {
      return (
        <View style={ styles.container }>
          <FlatList
            data={ this.state.movies }
            showsVerticalScrollIndicator={ false }
            renderItem={({item}) => 
              <MovieListItem 
                imdbID={ item.imdbID }
                movieName={ item.Title } 
                movieReleaseYear={ item.Year }
                moviePosterURL={ item.Poster } 
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
          <PageNavigation maxPageCount={ this.state.noOfPage } />
        </View>
      )
    } else {
      return (
        <View style={ styles.container }>
        </View>
      )
    }
  } 
}

const styles = StyleSheet.create({
  container: {
    marginLeft: PADDING_LEFT,
    marginRight: PADDING_RIGHT,
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  refreshIcon: {
    height: 20,
    width: 20
  },
  loadingText: {
    marginTop: 12, 
    textAlign: 'center',
    color: '#6c6c6c',
  },
  errorText: {
    marginTop: 12, 
    textAlign: 'center',
    color: 'black',
  }
})

const mapStateToProps = (state) => ({
  searchStore: state.searchReducer,
  movieStore: state.movieReducer
})

const mapDispatchToProps = (dispatch) => ({
  saveMovies: (movies) => dispatch(saveMoviesAction(movies)),
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MoviesList)
