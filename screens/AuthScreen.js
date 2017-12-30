import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import database from '../config/database/firebase';
import { FormLabel, FormInput } from 'react-native-elements';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label } from "native-base";

export default class AuthScreen extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {email: '', password: '', error: '', loading: false};
  }

  render() {
    return (
        <Container>
          <Header />
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={email => this.setState({email})} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input onChangeText={password => this.setState({password})} />
              </Item>
            </Form>
            {this.renderButtonOrLoading()}
          </Content>
        </Container>
      );
  }

  onLoginPress() {
      this.setState({error: '', loading: true});
      const { email, password } = this.state;
      database.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({error: '', loading: false});
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({error: 'Auth failure', loading: false});
      });
  }

  onSignUpPress() {
        this.setState({error: '', loading: true});
        const { email, password } = this.state;
        database.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error: '', loading: false});
            this.props.navigation.navigate('Home');
          })
          .catch(() => {
            this.setState({error: 'Auth failure', loading: false});
          });
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return ( 
                <Text>
                    Loading
                </Text>
            )
        };
        return (
            <View>
                <Button onPress={this.onLoginPress.bind(this)}>
                    <Text>
                        Login
                    </Text>
                </Button>
                <Button onPress={this.onSignUpPress.bind(this)}>
                    <Text>
                        Sign Up
                    </Text>
                </Button>
                {this.renderErrorIfOccurred()}
            </View>
        );
    }

    renderErrorIfOccurred() {
        if (!this.state.error) {
            return null;
        }
        return (
            <Text>
                Error
            </Text>
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