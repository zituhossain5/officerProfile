/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'OfficerDetails'
>;

const TableRow = ({label, value}) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableLabel}>{label}</Text>
    <Text style={styles.tableValue}>{value}</Text>
  </View>
);

const OfficerDetails = ({route, navigation}: DetailsProps) => {
  const {officerId} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getOfficers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.107:8080/officer/get_officer/${officerId}`,
      );
      const jsonResponse = response.data;

      if (jsonResponse.success) {
        setData(jsonResponse.data || []);
      } else {
        console.error(jsonResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getOfficers();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais',
        }}
        style={styles.officerImage}
      />
      <Text style={styles.title}>{data.name}</Text>

      <View style={styles.table}>
        <TableRow label="Father's Name" value={data.father_name} />
        <TableRow label="Address" value={data.address} />
        <TableRow label="Date of Birth" value={data.date_of_birth} />
        <TableRow label="Phone" value={data.phone} />
        <TableRow label="Email" value={data.email} />
        <TableRow label="NID" value={data.nid} />
        <TableRow
          label="Educational Qualification"
          value={data.educational_qualification}
        />
        <TableRow
          label="Financial Activities"
          value={data.financial_activities}
        />
        <TableRow
          label="Gender"
          value={data.gender === '1' ? 'Male' : 'Female'}
        />
      </View>

      <TouchableHighlight
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('AddOfficer', {
            officerData: data,
          })
        }>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableHighlight>
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
  table: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
  },
  tableLabel: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  tableValue: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    width: 100,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
