import Reactotron, { networking } from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

Reactotron.setAsyncStorageHandler?.(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-async-storage/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(networking()) // <--- here we go!
  .connect() // let's connect!
