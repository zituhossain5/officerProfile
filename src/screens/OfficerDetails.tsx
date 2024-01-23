/* eslint-disable prettier/prettier */
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// navigation

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'OfficerDetails'
>;

const OfficerDetails = ({route}: DetailsProps) => {
  const {officerData} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais' }} style={styles.officerImage} />
      <Text style={styles.title}>{officerData.name}</Text>
      <Text style={styles.subtitle}>Father's Name: {officerData.father_name}</Text>
      <Text style={styles.subtitle}>Address: {officerData.address}</Text>
      <Text style={styles.subtitle}>Date of Birth: {officerData.date_of_birth}</Text>
      <Text style={styles.subtitle}>Phone: {officerData.phone}</Text>
      <Text style={styles.subtitle}>Email: {officerData.email}</Text>
      <Text style={styles.subtitle}>NID: {officerData.nid}</Text>
      <Text style={styles.subtitle}>Educational Qualification: {officerData.educational_qualification}</Text>
      <Text style={styles.subtitle}>Financial Activities: {officerData.financial_activities}</Text>
      <Text style={styles.subtitle}>Gender: {officerData.gender === '1' ? 'Male' : 'Female'}</Text>
    </View>
  );
};

export default OfficerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3D62',
    padding: 20,
    alignItems: 'center',
  },
  officerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
});
