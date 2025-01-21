import React from 'react';
import { Dimensions } from 'react-native';
import { Provider } from "react-redux";
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './pages/main/HomeScreen';
import ChatScreen from './pages/chat/ChatScreen';
import LoginScreen from './pages/login/LoginScreen';
import SignUpScreen from './pages/signup/SignUpScreen';
import { Store } from './modules/redux/Store';
import { Toaster } from 'sonner-native';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  const convex = new ConvexReactClient("https://deafening-dinosaur-877.convex.cloud", {
    unsavedChangesWarning: false,
  });

  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <ConvexProvider client={convex}>
          <GestureHandlerRootView>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
                <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name="Chat" options={{headerShown: false}} component={ChatScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            <Toaster 
              position='top-center'
              offset={Dimensions.get('window').height / 10 + 10}
              closeButton={true}
              swipeToDismissDirection='left'
            />
          </GestureHandlerRootView>
        </ConvexProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;