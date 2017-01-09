import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Content, List, ListItem, Text, Icon, Badge} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  reset,
  pushRoute,
} = actions;

class UserPage extends Component {

  static propTypes = {
    username: React.PropTypes.string,
    personName: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute (route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render () {
    const { username, personName }=this.props;
    return (

      <Content padder>
        <List>
          <Text>{personName}</Text>
          <Text>{username}</Text>
          <ListItem iconLeft>
            <Icon name="ios-plane" style={styles.icon}/>
            <Text>Airplane Mode</Text>
            <Text note>Off</Text>
          </ListItem>
          <ListItem iconLeft>
            <Icon name="ios-settings-outline" style={styles.icon}/>
            <Text>Software Update</Text>
            <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
          </ListItem>
          <ListItem iconLeft>
            <Icon name="ios-mail-outline" style={styles.icon}/>
            <Text>Mail Center</Text>
            <Badge>12</Badge>
          </ListItem>
        </List>
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

const mapStateToProps = (state) => {
  return {
    navigation: state.cardNavigation,
    username: state.auth.username,
    personName: state.auth.person.name ? state.auth.person.name : 'not found',
    index: state.list.selectedIndex,
    list: state.list.list,
  }
};


export default connect(mapStateToProps, bindAction)(UserPage);
