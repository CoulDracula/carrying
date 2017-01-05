import React, {Component} from 'react';
import { Image ,View} from 'react-native';
import {actions} from 'react-native-navigation-redux-helpers';
import { Container, Content, Card, CardItem, Text, Spinner,  List, ListItem, Thumbnail, Icon } from 'native-base';

import styles from './styles';
const TabOne = ({ publicMemos }) => {


  return (
    <Container>
      <Content>
        {publicMemos.length<=0 &&

        <Spinner />
        }
        {publicMemos.map(
          publicMemo => {
            return (
            <List>
              <ListItem  key={publicMemo._id}>
                <Thumbnail square  source={require('./img/logo.png')} />
                <Text>{publicMemo.title}</Text>
                <Text note>{publicMemo.grade}</Text>
              </ListItem>
            </List>


            )
          }
        )}
      </Content>
    </Container>
  );

}


export default TabOne;
{/*<Card style={styles.card} key={publicMemo._id}>*/}
{/*<CardItem >*/}
{/*<Thumbnail source={require('./img/logo.png')} />*/}
{/*<Text>{publicMemo.title}</Text>*/}
{/*<Text note>{publicMemo.date}</Text>*/}
{/*<Text>{publicMemo.grade}</Text>*/}
{/*</CardItem>*/}
{/*<CardItem cardBody>*/}
{/*<Text>{publicMemo.content}</Text>*/}
{/*</CardItem>*/}
{/*</Card>*/}