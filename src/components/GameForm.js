import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { gameUpdate } from '../actions';
import { CardSection, Input, Button } from './common';
import DateTimePickerStartEndAndroid from './DateTimePickerAndroid';

class GameForm extends Component {
  render() {
    const { stake, gameType, location, limitType, buyIn, note, tips,
        startDate, startTime, endDate, endTime, cashOut } = this.props;
    console.log('this.props is : ' + JSON.stringify(this.props));
    return (
        <View>
          <CardSection>
              <Text style={styles.pickerTextStyle}>Stake</Text>
              <Picker  
                style={{ flex: 1 }}
                selectedValue={this.props.stake}
                onValueChange={value => this.props.gameUpdate({ prop: 'stake', value})}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="$1/$2" value="1_2" />
                <Picker.Item label="$3/$5" value="3_5" />
                <Picker.Item label="$5/$10" value="5_10" />
                <Picker.Item label="$8/$16" value="8_16" />
                <Picker.Item label="$20/$40" value="20_40" />
              </Picker>
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Game Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={gameType}
                onValueChange={value => this.props.gameUpdate({ prop: 'gameType', value })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Texas Holdem" value="Texas" />
                <Picker.Item label="7 Card Stud" value="Stud" />
                <Picker.Item label="Razz" value="Razz" />
              </Picker>
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Location</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.location}
                onValueChange={value => {
                  this.props.gameUpdate({ prop: 'location', value });
                  console.log('this.props.location is: ' + this.props.location);
                  }}
                  
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="My House" value="My House" />
                <Picker.Item label="Casino" value="Casino" />
              </Picker> 
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Limit Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={limitType}
                onValueChange={value => this.props.gameUpdate({ prop: 'limitType', value})}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="No Limit" value="No Limit" />
                <Picker.Item label="Fixed Limit" value="Fixed Limit" />
                <Picker.Item label="Pot Limit" value="Pot Limit" />
              </Picker>
          </CardSection>

          <CardSection>
            <Input
            label="Buy In ($)"
            placeholder="0"
            value={buyIn}
            onChangeText={value => this.props.gameUpdate({ prop: 'buyIn', value })}
            //in the line above no need for bind because you have closure (fat arrow)
            />
          </CardSection>

          <CardSection>
            <Input
            label="Note"
            placeholder=""
            value={note}
            onChangeText={value => this.props.gameUpdate({ prop: 'note', value })}
            //in the line above no need for bind because you have closure (fat arrow)
            />
          </CardSection>

          <CardSection>
            <Input
            label="Tips"
            placeholder="0"
            value={tips}
            onChangeText={value => this.props.gameUpdate({ prop: 'tips', value })}
            //in the line above no need for bind because you have closure (fat arrow)
            />
          </CardSection>
          <DateTimePickerStartEndAndroid />
          <CardSection>
            <Input
            label="Cash Out ($)"
            placeholder="0"
            value={cashOut}
            onChangeText={value => this.props.gameUpdate({ prop: 'cashOut', value })}
            //in the line above no need for bind because you have closure (fat arrow)
            />
          </CardSection>
        </View> 
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStatetoProps = (state) => {
  const { stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut } = state.gameForm;
  console.log('state is : ' + JSON.stringify(state.gameForm));
  return { stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut };
  };

export default connect(mapStatetoProps, { gameUpdate })(GameForm);


