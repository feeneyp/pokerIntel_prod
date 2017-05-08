import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { gameUpdate, createNewGameInFB } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';


class GameCreateCompletedSession extends Component {

  componentWillMount() {
    //this is for the logic in DateTimePicker which conditionally 
    //makes start and end fields appear only as stopwatch buttons tapped
    this.props.gameUpdate({ prop: 'gameCompleted', value: true });
  }

  onButtonPress() {

    const { elapsedTime, stake, gameType, location, limitType, buyIn, 
    note, tips, startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut } = this.props;
    this.props.createNewGameInFB({
      elapsedTime,
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
      startEndISOFormat,
      gameDuration,
      cashOut
      });
    console.log('this.props in gamecreate(completed) is: ' + JSON.stringify(this.props));
  }


  render() {
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
  const { elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut } = state.gameForm;
   
      //console.log('state from mstp in gcreatecompleted is : ' + JSON.stringify(state));

  return { elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut };
};

export default connect(mapStateToProps, { gameUpdate, createNewGameInFB })(GameCreateCompletedSession);
