import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './common';
import firebase from 'firebase';
import LoginForm from './LoginForm';

export default class App extends Component {
  state = {
    loggedIn: null,
  }
  componentDidMount() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyBpv7YbGKpPj_fq5XLDGMWtRfi4p9uQIh0",
        authDomain: "auth-7bcd4.firebaseapp.com",
        databaseURL: "https://auth-7bcd4.firebaseio.com",
        projectId: "auth-7bcd4",
        storageBucket: "auth-7bcd4.appspot.com",
        messagingSenderId: "906419009973"
      }
    );
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.setState({loggedIn: true})
      else this.setState({loggedIn: false})
    });
  }
  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
      return <Button onButtonPress={() => firebase.auth().signOut()}>Log out</Button>;
      case false:
      return <LoginForm />;
      default:
      return <Spinner size='large' />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText='Authentification'/>
        {this.renderContent()}
      </View>
    );
  }
}

