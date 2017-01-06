import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {
  Container,
  Content,
  Header,
  Title,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Picker,
  Button
} from 'native-base';
import {openDrawer} from '../../actions/drawer';

import {updatePublicMemo,updatePrivateMemo} from '../../actions/memoActions';
import MemoEditForm from './MemoEditForm';
// const Item = Picker.Item;
const {
  popRoute,
} = actions;

class MemoEditPage extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   selectedItem: undefined,
    //   selected1: 'key0',
    //   results: {
    //     items: [],
    //   },
    // };
    this.pushValue=this.pushValue.bind(this);
  }

  // onValueChange (value: string) {
  //   this.setState({
  //     selected1: value,
  //   });
  // }

  static propTypes = {
    name: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute () {
    this.props.popRoute(this.props.navigation.key);
  }

  pushValue (form) {
    console.log(form);
    if(form.private!=true){
      this.props.updatePublicMemo(form);
    }
    if(form.private==true){
      this.props.updatePrivateMemo(form);
    }
    this.popRoute();
  }

  render () {

    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back"/>
          </Button>
          <Title>Memo Edit</Title>
        </Header>
        <Content>
          <MemoEditForm pushValue={this.pushValue}/>
          {/*<List>*/}
          {/*<ListItem>*/}
          {/*<InputGroup>*/}
          {/*<Input inlineLabel label="First Name" placeholder="John" />*/}
          {/*</InputGroup>*/}
          {/*</ListItem>*/}

          {/*<ListItem>*/}
          {/*<InputGroup>*/}
          {/*<Icon name="ios-person" style={{ color: '#0A69FE' }} />*/}
          {/*<Input placeholder="EMAIL" />*/}
          {/*</InputGroup>*/}
          {/*</ListItem>*/}
          {/*<ListItem>*/}
          {/*<InputGroup>*/}
          {/*<Icon name="ios-unlock" style={{ color: '#0A69FE' }} />*/}
          {/*<Input placeholder="PASSWORD" secureTextEntry />*/}
          {/*</InputGroup>*/}
          {/*</ListItem>*/}
          {/*<ListItem>*/}
          {/*<InputGroup>*/}
          {/*<Icon name="ios-call" style={{ color: '#0A69FE' }} />*/}
          {/*<Input placeholder="PHONE" keyboardType="numeric" />*/}
          {/*</InputGroup>*/}
          {/*</ListItem>*/}

          {/*<ListItem iconLeft>*/}
          {/*<Icon name="ios-transgender" style={{ color: '#0A69FE' }} />*/}
          {/*<Text>GENDER</Text>*/}
          {/*<Picker*/}
          {/*iosHeader="Select one"*/}
          {/*mode="dropdown"*/}
          {/*selectedValue={this.state.selected1}*/}
          {/*onValueChange={this.onValueChange.bind(this)} >*/}
          {/*<Item label="Male" value="key0" />*/}
          {/*<Item label="Female" value="key1" />*/}
          {/*<Item label="Other" value="key2" />*/}
          {/*</Picker>*/}
          {/*</ListItem>*/}

          {/*<ListItem>*/}
          {/*<InputGroup >*/}
          {/*<Input stackedLabel label="Permanent Address" placeholder="Address" />*/}
          {/*</InputGroup>*/}
          {/*</ListItem>*/}
          {/*</List>*/}
          {/*<Button bordered success style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>push</Button>*/}
        </Content>
      </Container>
    );
  }
}

function bindAction (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    updatePublicMemo: form => dispatch(updatePublicMemo(form)),
    updatePrivateMemo: form => dispatch(updatePrivateMemo(form)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
});


export default connect(mapStateToProps, bindAction)(MemoEditPage);







