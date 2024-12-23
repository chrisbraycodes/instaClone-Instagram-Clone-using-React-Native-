global.ReadableStream = require('web-streams-polyfill/ponyfill').ReadableStream;
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
