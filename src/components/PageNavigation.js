import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePageAction } from '../../actions/searchAction';
import { FlatList, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';

class PageNavigation extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedPage: this.props.searchStore.page,
      maxPageCount: this.props.maxPageCount
    }
  }

  pagePressButtonOnclick(value){
    this.setState({ selectedPage: value })
    this.props.changePage(value);
  }

  componentDidUpdate(){
    if (this.props.searchStore.page !== this.state.selectedPage) {
      this.setState({ selectedPage: this.props.searchStore.page })
    }
  }

  render() {
    
    const pages = [];

    for (let i = 0; i < this.props.maxPageCount; i += 1) {
      pages.push(i+1);
    }

    return (
      <View style={ styles.container }>
        <FlatList
          data={ pages }
          showsVerticalScrollIndicator={ false }
          renderItem={({ item }) => {

            let pageNumberStyles = styles.pageUnselected;

            if (item === this.state.selectedPage) {
              pageNumberStyles = styles.pageSelected;
            }

            const style = Object.assign({}, pageNumberStyles, styles.pageText)
            
            return (
              <TouchableWithoutFeedback 
                onPress={() => this.pagePressButtonOnclick(item)}
              >
                <Text style={ style }>{ item }</Text>
              </TouchableWithoutFeedback>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    marginTop:'25%',
    marginBottom:'15%',
    marginRight: 0,
    alignSelf: 'baseline'
  },
  pageText: {
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom:15,
    textAlign:'center'
  },
  pageSelected: {
    backgroundColor: 'black',
    color:'white',
    fontWeight:'bold',
  },
  pageUnselected: {
    backgroundColor: 'rgb(210,210,210)',
    color: 'rgb(150, 150, 150)'
  }
})

PageNavigation.propTypes = {
  maxPageCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

const mapStateToProps = (state) => ({
  searchStore: state.searchReducer
})

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => dispatch(changePageAction(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageNavigation)

