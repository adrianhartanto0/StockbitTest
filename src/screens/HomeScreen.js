import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MoviesList from '../components/MoviesList'
import SearchMovies from '../components/header/SearchMovies'

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedImdb: this.props.movieStore.selectedImdbID
    }
  }

  static navigationOptions = {
    header: null
  };

  componentDidUpdate(){
    const { selectedImdbID } = this.props.movieStore
    
    if (this.state.selectedImdb !== selectedImdbID) {
      this.setState({ selectedImdb: selectedImdbID })
      if (selectedImdbID !== '') {
        const { navigate } = this.props.navigation;
        navigate('MovieDetail');
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchMovies />
        <MoviesList />
      </View>
    )
  } 
}

const mapStateToProps = (state) => ({
  movieStore: state.movieReducer
})

export default connect(
  mapStateToProps
)(HomeScreen)