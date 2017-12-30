import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon} from "native-base";

export default class AuthoringScreen extends React.Component {

    navigateToPostEditor()
    {
        this.props.navigation.navigate("PostEditor");
    }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Authoring</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
            <Button onPress={() => this.navigateToPostEditor()}>
                <Text>
                    Add Post 
                </Text> 
            </Button>
        </Content>
        <Footer>
          <Left>
          </Left>
          <Body>
            <Text>Created by Eric J. Soler and Christopher A. DuBois</Text>
          </Body>
          <Right>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });