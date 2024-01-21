/* eslint-disable prettier/prettier */
/* OfficerDetailsScreen.js */
import React from 'react';
import {View, Text} from 'react-native';

const OfficerDetails = ({route}) => {
  const {officer} = route.params;

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>
        Officer Details
      </Text>
      <Text>Name: {officer.name}</Text>
      <Text>Address: {officer.address}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default OfficerDetails;
