import React, {Component} from 'react';
import {TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title, Content, Text, Footer, FooterTab, Button, Badge, Icon} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import {openDrawer} from '../../actions/drawer';
import {setIndex} from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };
  pushRoute (route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  navigateTo (route) {
    this.props.navigateTo(route, 'home');
  }

  render () {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Image
          style={styles.content}
          source={require('./img/background.png')} >
        <Header>
          <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
            <Icon name="ios-power"/>
          </Button>

          <Title>Home</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu"/>
          </Button>
        </Header>

        <Content>

          <Grid style={styles.mt}>
            {this.props.list.map((item, i) =>
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => this.pushRoute('blankPage', i)}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            )}
          </Grid>
        </Content>
        <Footer >
          <FooterTab>
            <Button onPress={() => this.navigateTo('appPage')}>
              Apps
              <Icon name='ios-apps-outline'/>
            </Button>
            <Button onPress={() => this.navigateTo('blankPage')}>
              Home
              <Icon name='ios-home-outline'/>
            </Button>
            <Button active onPress={() => this.navigateTo('memoPage')}>
              Memo
              <Icon name='ios-compass'/>
            </Button>
            <Button onPress={() => this.navigateTo('user')}>
              User
              <Icon name='ios-contact-outline'/>
            </Button>
          </FooterTab>
        </Footer>
        </Image>
      </Container>
    );
  }
}

function bindAction (dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
