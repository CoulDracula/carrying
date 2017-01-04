
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon ,Card, CardItem,Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image } from 'react-native';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
    reset,
    pushRoute,
} = actions;

class AppPage extends Component {
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
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>App Center</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <Row>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card style={styles.card}>
                <CardItem>
                  <Thumbnail />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </CardItem>
                <CardItem>
                  <Row>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                    <Col>
                      <Button transparent>
                        <Icon name="logo-github" />
                        1,926
                      </Button>
                    </Col>
                  </Row>
                </CardItem>
              </Card>
            </Col>
          </Row>
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


export default connect(mapStateToProps, bindAction)(AppPage);
