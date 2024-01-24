/* eslint-disable prettier/prettier */
// AddOfficer.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import { Picker } from '@react-native-picker/picker';

type AddOfficerProps = NativeStackScreenProps<RootStackParamList, 'AddOfficer'>;

const AddOfficer = ({route, navigation}: AddOfficerProps) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email, setEmail] = useState('');
  const [nid, setNid] = useState('');
  const [educationalQualification, setEducationalQualification] = useState('');
  const [financialActivities, setFinancialActivities] = useState('');
  const [gender, setGender] = useState('');
  // Add other necessary state variables for officer details

  const {officerData} = route.params || {};

  useEffect(() => {
    // If officerData is present, it's an update; set initial values
    if (officerData) {
      setName(officerData.name);
      setFatherName(officerData.father_name);
      setAddress(officerData.address);
      setDateOfBirth(officerData.date_of_birth);
      setPhone(officerData.phone);
      setPhone2(officerData.phone2);
      setEmail(officerData.email);
      setNid(officerData.nid);
      setEducationalQualification(officerData.educational_qualification);
      setFinancialActivities(officerData.financial_activities);
      setGender(officerData.gender);
      // Set other initial values based on officerData
    }
  }, [officerData]);

  const handleSave = async () => {
    try {
      if (officerData) {
        // Update operation
        await axios.post(
          `http://192.168.31.105:8080/officer/update_officer/${officerData.id}`,
          {
            name,
            father_name: fatherName,
            address,
            date_of_birth: dateOfBirth,
            phone,
            phone2,
            email,
            nid,
            educational_qualification: educationalQualification,
            financial_activities: financialActivities,
            gender,
            // Include other updated fields
          },
        );
      } else {
        // Create operation
        await axios.post('http://192.168.31.105:8080/officer/create_officer', {
          name,
          father_name: fatherName,
          address,
          date_of_birth: dateOfBirth,
          phone,
          phone2,
          email,
          nid,
          educational_qualification: educationalQualification,
          financial_activities: financialActivities,
          gender,
          // Include other fields
        });
      }

      // After save, navigate back to OfficerList or perform other actions
      navigation.goBack();
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          {officerData ? 'Edit Officer' : 'Add Officer'}
        </Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>Father's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Father's Name"
          value={fatherName}
          onChangeText={text => setFatherName(text)}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={text => setDateOfBirth(text)}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
        />

        <Text style={styles.label}>Phone 2</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone 2"
          value={phone2}
          onChangeText={text => setPhone2(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={styles.label}>NID</Text>
        <TextInput
          style={styles.input}
          placeholder="NID"
          value={nid}
          onChangeText={text => setNid(text)}
        />

        <Text style={styles.label}>Educational Qualification</Text>
        <TextInput
          style={styles.input}
          placeholder="Educational Qualification"
          value={educationalQualification}
          onChangeText={text => setEducationalQualification(text)}
        />

        <Text style={styles.label}>Financial Activities</Text>
        <TextInput
          style={styles.input}
          placeholder="Financial Activities"
          value={financialActivities}
          onChangeText={text => setFinancialActivities(text)}
        />

        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="1" />
          <Picker.Item label="Female" value="2" />
        </Picker>

        {/* Add other input fields for officer details */}
        <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3D62',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddOfficer;
