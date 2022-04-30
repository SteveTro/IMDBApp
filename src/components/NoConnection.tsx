import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';

const NoConnection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="warning" color="white" />
        <Text style={styles.notification}>There is no Internet connection</Text>
      </View>
    </View>
  );
};

export default NoConnection;

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});
