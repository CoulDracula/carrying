import React, {Component} from 'react';
import {connect} from 'react-redux';

import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title, Content, Tabs, Button, Icon} from 'native-base';

import {loadPublicMemos} from '../../actions/memoActions';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import myTheme from '../../themes/base-theme';
import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const {
  pushRoute,
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

  componentWillMount () {
    // const {loadPublicMemos}=this.props.memoActions;
    // loadPrivateMemos();
    if (this.props.publicMemos.length <= 0) {
      this.props.loadPublicMemos();
    }
  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  render () {
    const { publicMemos }=this.props;
    return (
        <Content >
          <Tabs tabTextColor="#AAAAAA">
            <TabOne tabLabel='public' tabTextColor="#AAAAAA" publicMemos={publicMemos} />
            <TabTwo tabLabel='private' />
          </Tabs>
        </Content>
    );
  }
}

function bindAction (dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    loadPublicMemos: () => dispatch(loadPublicMemos()),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  publicMemos: state.memo.publicMemos,

});


export default connect(mapStateToProps, bindAction)(MemoPage);
