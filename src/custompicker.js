import React, {useState} from 'react';
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';

const CustomDropdown = ({
  placeholder,
  width,
  height,
  options,
  selectedValues,
  onValuesSelect,
  labelKey,
  valueKey,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleValueSelect = value => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(val => val !== value)
      : [...selectedValues, value];
    onValuesSelect(updatedValues);
  };

  3;
  const areAllOptionsSelected = selectedValues.length === options.length;

  return (
    <View style={{marginBottom: 20}}>
      <Pressable
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          backgroundColor: 'white',
          elevation: 5,
          borderBlockColor: 'black',
          borderColor: 'black',

          borderRadius: 5,
          padding: 14,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 1.41,

          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: 200,
        }}>
        <Text style={{fontSize: 14, color: 'black'}}>
          {selectedValues.length
            ? selectedValues
                .map(
                  item => options.find(obj => obj[valueKey] === item)[labelKey],
                )
                .join(', ')
            : placeholder}
        </Text>
        {/* <Image
          source={require('../assets/expand.png')}
          style={{
            width: 12.5,
            height: 12.5,
          }}
        /> */}
      </Pressable>
      <View>
        <Modal
          animationType="fade"
          visible={isDropdownOpen}
          onRequestClose={() => setIsDropdownOpen(false)}
          transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 8,
                paddingVertical: 20,
                paddingHorizontal: 15,
                maxHeight: height,
                backgroundColor: '#fff',
                elevation: 1,
                width: width,
              }}>
              <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={{
                  fontSize: 13,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  padding: 5,
                  borderRadius: 20,
                  marginBottom: 20,
                  paddingLeft: 20,
                }}
              />

              <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() =>
                  onValuesSelect(
                    areAllOptionsSelected
                      ? []
                      : options.map(option => option[valueKey]),
                  )
                }>
                <Text style={{fontSize: 15}}>
                  {areAllOptionsSelected ? 'Unselect All' : 'Select All'}
                </Text>
              </TouchableOpacity>

              <ScrollView>
                {options
                  .filter(option =>
                    option[labelKey]
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase()),
                  )
                  .map(option => (
                    <TouchableOpacity
                      key={option[valueKey]}
                      onPress={() => handleValueSelect(option[valueKey])}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1,
                          borderColor: selectedValues.includes(option[valueKey])
                            ? '#3A9EBB'
                            : 'gray',
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {selectedValues.includes(option[valueKey]) && (
                          <Text
                            style={{
                              marginBottom: 1,
                              color: selectedValues.includes(option[valueKey])
                                ? '#3A9EBB'
                                : 'gray',
                            }}>
                            ✓
                          </Text>
                        )}
                      </View>
                      <Text style={{fontSize: 14, marginBottom: 1}}>
                        {option[labelKey]}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
              <Pressable
                style={{marginTop: 15}}
                onPress={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}>
                <Text style={{alignSelf: 'center'}}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CustomDropdown;
