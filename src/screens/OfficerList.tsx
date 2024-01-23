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
import {SafeAreaView} from 'react-native-safe-area-context';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type OfficerListProps = NativeStackScreenProps<
  RootStackParamList,
  'OfficerList'
>;

export default function OfficerList({navigation}: OfficerListProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOfficerModalVisible, setAddOfficerModalVisible] = useState(false);

  const getOfficers = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.107:8080/officer/all_officer',
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
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
              {/* <Text style={styles.headingText}>Officer List</Text> */}
              <ScrollView style={styles.container} scrollEnabled={false}>
                {data
                  .filter(filterOfficers)
                  .map((officeer) => (
                    <View key={officeer?.id} style={styles.listContainer}>
                      <View style={styles.userCard}>
                        {renderUserImage(officeer?.image)}
                        <View>
                          <Text style={styles.userName}>{officeer?.name}</Text>
                          <Text style={styles.userStatus}>{officeer?.address}</Text>
                        </View>
                      </View>
                      <TouchableHighlight
                        style={styles.detailsButton}
                        onPress={() =>
                          navigation.navigate('OfficerDetails', {
                            officerData: officeer,
                          })
                        }>
                        <Text style={styles.detailsButtonText}>
                          View Details
                        </Text>
                      </TouchableHighlight>
                    </View>
                  ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 20,
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
    backgroundColor: '#0A3D62',
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  detailsButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
    backgroundColor: '#0A79DF',
    padding: 4,
    borderRadius: 10,
  },
});
