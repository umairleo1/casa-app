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
}) {
  return (
    <>
      <View>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateView}>
          <Text style={styles.dateText}>{date}</Text>
          <Icon name="calendar-month-outline" size={19} color="#BBBBBB" />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
});
