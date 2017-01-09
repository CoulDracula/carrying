import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';

import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header, Title,Spinner, Content, Tabs, Button, Icon} from 'native-base';
import {PullView} from 'react-native-pull';

import {loadPublicMemos, loadPublicMemo} from '../../actions/memoActions';
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
    this.onPullRelease = this.onPullRelease.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
  }

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    loadPublicMemo: React.PropTypes.func,
    loadPublicMemos: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
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

  pushRoute (route, index) {
    this.props.loadPublicMemo(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  onPullRelease (resolve) {
    setTimeout(() => {
      this.props.loadPublicMemos();
      resolve();
    }, 3000);
  }

  topIndicatorRender (pulling, pullok, pullrelease) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'cent er', height: 60,marginTop:30}}>
        {pulling ? <Spinner /> : null}
        {pullok ? <Text>松开刷新pullok......</Text> : null}
        {pullrelease ? <Spinner />  : null}
      </View>
    );
  }


  render () {
    const { publicMemos }=this.props;
    return (
      <Content >
        <PullView onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender}
                  topIndicatorHeight={100}>
          <Tabs tabTextColor="#AAAAAA">
            <TabOne tabLabel='public' tabTextColor="#AAAAAA" publicMemos={publicMemos} pushRoute={this.pushRoute}/>
            <TabTwo tabLabel='private'/>
          </Tabs>
        </PullView>
      </Content>
    );
  }
}

function bindAction (dispatch) {
  return {
    loadPublicMemo: (index) => dispatch(loadPublicMemo(index)),
    loadPublicMemos: () => dispatch(loadPublicMemos()),
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

});


export default connect(mapStateToProps, bindAction)(MemoPage);
