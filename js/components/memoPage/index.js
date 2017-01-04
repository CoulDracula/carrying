import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Tabs, Button, Icon } from 'native-base';

import {loadPublicMemos} from '../../actions/memoActions';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class MemoPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    loadPublicMemos: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount() {
    // const {loadPublicMemos}=this.props.memoActions;
    // loadPrivateMemos();
    this.props.loadPublicMemos();
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Memo</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content theme={myTheme}>
          <Tabs>
            <TabOne tabLabel='private' />
            <TabTwo tabLabel='public' />
          </Tabs>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    loadPublicMemos:  () => dispatch(loadPublicMemos()),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(MemoPage);
