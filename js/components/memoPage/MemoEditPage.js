import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content,Header,Title, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
const Item = Picker.Item;
const {
  popRoute,
  reset,
  pushRoute,
} = actions;

class MemoEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      grade: 'key0',
      results: {
        items: [],
      },
    };
  }
  onValueChange(value: string) {
    this.setState({
      grade: value,
    });
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

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute (route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {

    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>Memo Edit</Title>
        </Header>
        <Content>
          <List>

            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="Title" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input placeholder="Content" secureTextEntry />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                <Input placeholder="date" keyboardType="numeric" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                <Input placeholder="Author" keyboardType="numeric" />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
              <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
              <Text>Grade</Text>
              <Picker
                iosHeader="Grade"
                mode="dropdown"
                selectedValue={this.state.grade}
                onValueChange={this.onValueChange.bind(this)} >
                <Item label="High" value="key0" />
                <Item label="Middle" value="key1" />
                <Item label="Low" value="key2" />
              </Picker>
            </ListItem>
          </List>
          <Button bordered success style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            push
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
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


export default connect(mapStateToProps, bindAction)(MemoEditPage);







