import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title, Content, Text, Footer, FooterTab, Button, Badge, Icon} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import {openDrawer} from '../../actions/drawer';
import {setIndex} from '../../actions/list';
import {setTitle} from '../../actions/user';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import MemoPage from '../memoPage';
import AppPage from '../appPage';
import UserPage from '../userPage';

const {
  popRoute,
  reset,
  pushRoute,
} = actions;

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 'Home',
    };
  }


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
    // this.props.setIndex(index);
    this.props.setTitle(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  navigateTo (route) {
    this.props.navigateTo(route, 'home');
  }

  render () {
    return (
      <Container theme={myTheme} style={styles.container}>

        {/*<Image*/}
        {/*style={styles.content}*/}
        {/*source={require('./img/background.png')}>*/}

        {/*<Header>*/}
          {/*{this.state.page != 'User Center' &&*/}
          {/*<Button transparent>*/}
            {/*<Icon name="ios-arrow-back"/>*/}
          {/*</Button>*/}
          {/*}*/}
          {/*{this.state.page == 'User Center' &&*/}
          {/*<Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>*/}
            {/*<Icon name="ios-power"/>*/}
          {/*</Button>*/}
          {/*}*/}
          {/*<Title>{this.state.page}</Title>*/}
          {/*{this.state.page != 'Memo Page' &&*/}
          {/*<Button transparent onPress={this.props.openDrawer}>*/}
            {/*<Icon name="ios-menu"/>*/}
          {/*</Button>*/}
          {/*}*/}
          {/*{this.state.page == 'Memo Page' &&*/}
          {/*<Button transparent onPress={() => this.pushRoute('memoEditPage','Memo Edit')}>*/}
            {/*<Icon name="ios-add"/>*/}
          {/*</Button>*/}
          {/*}*/}
        {/*</Header>*/}
        <Content>
          {this.state.page == 'Home' &&
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
          }
          {this.state.page == 'Memo Page' &&
          <MemoPage/>
          }
          {this.state.page == 'App Center' &&
          <AppPage/>
          }
          {this.state.page == 'User Center' &&
          <UserPage/>
          }
        </Content>
        <Footer >
          <FooterTab>
            <Button //onPress={() => this.navigateTo('appPage')}
              onPress={()=>this.setState({page:'App Center'})}>
              Apps
              <Icon name='ios-apps-outline'/>
            </Button>
            <Button onPress={() => this.setState({page:'Home'})}>
              Home
              <Icon name='ios-home-outline'/>
            </Button>
            <Button onPress={() => this.setState({page:'Memo Page'})}>
              Memo
              <Icon name='ios-compass'/>
            </Button>
            <Button onPress={() => this.setState({page:'User Center'})}>
              User
              <Icon name='ios-contact-outline'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction (dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    setTitle: (title) => dispatch(setTitle(title)),
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
