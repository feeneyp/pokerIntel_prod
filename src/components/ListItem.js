import React, { Component } from 'react';
var moment = require('moment');
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';


class ListItem extends Component {


	showGameDetail() {
		Actions.gameEdit({ game: this.props.game });
		}

	render() {
		const { location, gameType, buyIn, startDate } = this.props.game;
		console.log('about to return in listitem render');
		return (
			<View>
				<Text style={styles.dateAndTimeStyle}>
					{startDate}
				</Text>	
				<TouchableWithoutFeedback onPress={this.showGameDetail.bind(this)}>
					<View style={styles.gameDetailsStyle}>
						<Text style={styles.gameLocationTextStyle}>
							{gameType}&nbsp;&nbsp;{location}	
						</Text>
						<Text style={styles.gameBuyInTextStyle}>
							${buyIn}	
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
			);
		}
	}

const styles = StyleSheet.create({
  dateAndTimeStyle: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    fontSize: 16
  },
  gameDetailsStyle: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
	gameLocationTextStyle: {
		color: 'white',
		marginLeft: 12,
		fontSize: 19,
  },
	gameBuyInTextStyle: {
		color: 'blue',
		fontSize: 24,
  }
});
	

export default ListItem;
