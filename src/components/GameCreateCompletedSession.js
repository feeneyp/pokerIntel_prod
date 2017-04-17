import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { gameUpdate, createNewGameInFB } from '../actions';
import { Card, CardSection, Button } from './common';
import GameForm from './GameForm';


class GameCreateCompletedSession extends Component {

  componentWillMount() {

    // const { startEndISOFormat } = this.props;
    // let { year, month, day } = startEndISOFormat.startDate;
    // let { hour, minute } = startEndISOFormat.startTime;
    // const gameStart = new Date(year, month, day, hour, minute);
    // ({ year, month, day } = startEndISOFormat.endDate);
    // ({ hour, minute } = startEndISOFormat.endTime);
    // const gameEnd = new Date(year, month, day, hour, minute);
    // console.log('||||||||||||||||||||||||||||||||||||');
    // console.log('DATE AND TIME LOGS');
    // console.log('this.startEndISOFormat is: ' + JSON.stringify(startEndISOFormat));
    // console.log('|||||||||||||||||||||||||||||||||||');
    // console.log('gameStart is: '+gameStart);
    // console.log('gameEnd is: '+gameEnd);
    // const duration = (gameEnd - gameStart)/(60*60*1000) * 10 / 10.0;
    // console.log('duration is: '+duration);
    // //this.props.gameUpdate({ prop: 'gameDuration', value: duration });
    // console.log('gameduration about to be updated by props.gameupdate');
    // console.log('gameDuration in props is: ' + this.props.gameDuration);



    //this is for the logic in DateTimePicker which conditionally 
    //makes start and end fields appear only as stopwatch buttons tapped
    this.props.gameUpdate({ prop: 'gameCompleted', value: true });
    // this.props.gameUpdate({ prop: 'gameDuration', value: 123 });
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
