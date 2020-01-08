import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-datepicker';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      activity: {},
      name:'',
      duration:'',
      calories:'',
      date:"2019-11-19"
    };
  }
  static navigationOptions = {
    title: "Activity",
  };

newName = (text) => {
      this.setState({ name: text })
   }
   newDuration = (text) => {
      this.setState({ duration: text })
   }
   newCalories = (text) => {
      this.setState({ calories: text })
   };

   activity = () => {
     const {navigate} = this.props.navigation;
     navigate("Activity");
   }

  async getActivities() {
    const token = this.props.navigation.state.params.token;
    const activity = this.props.navigation.state.params.activity;
    let activities = await fetch('https://mysqlcs639.cs.wisc.edu/activities'+activity.id, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': this.props.navigation.state.params.token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    activities = await activities.json();

    this.setState({
      activity: this.props.activity,
      date: this.state.date,

    });
  }

async componentDidMount() {
    this.getActivities();
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
      <View>
      <View style={style.textStyle}>
        <Text style={{ marginBottom: 20, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Name
        </Text>
        <TextInput
          placeholder={"This is your activity name"}
          style={style.input}
          value={this.state.name+ ""}
          // onChangeText={text => {
          //   let name = this.state.name;
          //   this.setState({ name: text });
          // }}
          onChangeText = {this.newName}
        />

        <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Duration
        </Text>
        <TextInput
          placeholder={"minutes"}
          style={style.input}
          value={this.state.duration+ ""}
          // onChangeText={text => {
          //   let duration = this.state.duration;
          //   this.setState({ duration:text});
          // }}
          onChangeText = {this.newDuration}
         />

 <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
         Carlorie 
        </Text>
        <TextInput
          style={style.input}
          value={this.state.calories  + ""}
          placeholder={"Burn calories"}
          // onChangeText={text => {
          //   let calories  = this.state.calories ;//TO DO: DATE FLOAL NEED 
          //   this.setState({ calories : text });
          // }}
          onChangeText = {this.newCalories}
        />
  <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
         Date
        </Text>
        <DatePicker
            style={{ width: "100%" }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2021-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />

        <View style={style.button}>
          <Button
            color={"#f194ff"}
            title="Add My Activity"
            onPress={() => {
              let activity = this.state.activity;
              let name = this.state.name;
              let duration = this.state.duration;
              let calories = this.state.calories;
              let activities = this.state.activities;
              
              let token = this.props.navigation.state.params.token;
              fetch('https://mysqlcs639.cs.wisc.edu/activities', {
                method: 'POST',
                headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/json',
                  'x-access-token': token,
                  Connection: 'keep-alive',
                  'cache-control': 'no-cache',
                },
                
                body: JSON.stringify({
                  name: name,
                  calories: calories,
                  duration: duration
                }),
              })
              
              .then(response => {
                  return response.json();
                })
                .then(result => {
                  if (result.message === "Activity created!") {
                    this.props.navigation.state.params.componentDidMount();
                    alert("added!");
                    navigate("ActivityLand");

                  } else {
                    alert(result.message);
                  }
                });    
            }}
          />
        </View>

        

          
       

    </View>
      </View>
    );
  }
}

export default Activity;
