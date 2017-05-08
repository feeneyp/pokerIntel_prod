import React, { Component } from 'react';
var moment = require('moment');
import { connect } from 'react-redux';
import { DatePickerAndroid, TimePickerAndroid, View, Text, TouchableOpacity } from 'react-native';
import { gameUpdate } from '../actions';
import { CardSection } from './common/CardSection';

class DateTimePickerAndroid extends Component { 

  showDatePicker = async (prop, options) => {
    try {
      let { action, year, month, day } = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = moment(new Date(year, month, day)).format('ll');
        this.props.gameUpdate({ prop, value: date });
        this.props.gameUpdate({ prop: 'startEndISOFormat', value: { ...this.props.startEndISOFormat, [prop]: { year, month, day } } });
      
              const { startEndISOFormat } = this.props;
              ({ year, month, day } = startEndISOFormat.startDate);
              let { hour, minute } = startEndISOFormat.startTime;
              const gameStart = new Date(year, month, day, hour, minute);
              ({ year, month, day } = startEndISOFormat.endDate);
              ({ hour, minute } = startEndISOFormat.endTime);
              const gameEnd = new Date(year, month, day, hour, minute);
              console.log('||||||||||||||||||||||||||||||||||||');
              console.log('DATE AND TIME LOGS');
              console.log('this.startEndISOFormat is: ' + JSON.stringify(startEndISOFormat));
              console.log('|||||||||||||||||||||||||||||||||||');
              console.log('gameStart is: ' + gameStart);
              console.log('gameEnd is: ' + gameEnd);
              const duration = Math.round((gameEnd - gameStart)/(60*60*1000) * 10) / 10.0;
              console.log('duration is: ' + duration);
              //this.props.gameUpdate({ prop: 'gameDuration', value: duration });
              console.log('gameduration about to be updated by props.gameupdate');
              this.props.gameUpdate({ prop: 'gameDuration', value: duration });
              console.log('gameDuration in props is: ' + this.props.gameDuration);
        }
    } catch ({ code, message }) {
      console.warn('Error in example: ', message);
    }
  };


  showTimePicker = async (prop, options) => {
    try {
      let { action, hour, minute } = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        const time = moment(new Date(0, 0, 0, hour, minute)).format('LT');
        this.props.gameUpdate({ prop, value: time });
        this.props.gameUpdate({ prop: 'startEndISOFormat', value: { ...this.props.startEndISOFormat, [prop]: { hour, minute } } });

            const { startEndISOFormat } = this.props;
            let { year, month, day } = startEndISOFormat.startDate;
            ({ hour, minute } = startEndISOFormat.startTime);
            const gameStart = new Date(year, month, day, hour, minute);
            ({ year, month, day } = startEndISOFormat.endDate);
            ({ hour, minute } = startEndISOFormat.endTime);
            const gameEnd = new Date(year, month, day, hour, minute);
            console.log('||||||||||||||||||||||||||||||||||||');
            console.log('DATE AND TIME LOGS');
            console.log('this.startEndISOFormat is: ' + JSON.stringify(startEndISOFormat));
            console.log('|||||||||||||||||||||||||||||||||||');
            console.log('gameStart is: '+gameStart);
            console.log('gameEnd is: '+gameEnd);
            const duration = Math.round((gameEnd - gameStart)/(60*60*1000) * 10) / 10.0;
            console.log('duration is: '+duration);
            //this.props.gameUpdate({ prop: 'gameDuration', value: duration });
            console.log('gameduration about to be updated by props.gameupdate');
            this.props.gameUpdate({ prop: 'gameDuration', value: duration });
            console.log('gameDuration in props is: ' + this.props.gameDuration);
      } else if (action === TimePickerAndroid.dismissedAction) {
            //boilerplate code had code in here
      }
    } catch ({ code, message }) {
      console.warn('Error in example: ', message);
    }
  };


  render() {
    const StartDateTimeComponent = () => {
      if (!this.props.running && !this.props.gameCompleted) {
        return null;
      }
      return (
        <CardSection style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.containerStyle}>
            <Text style={styles.labelTextStyle}>Start Date</Text>
            <TouchableOpacity onPress={this.showDatePicker.bind(this, 'startDate', {})} >
              <Text style={styles.dateTextStyle}>{this.props.startDate}</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.containerStyle}>
              <Text style={styles.labelTextStyle}>Start Time</Text>
            <TouchableOpacity onPress={this.showTimePicker.bind(this, 'startTime', {})} >
              <Text style={styles.timeTextStyle}>{this.props.startTime}</Text>
            </TouchableOpacity>
          </View>
        </CardSection>
      );
    };

    const EndDateTimeComponent = () => {
      if (!this.props.gameCompleted) {
        return null;
      }
      return (
        <CardSection style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.containerStyle}>
            <Text style={styles.labelTextStyle}>End Date</Text>
            <TouchableOpacity onPress={this.showDatePicker.bind(this, 'endDate', {})} >
              <Text style={styles.dateTextStyle}>{this.props.endDate}</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.containerStyle}>
              <Text style={styles.labelTextStyle}>End Time</Text>
            <TouchableOpacity onPress={this.showTimePicker.bind(this, 'endTime', {})} >
              <Text style={styles.timeTextStyle}>{this.props.endTime}</Text>
            </TouchableOpacity>
          </View>
        </CardSection>
      );
    };


    return (
      <View>
        <StartDateTimeComponent />
        <EndDateTimeComponent />
      </View>	
    );
  }
}  


const styles = {
  containerStyle: {
    flexDirection: 'column',
    margin: 15,
  },
  labelTextStyle: {
    color: 'white',
    fontSize: 18,
  },
  dateTextStyle: {
    backgroundColor: 'black',
    color: 'gray',
    fontSize: 18,
    padding: 5
  },
  timeTextStyle: {
    backgroundColor: 'black',
    color: 'gray',
    fontSize: 18,
    padding: 5
  }
};


const mapStateToProps = (state) => {
  const { startDate, startTime, endDate, endTime, startEndISOFormat, running, gameDuration, gameCompleted } = state.gameForm;
  return { startDate, startTime, endDate, endTime, startEndISOFormat, running, gameDuration, gameCompleted };
};

export default connect(mapStateToProps, { gameUpdate })(DateTimePickerAndroid);

