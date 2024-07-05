import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaGRVDsDtFfpOMWjsaN8FHfyq5zPinfcg",
  authDomain: "instaclone-c9dad.firebaseapp.com",
  projectId: "instaclone-c9dad",
  storageBucket: "instaclone-c9dad.appspot.com",
  messagingSenderId: "199402134756",
  appId: "1:199402134756:web:26f243025ab738245820f1",
  measurementId: "G-4E2DFRC3QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onlogin = this.onlogin.bind(this);
  }

  onSignUp() {
    const { email, password } = this.state;
    firebase.auth().signInWIthEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          onPress={this.onSignUp}
          title="Sign in"
        />
      </View>
    );
  }
}

export default Login;
