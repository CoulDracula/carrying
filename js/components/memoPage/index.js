import React, {Component} from 'react';
import {connect} from 'react-redux';

import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title,Spinner, Content, Tabs, Button, Icon} from 'native-base';

import {loadPublicMemos, loadPublicMemo,loadPrivateMemos} from '../../actions/memoActions';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const {
  pushRoute,
  popRoute,
} = actions;

class MemoPage extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   selectedItem: undefined,
    //   selected1: 'key0',
    //   results: {
    //     items: [],
    //   },
    // };
    this.pushRoute = this.pushRoute.bind(this);
  }

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    loadPublicMemo: React.PropTypes.func,
    loadPublicMemos: React.PropTypes.func,
    loadPrivateMemos: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount () {
    if(this.props.privateMemos.length<=0){
      this.props.loadPrivateMemos();
    }
    if (this.props.publicMemos.length <= 0) {
      this.props.loadPublicMemos();
    }
  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute (route, index) {
    this.props.loadPublicMemo(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render () {
    const { publicMemos,privateMemos }=this.props;
    return (
      <Content >
          <Tabs>
            <TabOne tabLabel='public'  publicMemos={publicMemos} pushRoute={this.pushRoute}/>
            <TabTwo tabLabel='private' privateMemos={privateMemos} pushRoute={this.pushRoute}/>
          </Tabs>
      </Content>
    );
  }
}

function bindAction (dispatch) {
  return {
    loadPublicMemo: (index) => dispatch(loadPublicMemo(index)),
    loadPublicMemos: () => dispatch(loadPublicMemos()),
    loadPrivateMemos: () => dispatch(loadPrivateMemos()),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  publicMemos: state.memo.publicMemos,
  privateMemos:[],

});


export default connect(mapStateToProps, bindAction)(MemoPage);
