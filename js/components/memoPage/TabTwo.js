import React, {Component} from 'react';
import { Image ,View} from 'react-native';
import {actions} from 'react-native-navigation-redux-helpers';
import { Container, Content, Card, CardItem, Text, Spinner,  List, ListItem, Thumbnail, Icon } from 'native-base';

import styles from './styles';

const TabTwo = ({ privateMemos ,pushRoute}) => {


  return (
    <Container>
      <Content>
        {privateMemos.map(
          privateMemo => {
            return (
              <List key={privateMemo._id} >
                <ListItem onPress={() => pushRoute('memoDetail', privateMemo)}>
                  <Thumbnail square  source={require('./img/logo.png')}  />
                  <Text>{privateMemo.title}</Text>
                  <Text note>{privateMemo.grade}</Text>
                </ListItem>
              </List>


            )
          }
        )}
      </Content>
    </Container>
  );
}


export default TabTwo;