import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Thumbnail,  Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from "native-base";

export default class App extends React.Component {

    navigateSomewhere()
    {
      this.props.navigation.navigate("Details");
    }

  render() {
    return (
      <View style={styles.container}>
        <Card  style={{flex: 1}} >
            <CardItem button onPress={() => this.navigateToDetailsPageForLoadout(arrEntry)}>
                <Left>
                    <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.navigateSomewhere()}>
                    <Icon name="ios-more" />
                    <Text>Tap to see it</Text>
                    </Button>
                </Left>
            </CardItem>
        </Card>
      </View>
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