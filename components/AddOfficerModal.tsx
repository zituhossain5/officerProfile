/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const AddOfficerModal = ({isVisible, toggleModal, onOfficerAdded}) => {
  const [newOfficerName, setNewOfficerName] = useState('');
  const [newOfficerFatherName, setNewOfficerFatherName] = useState('');
  const [newOfficerAddress, setNewOfficerAddress] = useState('');
  const [newOfficerDOB, setNewOfficerDOB] = useState('');
  const [newOfficerPhone, setNewOfficerPhone] = useState('');
  const [newOfficerPhone2, setNewOfficerPhone2] = useState('');
  const [newOfficerEmail, setNewOfficerEmail] = useState('');
  const [newOfficerNID, setNewOfficerNID] = useState('');
  const [newOfficerEducation, setNewOfficerEducation] = useState('');
  const [newOfficerFinancialActivities, setNewOfficerFinancialActivities] =
    useState('');
  const [newOfficerGender, setNewOfficerGender] = useState('');
  const [newOfficerStatus, setNewOfficerStatus] = useState('');

  const addOfficer = async () => {
    try {
      const response = await axios.post(
        'http://192.168.48.185:8080/officer/create_officer',
        {
          name: newOfficerName,
          father_name: newOfficerFatherName,
          address: newOfficerAddress,
          date_of_birth: newOfficerDOB,
          phone: newOfficerPhone,
          phone2: newOfficerPhone2,
          email: newOfficerEmail,
          nid: newOfficerNID,
          educational_qualification: newOfficerEducation,
          financial_activities: newOfficerFinancialActivities,
          gender: newOfficerGender,
          status: newOfficerStatus,
          // Add more fields as needed
        },
      );

      const jsonResponse = response.data;

      if (jsonResponse.success) {
        onOfficerAdded(); // Notify parent component that an officer has been added
        // Reset form fields after successful addition
        setNewOfficerName('');
        setNewOfficerFatherName('');
        setNewOfficerAddress('');
        setNewOfficerDOB('');
        setNewOfficerPhone('');
        setNewOfficerPhone2('');
        setNewOfficerEmail('');
        setNewOfficerNID('');
        setNewOfficerEducation('');
        setNewOfficerFinancialActivities('');
        setNewOfficerGender('');
        setNewOfficerStatus('');
        toggleModal();
      } else {
        console.error(jsonResponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Add Officer</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Name"
            value={newOfficerName}
            onChangeText={text => setNewOfficerName(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Father's Name"
            value={newOfficerFatherName}
            onChangeText={text => setNewOfficerFatherName(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Address"
            value={newOfficerAddress}
            onChangeText={text => setNewOfficerAddress(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Date of Birth"
            value={newOfficerDOB}
            onChangeText={text => setNewOfficerDOB(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Phone"
            value={newOfficerPhone}
            onChangeText={text => setNewOfficerPhone(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Phone 2"
            value={newOfficerPhone2}
            onChangeText={text => setNewOfficerPhone2(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Email"
            value={newOfficerEmail}
            onChangeText={text => setNewOfficerEmail(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="NID"
            value={newOfficerNID}
            onChangeText={text => setNewOfficerNID(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Educational Qualification"
            value={newOfficerEducation}
            onChangeText={text => setNewOfficerEducation(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Financial Activities"
            value={newOfficerFinancialActivities}
            onChangeText={text => setNewOfficerFinancialActivities(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Gender"
            value={newOfficerGender}
            onChangeText={text => setNewOfficerGender(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Status"
            value={newOfficerStatus}
            onChangeText={text => setNewOfficerStatus(text)}
          />
          <TouchableHighlight style={styles.modalButton} onPress={addOfficer}>
            <Text style={styles.modalButtonText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingLeft: 8,
  },
  modalButton: {
    backgroundColor: '#0A79DF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AddOfficerModal;
