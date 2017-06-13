import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { timerDisplayed, gameUpdate, createNewGameInFB, onStart, onStop, onReset, tick } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';
import Stopwatch from './Stopwatch';

class GameCreateLiveSession extends Component {

  componentWillMount() {
    this.props.timerDisplayed();
  }

  onButtonPress() {
    const { elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
    startDate, startTime, endDate, endTime,  startEndISOFormat, gameDuration, cashOut } = this.props;
    this.props.createNewGameInFB({ elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
    startDate, startTime, endDate, endTime,  startEndISOFormat, gameDuration, cashOut });
  }

  render() {
    return (
      <ScrollView>
          <Stopwatch />
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
  const { elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
    startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut } = state.gameForm;

  return { elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
    startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut };
};

export default connect(mapStateToProps, { timerDisplayed, gameUpdate, createNewGameInFB, onStart, onStop, onReset, tick })(GameCreateLiveSession);
