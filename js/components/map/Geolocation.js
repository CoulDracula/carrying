import React, {Component} from 'react';
import {connect} from 'react-redux';
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

const watchID=null ;
class Geolocation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render () {
    return (
      <View>
        <Text>
          <Text >Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text >Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}

export default Geolocation;