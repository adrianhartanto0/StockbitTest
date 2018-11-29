import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MovieDetailHeader from '../components/header/MovieDetailHeader';
import { PADDING_LEFT, PADDING_RIGHT } from '../constants'
import { saveImdbAction } from '../../actions/moviesAction';
import EmptyPosterfrom from '../../assets/empty.png'

class MovieDetail extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      moviePosterURL: '',
      movieName: '',
      movieYear:'',
    }
  }

  componentDidMount(){
    const { Poster, Title, Year } = this.getSelectedMovie();
    this.setState({
      moviePosterURL: Poster,
      movieName: Title,
      movieYear: Year
    })
  }

  componentWillUnmount(){
    this.props.saveMovieIMDB(''); 
  }

  getSelectedMovie() {
    const { movies, selectedImdbID } = this.props.movieStore;

    const selectedMovie = movies.filter(
      movie => movie.imdbID === selectedImdbID
    )

    return selectedMovie.pop();
  }

  render() {

    let view;
    const { moviePosterURL, movieName, movieYear } = this.state;

    if ((moviePosterURL !== '') && (movieName !== '') && (movieYear !== '')) {

      let movieUrl = { uri: moviePosterURL };

      if (moviePosterURL === 'N/A') {
        movieUrl = EmptyPosterfrom;
      }

      view = (
        <View style={{flex: 1}}>
          <MovieDetailHeader 
            onBackHandler={ this.props.navigation.pop } 
          />
          <View style={ styles.container }>
            <Image 
              source={ movieUrl } 
              style={ styles.posterURL } 
            />
            <View style={ styles.movieDetailContainer }>
              <Text style={ styles.movieName }>
                { movieName }
              </Text>
              <Text>{ movieYear }</Text>
            </View>
          </View>
        </View>

      )
    } else {
      view = (
        <View></View>
      ) 
    }

    return view;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10, 
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    marginTop: 20
  },
  posterURL: {
    width: '45%',
    height: '40%',
  },
  movieName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 15,
  },
  movieDetailContainer: {
    marginLeft: 12,
    flexGrow: 1,
    flex: 1,
    width: 0
  },
});

const mapStateToProps = (state) => ({
  movieStore: state.movieReducer
});

const mapDispatchToProps = (dispatch) => ({
  saveMovieIMDB: (imdbID) => dispatch(saveImdbAction(imdbID))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MovieDetail)
