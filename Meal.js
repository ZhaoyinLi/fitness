import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView, } from "react-native";
import DatePicker from 'react-native-datepicker';

class Meal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      meal: {},
      name:'',
      date:"2019-11-19"
    };
  }
  static navigationOptions = {
    title: "Meal",
  };

newName = (text) => {
      this.setState({ name: text })
   };
 
   meal = () => {
     const {navigate} = this.props.navigation.navigate;
     navigate("meal");
   }

  async getMeal() {
    const token = this.props.navigation.state.params.token;
    const meal = this.props.navigation.state.params.meal;
    let activities = await fetch('https://mysqlcs639.cs.wisc.edu/meals'+meal.id, {
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
      meal: this.props.meal,
      date: this.state.date,

    });
  }

async componentDidMount() {
    this.getMeal();
  }
  render() {
    const { navigate } = this.props.navigation;
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
        <Text style={{ marginBottom: 20, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Name
        </Text>
        <TextInput
          placeholder={"This is your meal name"}
          style={style.input}
          value={this.state.name+ ""}
          onChangeText = {this.newName}
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
            title="Add My Meal"
            onPress={() => {
              let meal = this.state.meal;
              let name = this.state.name;
              let meals = this.state.meals;
              let date = this.state.date;
             // alert("added!");
             
              let token = this.props.navigation.state.params.token;
              
              fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
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
                  date: date,
                  meal: meal,
                }),
              })
              
              .then(response => {
                  return response.json();
                })
                .then(result => {
                  if (result.message === "Meal created!") {
                    this.props.navigation.state.params.componentDidMount();
                    alert("added!");
                    navigate("MealLand");

                  } else {
                    alert(result.message);
                  }
                });    
            }}
          />
        </View>

        

          
       

    </View>
      </View>
      </ScrollView>
    );
  }
}

export default Meal;
