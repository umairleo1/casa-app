import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'src/utils/themes/global-colors';

const MultiSelectPicker = ({multiSelect, setMultiSelect, data, color}) => {
  const renderDataItem = item => {
    return (
      <View style={styles.item}>
        <Text>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        dropdownPosition="top"
        style={styles.dropdown}
        placeholderStyle={[
          styles.placeholderStyle,
          {color: color || colors.placeholderColor},
        ]}
        // selectedTextStyle={styles.selectedTextStyle}
        selectedTextStyle={{color: 'red'}}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Collective Heritage"
        value={multiSelect}
        search
        activeColor={'#EDF1F0'}
        searchPlaceholder="Search..."
        onChange={value => {
          setMultiSelect(value), console.log(value);
        }}
        renderItem={renderDataItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={[styles.textSelectedStyle]}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={15} />
            </View>
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.placeholderColor,
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    // color: colors.placeholderColor,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'red',
    // fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.placeholderColor,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default MultiSelectPicker;
