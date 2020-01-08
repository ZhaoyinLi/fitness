import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from "base-64";

class Login extends React.Component {
  state = {
      username: 'andy11',
      password: '111111',
      color1:'orange',
      color2:'green',
  }
  
   static navigationOptions = {
    title: 'Burn Calorie Log In Page',
    alignItems: "center",
    marginLeft: 50,
  };
  
  newUsername = (text) => {
      this.setState({ username: text })
   }
   newPassword = (text) => {
      this.setState({ password: text })
   }

  signUp = () => {
     const {navigate} = this.props.navigation.navigate;
     navigate("SignUp");
   }
   
   login = (username, pass) => {
          const {navigate} = this.props.navigation;
          //navigate("Landing");
      fetch("https://mysqlcs639.cs.wisc.edu/login", {
                method: "GET",
                headers: {
                  "cache-control": "no-cache",
                  Connection: "keep-alive",
                  "Accept-Encoding": "gzip, deflate",
                  "Cache-Control": "no-cache",
                  Accept: "*/*",
                  Authorization: `Basic ${base64.encode(
                    `${this.state.username}:${this.state.password}`
                  )}`
                }
              })
                .then(response => {
                  return response.json();
                })
                .then(result => {
                  if (result.token) {
                    navigate("Landing", {
                      token: result.token,
                      username: this.state.username,
                    });
                  } else alert("Username/Password Incorrect!");
                })
                .catch(err => {
                  alert(err);
                });
      //go to the profile page
   }

  render() {
     const {navigate} = this.props.navigation;
     
     const styles = StyleSheet.create({
   input: {
      margin: 15,
      height: 50,
      width: "60%",
      borderWidth: 1,
      alignItems: "center",
      marginLeft:50
   },
   
})  
    
    return (
      <View> 
      <TextInput style = {styles.input}
              placeholder = "Username"
               underlineColorIos = "transparent"
               placeholderTextColor = 'black'
               onChangeText = {this.newUsername}/>
            
            <TextInput style = {styles.input}
               placeholder = "Password"
               underlineColorIos = "transparent" 
               placeholderTextColor = 'black'
               onChangeText = {this.newPassword}/>
            
           <Button 
            title="Accessibility"
            color='black'
            onPress={() => {
              this.setState({ color1: 'black' });
              this.setState({ color2: 'black' });
             
            }
           }
         />
           <Button 
            title="Log In Here"
            color={this.state.color1}
            onPress={() => {
              
              this.login(this.state.username, this.state.password)     
            }
           }
         />
         <Button 
            title="New: Sign Up Here"
            color={this.state.color2}
            onPress={() => {
               this.signUp() 
            }
           }
         />
            
      </View>
      
    );
  }
}



export default Login;