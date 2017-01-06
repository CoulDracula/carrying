import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {Container, Header,Button, Title, Content, Text, Icon, Card, CardItem, Thumbnail} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Image} from 'react-native';

import {deletePublicMemo } from '../../actions/memoActions';
import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  reset,
  pushRoute,
} = actions;

class MemoDetailPage extends Component {
  constructor (props) {
  super(props);
  // this.state = {
  //   selectedItem: undefined,
  //   selected1: 'key0',
  //   results: {
  //     items: [],
  //   },
  // };
  this.handleDelete=this.handleDelete.bind(this);
}
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

  componentWillMount () {

  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute (route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  handleDelete(_id){
    this.props.deletePublicMemo(_id);
    this.props.popRoute(this.props.navigation.key);
  }

  render () {

    const { memo }=this.props;
    console.log(memo);
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back"/>
          </Button>
          <Title>Memo Detial</Title>
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <Text>{memo.title}</Text>
            </CardItem>
            <CardItem>
              <Text>{memo.content}</Text>
            </CardItem>
            <CardItem >
              <Text>{memo.author}</Text>
            </CardItem>
            <CardItem >
              <Text>{memo.date}</Text>
            </CardItem>
            <CardItem >
              <Text>{memo.grade}</Text>
            </CardItem>
            <CardItem >
              <Text>{memo.modified}</Text>
            </CardItem>
          </Card>
          <Button danger onPress={()=>{this.handleDelete(memo._id)}}> delete </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    deletePublicMemo :(_id) =>dispatch(deletePublicMemo(_id)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  memo: state.memo.memo,
});


export default connect(mapStateToProps, bindAction)(MemoDetailPage);
