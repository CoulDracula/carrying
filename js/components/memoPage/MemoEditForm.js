import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import  tcomb from 'tcomb-form-native';

import styles from './styles';

const Form = tcomb.form.Form;

let Person = tcomb.struct({
  title: tcomb.String,
  content: tcomb.maybe(tcomb.String),
  date: tcomb.Date,
  grade: tcomb.String,
  author: tcomb.String,
  private: tcomb.Boolean,
});

let options = {
  fields: {
    title: {
      error: 'Insert a valid title'
    }
  }
};

class MemoEditForm extends Component {
  constructor (props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress () {
    var value = this.refs.form.getValue();
    if (value) {
      const { pushValue }=this.props;
      pushValue(value);
    }
  }

  render () {

    return (
      <Container>
        <Content style={styles.card}>
          <Form
            ref='form'
            type={Person}
            options={options}
          />
          <Button bordered
                  success
                  style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                  onPress={this.onPress}
          >
            push
          </Button>
        </Content>
      </Container>
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


export default connect(mapStateToProps, bindAction)(MemoEditForm);







