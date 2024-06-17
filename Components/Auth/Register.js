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

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const { email, password, name } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
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
          onPress={this.onSignup}
          title="Sign Up"
        />
      </View>
    );
  }
}

export default Register;
