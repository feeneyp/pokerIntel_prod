import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameUpdate, createNewGame } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';

class GameCreateCompletedSession extends Component {
  onButtonPress() {
    const { stake, gameType, location, limitType, buyIn, note, tips } = this.props;
    this.props.createNewGame({
      stake: stake,
      gameType: gameType,
      location: location,
      limitType: limitType,
      buyIn,
      note,
      tips
      });
  }

  render() {
    return (
      <Card>
        <GameForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { stake, gameType, location, limitType, buyIn, note, tips } = state.gameForm;

  return { stake, gameType, location, limitType, buyIn, note, tips };
};

export default connect(mapStateToProps, {gameUpdate, createNewGame})(GameCreateCompletedSession);
