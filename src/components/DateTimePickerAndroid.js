import React from 'react';
var moment = require('moment');
import { DatePickerAndroid, TimePickerAndroid, View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common/CardSection';

export default class DateTimePickerStartEndAndroid extends React.Component {

  showDatePicker = async (stateKey, options) => {
    try {
      const newState = {};
      const { action, year, month, day } = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        const date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };


  showTimePicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = _formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };


  render() {
    return (
      <View>
		<CardSection style={{ flexDirection: 'row', justifyContent:'space-around' }}>
		  	<View style={styles.containerStyle}>
				<Text style={styles.labelTextStyle}>Start Date</Text>
				<TouchableWithoutFeedback onPress={this.showDatePicker.bind(this, 'simple', { date: Date.now() })} >
					<Text style={styles.dateTextStyle}>{moment().format('ll').toString()}</Text>
				</TouchableWithoutFeedback>
			</View>
		  	<View style={styles.containerStyle}>
		  		<Text style={styles.labelTextStyle}>Start Time</Text>
				<TouchableWithoutFeedback onPress={this.showTimePicker.bind(this, 'simple', {})} >
					<Text style={styles.timeTextStyle}>{moment().format('LT').toString()}</Text>
				</TouchableWithoutFeedback>
			</View>
		</CardSection>

		<CardSection style={{ flexDirection: 'row', justifyContent:'space-around' }}>
		  	<View style={styles.containerStyle}>
				<Text style={styles.labelTextStyle}>End Date</Text>
				<TouchableWithoutFeedback onPress={this.showDatePicker.bind(this, 'simple', { date: Date.now() })} >
					<Text style={styles.dateTextStyle}>{moment().format('ll').toString()}</Text>
				</TouchableWithoutFeedback>
			</View>
		  	<View style={styles.containerStyle}>
		  		<Text style={styles.labelTextStyle}>End Time</Text>
				<TouchableWithoutFeedback onPress={this.showTimePicker.bind(this, 'simple', {})} >
					<Text style={styles.timeTextStyle}>{moment().format('LT').toString()}</Text>
				</TouchableWithoutFeedback>
			</View>
		</CardSection>
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
