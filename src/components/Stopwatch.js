import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
  	    	      console.log('ONTICK FCT CALLED IN STOPWATCH.js');
    if (this.props.running) {
      console.log('conditional in ONTICK FCT CALLED IN STOPWATCH.js');
      const now = Date.now();
      const elapsedTime = this.props.elapsedTime + (now - this.props.previousTime);
      const previousTime = Date.now();
      this.props.tick({ elapsedTime, previousTime });
    }
  };

  render() {
    const seconds = Math.floor(this.props.elapsedTime / 1000);
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'white'}}>Stopwatch</Text>
        <Text style={{color: 'white'}}>{seconds}</Text>
        <Button onPress={()=>this.props.onStart()}>Start</Button>
        <Button onPress={()=>this.props.onStop()}>Stop</Button>
        <Button onPress={()=>this.props.onReset()}>Reset</Button>
      </View>
    );
  }
}

const mapStateToProps = ({ stopwatch }) => {
  const { running, elapsedTime, previousTime } = stopwatch;

  return { running, elapsedTime, previousTime };
};

export default connect(mapStateToProps, {onStart, onStop, onReset, tick
})(Stopwatch);
