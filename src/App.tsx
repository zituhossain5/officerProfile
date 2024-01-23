import React from 'react';
import type {PropsWithChildren} from 'react';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import OfficerList from './screens/OfficerList';
import OfficerDetails from './screens/OfficerDetails';

export type RootStackParamList = {
  OfficerList: undefined;
  OfficerDetails: {officerData: object};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OfficerList">
        <Stack.Screen
          name="OfficerList"
          component={OfficerList}
          options={{
            title: 'Officer List',
          }}
        />
        <Stack.Screen
          name="OfficerDetails"
          component={OfficerDetails}
          options={{
            title: 'Officer Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
