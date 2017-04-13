import React, { Component } from 'react';
var moment = require('moment');
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


class ListItem extends Component {


	showGameDetail() {
		Actions.gameEdit({ game: this.props.game });
		}

	render() {
		const { stake, gameType, location, limitType, buyIn, note, tips, 
			startDate, startTime, endDate, endTime, gameDuration, cashOut  } = this.props.game;
		return (
			<View>
				<Text style={styles.dateTextStyle}>
					{startDate}&nbsp;&nbsp;{moment(startDate).format('dddd')}
				</Text>	
				<TouchableOpacity onPress={this.showGameDetail.bind(this)}>
					<View style={styles.gameDetailSectionStyle}>
						<View style={{ flexDirection: 'column' }}>
							<Text style={styles.firstRowTextStyle}>
								{location}&nbsp;&nbsp;&nbsp;&nbsp;{gameDuration}&nbsp;hours
							</Text>
							<Text style={styles.secondRowTextStyle}>
								{gameType}&nbsp;&nbsp;{limitType}
							</Text>
						</View>
						<Text style={styles.gameBuyInTextStyle}>
							${cashOut}	
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			);
		}
	}


const styles = {
  dateTextStyle: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    fontSize: 17
  },
  gameDetailSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
	firstRowTextStyle: {
		color: 'white',
		marginLeft: 12,
		fontSize: 16,
  },
	gameBuyInTextStyle: {
		color: 'blue',
		fontSize: 24,
  },
	secondRowTextStyle: {
		color: 'white',
		marginLeft: 12,
		marginBottom: 10,
		fontSize: 14,
  },
};
	

export default ListItem;
