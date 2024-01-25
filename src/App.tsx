/* eslint-disable prettier/prettier */
import React, {useMemo} from 'react';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import LoginScreen from './screens/LoginScreen';
import OfficerList from './screens/OfficerList';
import OfficerDetails from './screens/OfficerDetails';
import AddOfficer from './screens/AddOfficer';
import Header from './screens/Header';

export type RootStackParamList = {
  Login: undefined;
  OfficerList: undefined;
  OfficerDetails: {officerId: number};
  AddOfficer: {officerData?: object};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const memoizedHeader = useMemo(() => <Header />, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="OfficerList"
          component={OfficerList}
          options={{
            title: 'Officer List',
            header: () => memoizedHeader,
          }}
        />
        <Stack.Screen
          name="OfficerDetails"
          component={OfficerDetails}
          options={{
            title: 'Officer Details',
            header: () => memoizedHeader,
          }}
        />
        <Stack.Screen
          name="AddOfficer"
          component={AddOfficer}
          options={{
            title: 'Add/Update Officer', // Updated title
            header: () => memoizedHeader,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
