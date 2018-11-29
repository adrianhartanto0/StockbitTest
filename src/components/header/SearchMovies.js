import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editQueryAction } from '../../../actions/searchAction';
import { TouchableOpacity, Image, View, TextInput, StyleSheet } from 'react-native';
import CancelButtonPNG from '../../../assets/cancel/cancel.png'
import { PADDING_LEFT, PADDING_RIGHT } from '../../constants'

class SearchMovies extends Component {
  render(){
    return (
      <View style={ styles.headerContainer }>
        <TextInput
          style={ styles.searchField }
          onChangeText={ (text) => this.props.editQuery(text) }
          value={ this.props.searchStore.query }
          placeholder={ 'Search Movie' }
        />
        <TouchableOpacity
          onPress={() => { this.props.editQuery('') }}
          style={ styles.cancelButtonContainer }
        >
          <Image 
            source={ CancelButtonPNG } 
            style={ styles.cancelButton }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40, 
    marginBottom: 25,
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    height: 40,
    flexDirection: 'row',
  },
  searchField: {
    height:'100%',
    backgroundColor: 'rgb(240,240,240)',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 30
  },
  cancelButtonContainer: {
    position: 'absolute',
    right: 25,
    top: 12,
    padding: 2,
  },
  cancelButton: {
    width: 12,
    height: 12
  }
})

const mapStateToProps = (state) => ({
  searchStore: state.searchReducer
})

const mapDispatchToProps = (dispatch) => ({
  editQuery: (query) => dispatch(editQueryAction(query))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SearchMovies)