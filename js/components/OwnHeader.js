import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Header, Title, Button, Icon} from 'native-base';

import {openDrawer} from '../actions/drawer';

const {
  popRoute,
} = actions;

class OwnHeader extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  render () {
    const { props: { title } } = this;
    return (
        <Header>
          {/*<Button transparent onPress={() => this.popRoute()}>*/}
            {/*<Icon name="ios-arrow-back"/>*/}
           {/*</Button>*/}
          <Title>{ title ? title : 'Blank Page'}</Title>
          {/*<Button transparent onPress={this.props.openDrawer}>*/}
            {/*<Icon name="ios-menu"/>*/}
          {/*</Button>*/}
        </Header>
    );
  }
}

function bindAction (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  title: state.title,
});

export default connect(mapStateToProps, bindAction)(OwnHeader);
