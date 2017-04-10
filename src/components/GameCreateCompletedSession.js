import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { gameUpdate, createNewGame } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';


class GameCreateCompletedSession extends Component {
  onButtonPress() {
    const { stake, gameType, location, limitType, buyIn, 
      note, tips, startDate, startTime, endDate, endTime, cashOut } = this.props;
    this.props.createNewGame({
      stake,
      gameType,
      location,
      limitType,
      buyIn,
      note,
      tips,
      startDate,
      startTime,
      endDate,
      endTime,
      cashOut
      });
  }

  render() {
    this.props.gameUpdate({ prop: 'gameCompleted', value: true });
    return (
      <ScrollView>
        <Card>
          <GameForm />
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
  const { stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut } = state.gameForm;

  return { stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut };
};

export default connect(mapStateToProps, { gameUpdate, createNewGame })(GameCreateCompletedSession);
