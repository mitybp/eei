import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class MeteorScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Meteoros</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#2d2942"
  },
  title:{
    flex: 0.10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 22
  },
  titleText:{
    fontSize: 36,
    color: "#f83a26"
  }
});