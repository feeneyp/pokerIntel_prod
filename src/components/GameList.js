import React, {Component} from 'react';
import firebase from 'firebase';
import {Card, CardSection} from './common';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { firebaseFetch } from '../actions';
import ListItem from './ListItem';


class GameList extends Component {

	componentWillMount() {
    console.log('gamelist component will mount called');
    const { currentUser } = firebase.auth();
    const userId = currentUser.uid;
    const path = '/users/' + userId + '/games';
    this.props.firebaseFetch(path, 'FB_GAMES_FETCH_SUCCESS');
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
    //console.log('loggin game: ' + JSON.stringify(game, null, 4));
    console.log('--------------------------------');
    return <ListItem game={game} />;
  }
    
  render() {
    console.log('this.props.games from gamelist render is : ' + JSON.stringify(this.props.games));

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
    }); //_map creates list of game objects [object, object, object,..]
  return ({ games });  //returns object with key-'games' 
                         //and value of games which is list of game objects
 };

export default connect(mapStateToProps, { firebaseFetch })(GameList);

