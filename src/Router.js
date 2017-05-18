import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GameCreateCompletedSession from './components/GameCreateCompletedSession';
import GameCreateLiveSession from './components/GameCreateLiveSession';
import MainMenu from './components/MainMenu';
import GameList from './components/GameList';
import GameEdit from './components/GameEdit';
import MyWeb from './components/webview';


const navBarIcon = () => {
	return (
		<TouchableOpacity onPress={() => { Actions.mainMenu(); }}>
			<Image source={require('./resources/cards1.png')} style={styles.navBarIconStyle}  />
		</TouchableOpacity>
	);
};


const RouterComponent = () => {
//TO CONNECT MAIN MENU TO STORE IN ORDER TO INVOKE THE ROUTER
//ACTIONS THROUGH this.props.someFnThatInvokesActionDotKey
//YOU CAN USE REDUX CONNECT METHOD IN SCENE OR IN THE
//COMPONENT FILE MAINMENU.JS AT BOTTOM THE WAY WE ARE USED TO

	return (
		<Router 
			sceneStyle={styles.sceneStyle} 
			navigationBarStyle={styles.navBarStyle} 
			titleStyle={styles.navTitleStyle}
			renderRightButton={navBarIcon}
		>
			<Scene key="auth">
				<Scene key="login" component={LoginForm} title="Please Login" />
			</Scene>
			<Scene key="main">
				<Scene key="mainMenu" component={MainMenu} title="Main Menu" />
				<Scene key="gameCreateCompletedSession" component={GameCreateCompletedSession} title="Enter a Game" />
				<Scene key="gameCreateLiveSession" component={GameCreateLiveSession} title="Enter a Game" />
				<Scene key="gameList" component={GameList} title="All Games" />
				<Scene key="webview" component={MyWeb} title="Google Maps" />
			</Scene>
		</Router>
		);
	};


const styles = {
	sceneStyle: {
		backgroundColor: 'black', 
		paddingTop: 65,
		borderColor: 'blue'
	},	
	navBarStyle: {
		backgroundColor: 'black', // changing navbar color
	},
	navTitleStyle: {
		color: 'white', // changing navbar title color
		alignSelf: 'center'
	},
	navBarIconStyle: {
		width: 30,
		height: 30

	}	
};

export default RouterComponent;
