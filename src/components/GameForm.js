import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { gameUpdate, firebaseFetch } from '../actions';
import { CardSection, Input } from './common';
import DateTimePickerAndroid from './DateTimePickerAndroid';


class GameForm extends Component {

  componentWillMount() {
    console.log('gameform component will mount called');
    this.props.firebaseFetch('/pickerData','game_type', 'FB_PICKER_DATA_FETCH_SUCCESS');
  } 

  render() {
    const { pickerData, stake, gameType, location, limitType, buyIn, note, tips,
    cashOut, gameCompleted } = this.props;
    console.log('this.props from render in gameform is: ' + JSON.stringify(this.props));



    const pickerDataComponents = (picker) => {
         const list = _.map(pickerData[picker], (item, index) => {
      return (
        <Picker.Item label={item.label} value={item.value} key={index} />
        );
      });
    return (list);
    };


    return (
        <View>
          <CardSection>
              <Text style={styles.pickerTextStyle}>Stake</Text>
              <Picker  
                style={{ flex: 1 }}
                selectedValue={stake}
                onValueChange={value => this.props.gameUpdate({ prop: 'stake', value })}
              >
              {pickerDataComponents('stakes')}
              </Picker>
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Game Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={gameType}
                onValueChange={value => this.props.gameUpdate({ prop: 'gameType', value })}
              >
              {pickerDataComponents('game_types')}
              </Picker>
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Location</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={location}
                onValueChange={value => {
                  this.props.gameUpdate({ prop: 'location', value });
                  console.log('location is: ' + location);
                  }}
                  
              >
              {pickerDataComponents('locations')}
              </Picker> 
          </CardSection>

          <CardSection>
              <Text style={styles.pickerTextStyle}>Limit Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={limitType}
                onValueChange={value => this.props.gameUpdate({ prop: 'limitType', value })}
              >
              {pickerDataComponents('limit_types')}
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
          <DateTimePickerAndroid />
          <CardSection>
          <Input
            label="Cash Out ($)"
            placeholder="0"
            value={cashOut}
            onChangeText={value => this.props.gameUpdate({ prop: 'cashOut', value })}
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
  const { pickerData, stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut, gameCompleted } = state.gameForm;
  console.log('state from gameform mapStatetoProps is : ' + JSON.stringify(state));
  console.log('pickerData before mstp return is: ' + JSON.stringify(pickerData));
  return { pickerData, stake, gameType, location, limitType, buyIn, note, tips,
      startDate, startTime, endDate, endTime, cashOut, gameCompleted};
    
  };

export default connect(mapStatetoProps, { gameUpdate, firebaseFetch })(GameForm);

//code to put into chrome dev tools console to quickly populate
// firebase with items for pickers and dropdowns
// new Firebase('https://pokerincome-69774.firebaseio.com').child('/').update({
//     pickerData: {
//       stakes: {
//           stake0: { label: '$1/$2', value: '$1/$2' },
//           stake1: { label: '$3/$5', value: '$3/$5' },
//           stake2: { label: '$5/$10', value: '$5/$10' },
//           stake3: { label: '$8/$16', value: '$8/$16' },
//           stake4: { label: '$20/$40', value: '$20/$40' },
//           stake5: { label: 'Other Stake', value: 'Other Stake' },
//        },
//       limit_types: {
//           limit_type0: { label: 'Fixed Limit', value: 'Fixed Limit' },
//           limit_type1: { label: 'No Limit', value: 'No Limit' },
//           limit_type2: { label: 'Pot Limit', value: 'Pot Limit' },
//           limit_type3: { label: 'Other Limit', value: 'Other Limit' },
//        },
//       game_types: {
//           game_type0: { label: 'Texas Holdem', value: 'Texas' },
//           game_type1: { label: '7 Card Stud', value: 'Stud' },
//           game_type2: { label: 'Razz', value: 'Razz' },
//           game_type3: { label: 'Other Game', value: 'Other Game' },
//        },
//       locations: {
//           locations0: { label: 'My House', value: 'My House' },
//           locations1: { label: 'Casino', value: 'Casino' },
//           locations2: { label: 'Other Location', value: 'Other Location' },
//        },
//     }
// });
