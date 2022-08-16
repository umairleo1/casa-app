/* eslint-disable react/prop-types */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from 'src/utils/themes/global-colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Datepicker({
  handleConfirm,
  hideDatePicker,
  showDatePicker,
  isVisible,
  date,
  error,
  onChange,
}) {
  return (
    <>
      <View>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateView}>
          <Text style={styles.dateText}>{date}</Text>
          <Icon name="calendar-month-outline" size={19} color="#BBBBBB" />
        </TouchableOpacity>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChange={onChange}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  dateView: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    borderColor: colors.innerBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: colors.placeholderColor,
    borderColor: colors.innerBorder,
  },
  errorText: {
    color: colors.redColor,
    fontSize: 12,
  },
  errorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
