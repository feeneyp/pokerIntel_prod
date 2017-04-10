import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import GameFormCompleted from './GameFormCompleted';
import { gameUpdate, gameSave, gameDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class GameEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.game, (value, prop) => {
      this.props.gameUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { stake, gameType, location, limitType, buyIn, note, tips } = this.props;

    this.props.gameSave({ stake, gameType, location, limitType, buyIn, note, tips, uid: this.props.game.uid });
  }

  onAccept() {
    const { uid } = this.props.game;

    this.props.gameDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <ScrollView> 
        <GameFormCompleted />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection style={{ padding: 10 }}>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete Game
          </Button>
        </CardSection>


        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { stake, gameType, location, limitType, buyIn, note, tips } = state.gameForm;

  return { stake, gameType, location, limitType, buyIn, note, tips };
};

export default connect(mapStateToProps, {
  gameUpdate, gameSave, gameDelete })(GameEdit);

