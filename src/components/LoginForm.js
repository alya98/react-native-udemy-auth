import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, CardItem, Input, Spinner } from './common';
import firebase from 'firebase';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }
  onButtonPress = () => {
    const { email, password } = this.state;
    console.log(email, password);
    this.setState({error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess())
      .catch(()=>{
        console.log('creating account')
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(this.onLoginSuccess())
          .catch(this.onLoginFail());
    });
  }
onLoginSuccess = () => {
  this.setState({email: '', password: '', loading: false, error: ''})
}
onLoginFail = () => {
  this.setState({error: 'Authentification error', loading: false})
}
renderButton = () => {
  return this.state.loading ? <Spinner size='small'/> : <Button onButtonPress={this.onButtonPress}>  Log in</Button>;
}
  render() {
    return (
      <Card>
        <CardItem>
          <Input
            placeholder='user@gmail.com'
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            label='Email'
          />
        </CardItem>
        <CardItem>
        <Input
            placeholder='******'
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            label='Password'
            secureTextEntry
          />
        </CardItem>

        <Text style={styles.errorText}>{this.state.error}</Text>
        <CardItem>
          {this.renderButton()}
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  }
}
