import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default function PFF({
  postPoints,
  postName,
  followersPoint,
  followersName,
  followingName,
  followingPoints,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideView}>
          <Text style={styles.postPoints}>{postPoints}</Text>
          <Text style={styles.name}>{postName}</Text>
        </View>
        <View style={styles.verticalLine}></View>

        <View style={styles.insideView}>
          <Text style={styles.postPoints}>{followersPoint}</Text>
          <Text style={styles.name}>{followersName}</Text>
        </View>
        <View style={styles.verticalLine}></View>

        <View style={styles.insideView}>
          <Text style={styles.postPoints}>{followingPoints}</Text>
          <Text style={styles.name}>{followingName}</Text>
        </View>
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
