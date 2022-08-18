/* eslint-disable react/prop-types */
import {Text, StyleSheet, View, Touchable} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PFF({
  postPoints,
  postName,
  followersPoint,
  followersName,
  followingName,
  followingPoints,
  onPressFollowing,
  onPressFollower,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideView}>
          <Text style={styles.postPoints}>{postPoints}</Text>
          <Text style={styles.name}>{postName}</Text>
        </View>
        <View style={styles.verticalLine}></View>
        <TouchableOpacity onPress={onPressFollower}>
          <View style={styles.insideView}>
            <Text style={styles.postPoints}>{followersPoint}</Text>
            <Text style={styles.name}>{followersName}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.verticalLine}></View>

        <TouchableOpacity onPress={onPressFollowing}>
          <View style={styles.insideView}>
            <Text style={styles.postPoints}>{followingPoints}</Text>
            <Text style={styles.name}>{followingName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E6ECF5',
  },
  postPoints: {
    fontSize: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    color: colors.pureBlack,
  },
  verticalLine: {
    borderWidth: 1,
    borderColor: '#E6ECF5',
    height: 40,
  },
  insideView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
