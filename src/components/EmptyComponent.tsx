import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';

interface Props {
  title: string;
  icon: string;
}
const EmptyComponent: React.FC<Props> = ({title, icon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Icon name={icon} type="font-awesome" size={75} />
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
