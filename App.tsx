import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import OfficerList from './components/OfficerList';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <OfficerList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
