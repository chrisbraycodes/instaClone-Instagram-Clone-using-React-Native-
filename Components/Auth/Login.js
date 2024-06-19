import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
<<<<<<< Updated upstream
  *secret*
=======
  
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      name: ''
=======
>>>>>>> Stashed changes
    };

    this.onlogin = this.onlogin.bind(this);
  }

<<<<<<< Updated upstream
  onSignup() {
    const { email, password } = this.state;
    createUserWithEmailAndPassword(email, password)
=======
  onSignUp() {
    const { email, password } = this.state;
    firebase.auth().signInWIthEmailAndPassword(email, password)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          onPress={this.onSignup}
=======
          onPress={this.onSignUp}
>>>>>>> Stashed changes
          title="Sign in"
        />
      </View>
    );
  }
}

<<<<<<< Updated upstream
export default Register;
=======
export default Login;
>>>>>>> Stashed changes
