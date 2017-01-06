import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Content, InputGroup, Input, Button, Icon, View} from 'native-base';

import {authLoginUser} from '../../actions/authActions';
import {setUser} from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;

const background = require('../../../images/shadow.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  setUser (name) {
    this.props.setUser(name);
  }

  replaceRoute (route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  handleLogIn () {
    console.log(this.state);
    this.props.authLoginUser(
      this.state.name,
      this.state.password
    ).then(
      () => {
        this.props.replaceAt('login', { key: 'home' }, this.props.navigation.key);
      }
    )
  }

  render () {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person"/>
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline"/>
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                </InputGroup>
                <Button success style={styles.btn} onPress={() => this.handleLogIn()}>
                  Login
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions (dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
    authLoginUser: (name,password) => dispatch(authLoginUser(name,password)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
