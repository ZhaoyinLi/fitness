import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView, } from "react-native";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      goalDailyCalories:'',
      goalDailyActivity:'',
      username: ''
    };
  }
  static navigationOptions = {
    title: "Profile",
  };

  async componentDidMount() {
    const username = this.props.navigation.state.params.username;
    let response = await fetch("https://mysqlcs639.cs.wisc.edu/users/" + username, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "x-access-token": this.props.navigation.state.params.token,
        Connection: "keep-alive",
        "cache-control": "no-cache"
      }
    });
    response = await response.json();
    this.setState({
      firstName: response.firstName,
      lastName: response.lastName,
      goalDailyCalories:response.goalDailyCalories,
      goalDailyActivity:response.goalDailyActivity,
      username : response.username
    });
  }

  render() {
    const { navigate } = this.props.navigation.navigate;
    const style = StyleSheet.create({
     input : {
      borderWidth: 1,
      borderColor:"orange",
      height: 40,
      width: "60%",
      marginBottom: 30,
      paddingLeft: 5,
      color:"black"
    },
     button : {
      marginBottom: 10,
      color:"#f194ff",
      width: "60%"
    },
     textStyle : {
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingTop: 60,
      color:"orange"
    }
    })

    return (
      <ScrollView>
      <View>
       
      

      <View style={style.textStyle}>
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          First Name
        </Text>
        <TextInput
          placeholder={"First name"}
          style={style.input}
          value={this.state.firstName}
          onChangeText={text => {
            let firstName = this.state.firstName;
            this.setState({ firstName: text });
          }}
        />
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          Last Name
        </Text>
        <TextInput
          placeholder={"Last name"}
          style={style.input}
          value={this.state.lastName}
          onChangeText={text => {
            let lastName = this.state.lastName;
            this.setState({ lastName:text});
          }}
        />
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          Carlorie Goal
        </Text>
        <TextInput
          style={style.input}
          value={this.state.goalDailyCalories + ""}
          placeholder={"Set your goal"}
          onChangeText={text => {
            let goalDailyCalories = this.state.goalDailyCalories;
            this.setState({ goalDailyCalories: text });
          }}
        />
        
       
      

         <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          Activity Goal
        </Text>
        <TextInput
          placeholder={"Set your goal"}
          style={style.input}
          value={this.state.goalDailyActivity + ""}
          onChangeText={text => {
            let goalDailyActivity = this.state.goalDailyActivity;
            this.setState({ goalDailyActivity: text});
          }}
        />

        

        <View style={style.button}>
          <Button
            color={"#f194ff"}
            title="Update My Profile"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              const username = this.props.navigation.state.params.username;
              const {navigate} = this.props.navigation;
             
              fetch("https://mysqlcs639.cs.wisc.edu/users/"+ this.state.username, {
                method: "PUT",
                headers: {
                  Accept: "*/*",
                  Connection: "keep-alive",
                  "cache-control": "no-cache",
                  "Content-Type": "application/json",
                  "x-access-token": token
                },
                body: JSON.stringify({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  goalDailyCalories:this.state.goalDailyCalories,
                  goalDailyActivity: this.state.goalDailyActivity,
                })
              })
                .then(res => {
                  return res.json();
                })
  
                .then(res => {
                  navigate("Landing", {
                      token: token,
                      username:username,
                    })
                    alert(res.message);
                    this.props.navigation.state.params.componentDidMount();
                });
            }}
          />
        </View>

        <View style={style.button}>
          <Button
            color={"chocolate"}
            title="Sign Out"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
               const {navigate} = this.props.navigation;
               navigate("Login");
            }}
          />
        </View>

          <View style={style.button}>
          <Button
            color={"red"}
            title="Delete Account"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              alert('Delete successfully');
              const {navigate} = this.props.navigation;
               navigate("Login");
           fetch("https://mysqlcs639.cs.wisc.edu/users/"+ this.state.username, {
                method: "DELETE",
                headers: {
                  Accept: "*/*",
                  Connection: "keep-alive",
                  "cache-control": "no-cache",
                  "Content-Type": "application/json",
                  "x-access-token": token
                },
           })
            }}
          />
        </View>
       

    </View>
      </View>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
