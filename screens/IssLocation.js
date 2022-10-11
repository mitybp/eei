import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localizacao: {},
    };
  }

  getLocation = () => {
    axios.get('https://api.wheretheiss.at/v1/satellites/25544').then((response) => {
      this.setState({
        localizacao: response.data,
      });
    }).catch((error) => {
        alert(error.message);
      });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if(Object.keys(this.state.localizacao).length===0){
      return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontSize: 22, textAlign: "center"}}>Loading...</Text>
        </View>
      );
    }
    const {latitude,longitude,altitude,velocity}=this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Localização do ISS</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={{
            latitude:latitude,
            longitude:longitude,
            latitudeDelta:100,
            longitudeDelta:100
          }}>
            <Marker coordinate={{
              latitude:latitude,
              longitude:longitude
            }}>
              <Image source={require("../assets/iss_icon.jpg")} style={styles.markerIcon}/>
            </Marker>
          </MapView>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Latitude: {latitude}</Text>
            <Text style={styles.infoText}>Longitude: {longitude}</Text>
            <Text style={styles.infoText}>Altitude: {altitude}</Text>
            <Text style={styles.infoText}>Velocidade: {velocity}</Text>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2942',
  },
  title: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 22,
  },
  titleText: {
    fontSize: 36,
    color: '#f83a26',
  },
  mapContainer:{
    flex: 0.6
  },
  map:{
    width: "100%",
    height: "100%"
  },
  markerIcon:{
    width: 30,
    height: 30,
    borderRadius: 30
  },
  infoContainer:{
    flex: 0.2,
    marginTop: -30,
    borderRadius: 12,
    padding: 30
  },
  infoText:{
    fontSize: 18,
    color: "#d1d4d7"
  }
});
