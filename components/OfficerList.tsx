/* eslint-disable prettier/prettier */
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddOfficerModal from './AddOfficerModal';

export default function OfficerList() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOfficerModalVisible, setAddOfficerModalVisible] = useState(false);

  const getOfficers = async () => {
    try {
      const response = await axios.get(
        'http://192.168.48.185:8080/officer/all_officer',
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

  useEffect(() => {
    getOfficers();
  }, []);

  const renderUserImage = image => {
    const defaultImageUrl =
      'https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais';

    return (
      <Image
        source={{uri: defaultImageUrl}} //image ||
        style={styles.userImage}
      />
    );
  };

  const filterOfficers = officer => {
    return (
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleAddOfficerModal = () => {
    setAddOfficerModalVisible(!isAddOfficerModalVisible);
  };

  const onOfficerAdded = () => {
    // Refresh officer list after adding a new officer
    getOfficers();
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search officers..."
          onChangeText={text => setSearchTerm(text)}
        />
        <TouchableHighlight
          style={styles.addButton}
          onPress={toggleAddOfficerModal}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableHighlight>
      </View>
      <AddOfficerModal
        isVisible={isAddOfficerModalVisible}
        toggleModal={toggleAddOfficerModal}
        onOfficerAdded={onOfficerAdded}
      />
      <AddOfficerModal
        isVisible={isAddOfficerModalVisible}
        toggleModal={toggleAddOfficerModal}
        onOfficerAdded={onOfficerAdded}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.headingText}>Officer List</Text>
          <ScrollView style={styles.container} scrollEnabled={false}>
            {data.filter(filterOfficers).map(({id, name, address, image}) => (
              <View key={id} style={styles.userCard}>
                {renderUserImage(image)}
                <View>
                  <Text style={styles.userName}>{name}</Text>
                  <Text style={styles.userStatus}>{address}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 3, // Adjust the flex value to control the width
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginRight: 8,
  },
  addButton: {
    flex: 1, // Adjust the flex value to control the width
    backgroundColor: '#0A79DF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: '#0A79DF',
    padding: 4,
    borderRadius: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  userStatus: {
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
