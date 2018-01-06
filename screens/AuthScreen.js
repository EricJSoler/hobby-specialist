import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../utils/auth';
import { Container, Thumbnail,  Header, Footer, Content, Card, CardItem, Left, Body, Title, Right, Button, Icon, Form, Item, Input, Label } from "native-base";

export default class AuthScreen extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {email: '', password: '', error: '', loading: false};
  }

  // Adding this so i don;t have to actually type for this screen just press login
  componentWillMount()
  {
    this.setState(previousState => {
        return {email: 'eric@cool.com', password: '12345678'};
      });
  }

  render() {
    return (
        <Container>
          <Header />
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={email => this.setState({email})} value={this.state.email}/>
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input onChangeText={password => this.setState({password})} value={this.state.password}/>
              </Item>
            </Form>
            {this.renderButtonOrLoading()}
          </Content>
        </Container>
      );
  }

  // TODO -- move to auth.js
  onLoginPress() {
      this.setState({error: '', loading: true});
      const { email, password } = this.state;
      signInWithEmailAndPassword(email, password).then(() => {
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
        createUserWithEmailAndPassword(email, password).then(() => {
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