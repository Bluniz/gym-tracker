import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from "reactotron-react-native-mmkv"
import reactotronZustand from "reactotron-plugin-zustand"
import { storage } from '../services/storage';
import {useStore} from "../stores"


console.log('executando config do reactotron');

Reactotron // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'Gym Tracker'
  })
  .use(mmkvPlugin({storage}))
  .use(reactotronZustand({
    stores: [{ name: "main", store: useStore }]
  }))
  .useReactNative({
    asyncStorage: true,
    editor: false,
    errors: { veto: (stackFrame) => false }, 
    overlay: false, 
  }) // add all built-in react native plugins
  .connect(); // let's connect!


// swizzle the old one
const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: "CONSOLE.LOG",
    value: args,
    preview: args.length > 0 && typeof args[0] === "string" ? args[0] : null,
  });
};