import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from "base-64";

class Login extends React.Component {
 constructor(props) {
    super(props);
  this.state = {
      username: '',
      password: '',
      firstName:'',
      lastName:''
   };
 }
 static navigationOptions = {
    title: "Sign Up",
  }; 

  newUsername = (text) => {
      this.setState({ username: text })
   }
   newPassword = (text) => {
      this.setState({ password: text })
   }
   newFirstName = (text) => {
      this.setState({ firstName: text })
   }
   newLastName = (text) => {
      this.setState({ lastName: text })
   };
  


   signUp = () => {
     const {navigate} = this.props.navigation.navigate;
     navigate("SignUp");
   }

  render() {
     const {navigate} = this.props.navigation.navigate;
     const styles = StyleSheet.create({
   input: {
      margin: 15,
      height: 40,
      borderColor: 'orange',
      borderWidth: 1
   },
})

    return (
      <View> 
      <Button 
       title="Sign Up Here!"
       color="#f194ff"
       
      onPress={() => {
              const username = this.state.username;
              const password = this.state.password;
              const firstName = this.state.firstName;
              const lastName = this.state.lastName;
              
              if (password === null || password === "" || password.length < 6) {
                alert("Password too short");
                return;
              }
              
              if (username === null || username === "" || username.length < 6) {
                alert("Username too short");
                return;
              }
              
              fetch("https://mysqlcs639.cs.wisc.edu/users", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  firstName: firstName,
                  lastName: lastName
                })
              })
                .then(response => {
                  return response.json();
                })
                .then(result => {
                  if (result.message === "User created!") {
                    alert("Finished Sign Up!");
                    navigate("Login");
                  } else {
                    alert(result.message);
                  }
                });
      }
      }
       />
        
  
      <TextInput style = {styles.input}
               underlineColorIos = "transparent"
               placeholder = "Username"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.newUsername}/>
            
            <TextInput style = {styles.input}
               underlineColorIos = "transparent"
               placeholder = "Password"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.newPassword}/>
            
            <TextInput style = {styles.input}
               underlineColorIos = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.newFirstName}/>

            <TextInput style = {styles.input}
               underlineColorIos = "transparent"
               placeholder = "Last Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.newLastName}/>
            
            
      </View>
      
      
    );
  }
}



export default Login;