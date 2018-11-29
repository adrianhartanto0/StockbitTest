import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editQueryAction } from '../../../actions/searchAction';
import { TouchableOpacity, Image, View, StatusBar, StyleSheet } from 'react-native';
import BackButtonIcon from '../../../assets/back/back.png'

class MovieDetailHeader extends Component {
  
  render(){
    return (
      <View style={ styles.headerContainer }>
        <TouchableOpacity
          onPress={() => { this.props.onBackHandler() }}
        >
          <Image 
            source={ BackButtonIcon } 
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15, 
    paddingTop: 20, 
    paddingLeft: 16,
    paddingRight: 16,
    height: 40,
    backgroundColor: 'white'
  },
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
)(MovieDetailHeader)