import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { gameUpdate, createNewGame, onStart, onStop, onReset, tick } from '../actions';
import { Card, CardSection, Button } from './common';
import GameFormLive from './GameFormLive';
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
      <ScrollView>
          <Stopwatch {...this.props} />
        <Card>
          <GameFormLive {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { stake, gameType, location, limitType, buyIn, note, tips } = state.gameForm;

  return { stake, gameType, location, limitType, buyIn, note, tips };
};

export default connect(mapStateToProps, { gameUpdate, createNewGame, onStart, onStop, onReset, tick })(GameCreateLiveSession);
