import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { onStart, onStop, onReset, tick } from '../actions';
import { Button } from './common';

class Stopwatch extends Component {

  componentDidMount() {
    this.interval = setInterval(this.onTick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick = (props) => {
    if (this.props.running) {
      const now = Date.now();
      const elapsedTime = this.props.elapsedTime + (now - this.props.previousTime);
      const previousTime = Date.now();
      this.props.tick({ elapsedTime, previousTime });
    }
  };

  render() {
    let seconds = Math.floor(this.props.elapsedTime / 1000);
    let minutes = Math.floor(this.props.elapsedTime / 1000 / 60);
    let hours = Math.floor(this.props.elapsedTime / 1000 / 60 / 60);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);
    const formattedTime = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    return (
      <View style={styles.timerSectionStyle}>
        <Text style={styles.timerTextStyle}>{formattedTime}</Text>
        <TouchableOpacity onPress={()=>this.props.onStart()}>
          <Image source={require('../resources/play48x48.png')} style={styles.timerButtonStyle}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.onStop(this.props.elapsedTime)}>
          <Image source={require('../resources/stop48x48.png')} style={styles.timerButtonStyle}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.onReset()}>
          <Image source={require('../resources/reset1000x995.png')} style={styles.timerButtonStyle}  />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  timerSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
  timerTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  timerButtonStyle: {
    width: 48,
    height: 48

  } 
};

const mapStateToProps = ({ gameForm }) => {
  const { running, elapsedTime, previousTime } = gameForm;
  return { running, elapsedTime, previousTime };
};

export default connect(mapStateToProps, { onStart, onStop, onReset, tick
})(Stopwatch);
