import React, {Component} from 'react';
import {connect} from 'react-redux';
var i18n = require('tcomb-form-native/lib/i18n/en');
import {Container, Content, Button} from 'native-base';
import  tcomb from 'tcomb-form-native';

import styles from './styles';

const Form = tcomb.form.Form;
const Country = tcomb.enums({
  'high': 'high',
  'middle': 'middle',
  'low':'low'
});

const Person = tcomb.struct({
  title: tcomb.String,
  content: tcomb.maybe(tcomb.String),
  date:tcomb.Date,
  grade: Country,
  author: tcomb.String,
  private: tcomb.Boolean,
});
tcomb.form.Form.i18n = i18n;
const options = {
  i18n: {
    optional: ' (可选的)',
    required: '',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    title: {
      label: '标题' , //自定义label,
      placeholder:'initial title',
      // help: 'Your help message here',
    },
    content: {
      label: 'content',
      multiline:true,
      },
    grade: {
      label: 'grade',
      nullOption : false,
    },
    date: {
      label: 'date'
    }
  },
  // auto: 'placeholders',
};
let value ={
  grade:'low'
};

class MemoEditForm extends Component {
  constructor(props) {
    super(props);
    this.onPress=this.onPress.bind(this);
  }

  onPress () {
  const value = this.refs.form.getValue();
  if (value) {
    const {pushValue}=this.props;
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
            value={value}
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







