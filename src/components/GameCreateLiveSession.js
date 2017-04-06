import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { gameUpdate, createNewGame, onStart, onStop, onReset, tick } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';
import Stopwatch from './Stopwatch';

class GameCreateLiveSession extends Component {
  onButtonPress() {
    const { stake, gameType, location, limitType, buyIn, note, tips } = this.props;
    this.props.createNewGame({
      stake,
      gameType,
      location,
      limitType,
      buyIn,
      note,
      tips
      });
  }

  render() {
    return (
      <View>
          <Stopwatch {...this.props} />
        <Card>
          <GameForm {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { stake, gameType, location, limitType, buyIn, note, tips } = state.stopwatch;

  return { stake, gameType, location, limitType, buyIn, note, tips };
};

export default connect(mapStateToProps, { gameUpdate, createNewGame, onStart, onStop, onReset, tick })(GameCreateLiveSession);
