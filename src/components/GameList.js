import React, {Component} from 'react';
import {Card, CardSection} from './common';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { gamesFetch } from '../actions';
import ListItem from './ListItem';


class GameList extends Component {

	componentWillMount(state) {
    console.log('comp will mount called');
    this.props.gamesFetch(state);
    this.createDataSource(this.props);
  }	


  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ games }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(games);
    // console.log('--------------------------------');
    // console.log('loggin {games}: ' + JSON.stringify({games}, null, 4));
    // console.log('--------------------------------');
  }

  renderRow(game) {
    console.log('loggin game: ' + JSON.stringify(game, null, 4));
    console.log('--------------------------------');
    return <ListItem game={game} />;
  }
    
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
      );
    }
  }


const mapStateToProps = (state) => {

  const games = _.map(state.games, (val, uid) => {
    return { ...val, uid }; 
    }); //_map creates list of objects
  return ({ games });  //returns object with key-'game' 
                         //and value of list of objects
 };

export default connect(mapStateToProps, { gamesFetch })(GameList);

