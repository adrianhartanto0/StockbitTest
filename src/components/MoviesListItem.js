import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { saveImdbAction } from '../../actions/moviesAction';
import Modal from 'react-native-modal'
import CancelButtonIcon from '../../assets/cancel/cancel.png'
import EmptyPosterfrom from '../../assets/empty.png'


class MovieListItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      showMoviePoster: false,
      imdbID: this.props.imdbID
    }
  }

  onPressMoviePoster = () => {
    this.setState({ showMoviePoster: !this.state.showMoviePoster })
  }

  onPressMovie = () => {
    this.props.saveMovieIMDB(this.props.imdbID)
  }

  render() {

    const { moviePosterURL, movieName, movieReleaseYear } = this.props;

    let movieUrl = { uri: moviePosterURL }

    if (moviePosterURL === 'N/A') {
      movieUrl = EmptyPosterfrom
    }

    return (
      <View style={ styles.listItemContainer }>
        <TouchableOpacity onPress={ this.onPressMoviePoster }>
          <Image 
            source={movieUrl} 
            style={{ width: 70, height: 90 }}
          />
        </TouchableOpacity>
        <View style={ styles.movieDetailContainer }>
          <TouchableOpacity onPress={ this.onPressMovie } >
            <Text style={ styles.movieName }>
              { movieName }
            </Text>
          </TouchableOpacity>
          <Text>
            { movieReleaseYear }
          </Text>
        </View>
        <Modal isVisible={ this.state.showMoviePoster }>
          <View>
            <Image 
              source={{ uri: this.props.moviePosterURL }} 
              style={ styles.moviePoster }
            />
            <View>
              <TouchableOpacity
                onPress={ this.onPressMoviePoster }
                style={ styles.closePosterContainer }
              >
                <Image 
                  source={ CancelButtonIcon } 
                  style={{ width: 15, height: 15 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10, 
    paddingRight: 20,
    marginRight: 20,
    marginBottom: 15
  },
  movieDetailContainer: {
    marginLeft: 15,
    flexGrow: 1,
    flex: 1,
    width: 0
  },
  movieName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10
  },
  moviePoster: {
    width: '98%', 
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  closePosterContainer: {
    backgroundColor:'white',
    marginTop:20, 
    padding:10, 
    borderRadius:50, 
    marginRight:'auto', 
    marginLeft:'auto', 
    alignSelf:'flex-start'
  }
})

MovieListItem.propTypes = {
  movieName: PropTypes.string,
  imdbID: PropTypes.string,
  moviePosterURL: PropTypes.string,
  movieReleaseYear: PropTypes.oneOfType([
    PropTypes.string,
  ])
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  saveMovieIMDB: (imdbID) => dispatch(saveImdbAction(imdbID))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListItem)