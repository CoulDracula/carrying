import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Image} from 'react-native';

import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  reset,
  pushRoute,
} = actions;

class AppPage extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute (route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render () {

    return (
        <Content padder>
          <Card style={styles.card}>
            <CardItem onPress={() => this.pushRoute('timeTable')}>
              <Thumbnail />
              <Text>TimeTable</Text>
              <Text note>when and where</Text>
            </CardItem>
          </Card>
          <Card style={styles.card}>
            <CardItem>
              <Thumbnail />
              <Text>NativeBase</Text>
              <Text note>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
    );
  }
}

function bindAction (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(AppPage);
