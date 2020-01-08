import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

function ActivityButton(props) {
  return (
  
    <Button
      style={{ width: '90%', marginBottom: 5 }}
      title={props.activity.name} 
      mode="contained"
      color="orange"
      onPress={() => {
        props.listener();
      }}>
     
     
    </Button>
  );
}

class ActivityLand extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      
      activities:[],
    };
  }
  static navigationOptions = {
    title: "Landing"
  };

   async componentDidMount() {
   const username = this.props.navigation.state.params.username;
    const token = this.props.navigation.state.params.token;
      let activities = await fetch('https://mysqlcs639.cs.wisc.edu/activities', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    activities = await activities.json();


   
    this.setState({
      activities: activities.activities,
    });
  }

  
 
  render() {
    const { navigate } = this.props.navigation.navigate;
    const { goalStatus } = this.state;
    let btn = [];
    const activities= this.state.activities;
   

    activities.forEach(a => {
        btn.push(
          <ActivityButton
            activity={a}
            listener={() => {
              const token = this.props.navigation.state.params.token;
              const { navigate } = this.props.navigation;
              navigate("Show", {
                componentDidMount: ()=>{this.componentDidMount()},
                token: token,
                activity:a,
             }
              )
            }}
            />
              );
      });
   
    
    
    return (
      <View>
      <Button 
       title="Add Activity Here"
       color="hotpink"
       onPress={() => {
          const {navigate} = this.props.navigation; 
          const token = this.props.navigation.state.params.token;
           navigate("Activity", {
             componentDidMount: ()=>{this.componentDidMount()},
             token: token,
             }
           )
               
       }
      }
      
      />
          <Text style={{ width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Added Activities 
        </Text>
        {btn}
    </View>
     
    );
  }
}

export default ActivityLand;
