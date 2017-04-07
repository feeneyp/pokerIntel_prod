import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet } from 'react-native';
import { CardSection } from './common';


class MainMenu extends Component {

	render() {
		console.log('main menu comp about to render');
		return (
			<View>
				<CardSection>
					<Text
						style={styles.listTextStyle} 
						onPress={Actions.gameCreateLiveSession}
					>
						Add a Live Session
					</Text>
				</CardSection>
				<CardSection>
					<Text
						style={styles.listTextStyle} 
						onPress={Actions.gameCreateCompletedSession}
					>
						Add a Completed Session
					</Text>
				</CardSection>
				<CardSection>
					<Text
						style={styles.listTextStyle}
						onPress={Actions.gameList}
					>
						See All Sessions
					</Text>
				</CardSection>	
			</View>
			);
		} 
		}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTextStyle: {
	padding: 12,
    marginLeft: 12,
    fontSize: 24,
  }
});

export default MainMenu;
