import React, { Component, PropTypes, StyleSheet, View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
const Screen = Dimensions.get('window');
import FBLogin from '../../Auth/Facebook';

class Profile extends Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
    this.myTickets = this.myTickets.bind(this);
  }
  logOut(){
    Actions.login();
  }
  myTickets(){
    Actions.tickets();
  }
  render() {
    const { userData } = this.props;
    const menuData = userData.authData[userData.authData.auth.provider];
    return (
      <View style={styles.container}>
        <Image
            source={{uri: menuData.profileImageURL}}
            style={styles.profileImage}
        />
        <View style={styles.regards}>
          <Text style={styles.regardsText}>Hola {menuData.cachedUserProfile.first_name}!</Text>
        </View>
        <Text style={styles.question}>¿Qué quieres hacer?</Text>
        <View style={styles.hr}></View>
        <TouchableHighlight
            onPress={this.myTickets}
            style={styles.menuLink}
            underlayColor={'rgba(150,150,150,0.3)'}
        >
          <Text style={styles.menuLinkText}>Ver mis tickets</Text>
        </TouchableHighlight>
        <View style={styles.hr}></View>
        <View
            onPress={this.logOut}
            style={styles.menuLink}
            underlayColor={'rgba(150,150,150,0.3)'}
        >
          <Text style={styles.menuLinkTextFacebook}>Desconectar mi Cuenta</Text>
          <FBLogin
              userData={this.props.userData}
              logIn={this.props.logIn}
              logOut={this.props.logOut}
          />
        </View>
        <View style={styles.hr}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    marginBottom: 50,
    bottom:0,
    top:0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regards:{
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  regardsText:{
    fontSize: 20
  },
  question:{
    fontSize: 14,
    paddingBottom: 30,
  },
  hr:{
    width:(Screen.width/3)*2,
    height:2,
    borderBottomColor: 'rgba(200,200,200,1)',
    borderBottomWidth: 1,
  },
  menuLink:{
    alignItems: 'center',
    padding:15,
    paddingLeft:6,
    paddingRight:6,
    width:(Screen.width/3)*2,
  },
  menuLinkTextFacebook:{
    fontSize: 16,
    paddingBottom: 10,
  },
  menuLinkText:{
    fontSize: 16,
  },
  profileImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
})
export default Profile;
