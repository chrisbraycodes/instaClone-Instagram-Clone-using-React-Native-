import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config/firebaseConfig'; // Centralized Firebase imports

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = doc(firestore, 'users', user.uid);
      const docSnapshot = await getDoc(userDoc);

      if (!docSnapshot.exists()) {
        await setDoc(userDoc, {
          email: user.email,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error logging in user:', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
