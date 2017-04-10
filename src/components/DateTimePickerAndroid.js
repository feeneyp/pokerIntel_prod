import React from 'react';
var moment = require('moment');
import { connect } from 'react-redux';
import { DatePickerAndroid, TimePickerAndroid, View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import { gameUpdate } from '../actions';
import { CardSection } from './common/CardSection';

class DateTimePickerAndroid extends React.Component {

  showDatePicker = async (prop, options) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = moment(new Date(year,month,day)).format('ll');
        this.props.gameUpdate({ prop, value: date });
      }
    } catch ({ code, message }) {
      console.warn(`Error in example: `, message);
    }
  };


  showTimePicker = async (prop, options) => {
    const formatTime = (hour, minute) => {
      return hour + ':' + (minute < 10 ? '0' + minute : minute);
    };
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        const time = formatTime(hour, minute);
        this.props.gameUpdate({ prop, value: time });
      } else if (action === TimePickerAndroid.dismissedAction) {
        //boilerplate code had a 'dismissed' property in local state 
      }
    } catch ({code, message}) {
      console.warn(`Error in example: `, message);
    }
  };


  render() {
    return (
      <View>
		<CardSection style={{ flexDirection: 'row', justifyContent:'space-around' }}>
		  	<View style={styles.containerStyle}>
				<Text style={styles.labelTextStyle}>Start Date</Text>
				<TouchableWithoutFeedback onPress={this.showDatePicker.bind(this, 'startDate', { date: Date.now() })} >
					<Text style={styles.dateTextStyle}>{this.props.startDate}</Text>
				</TouchableWithoutFeedback>
			</View>
		  	<View style={styles.containerStyle}>
		  		<Text style={styles.labelTextStyle}>Start Time</Text>
				<TouchableWithoutFeedback onPress={this.showTimePicker.bind(this, 'startTime', {})} >
					<Text style={styles.timeTextStyle}>{this.props.startTime}</Text>
				</TouchableWithoutFeedback>
			</View>
		</CardSection>

		<CardSection style={{ flexDirection: 'row', justifyContent:'space-around' }}>
		  	<View style={styles.containerStyle}>
				<Text style={styles.labelTextStyle}>End Date</Text>
        <TouchableWithoutFeedback onPress={this.showDatePicker.bind(this, 'endDate', { date: Date.now() })} >
          <Text style={styles.dateTextStyle}>{this.props.endDate}</Text>
        </TouchableWithoutFeedback>
			</View>
		  	<View style={styles.containerStyle}>
		  		<Text style={styles.labelTextStyle}>End Time</Text>
				<TouchableWithoutFeedback onPress={this.showTimePicker.bind(this, 'endTime', {})} >
					<Text style={styles.timeTextStyle}>{this.props.endTime}</Text>
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


const mapStateToProps = ({ gameForm }) => {
  const { startDate, startTime, endDate, endTime } = gameForm;
  return { startDate, startTime, endDate, endTime };
};

export default connect(mapStateToProps, { gameUpdate })(DateTimePickerAndroid);

