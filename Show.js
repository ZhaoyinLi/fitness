import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView, } from "react-native";
import DatePicker from 'react-native-datepicker';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      duration:'',
      calories:'',
      date:"2019-11-19"
    };
  }
  static navigationOptions = {
    title: "Activity Details",
  };




  async componentDidMount() {
    const token = this.props.navigation.state.params.token;
    let response = await fetch('https://mysqlcs639.cs.wisc.edu' + '/activities/'+this.props.navigation.state.params.activity.id, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': this.props.navigation.state.params.token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    response = await response.json();
    this.setState({
      name: response.name,
      duration:response.duration,
      calories:response.calories,
      date : response. date
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
        Name
        </Text>
        <TextInput
          placeholder={"name"}
          style={style.input}
          value={this.state.name}
          onChangeText={text => {
            let name = this.state.name;
            this.setState({ name: text });
          }}
        />
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
        Duration
        </Text>
        <TextInput
          placeholder={"Duration"}
          style={style.input}
          value={this.state.duration}
          onChangeText={text => {
            let duration = this.state.duration;
            this.setState({ duration:text});
          }}
        />
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          Carlorie 
        </Text>
        <TextInput
          style={style.input}
          value={this.state.calories + ""}
          placeholder={" Carlorie "}
          onChangeText={text => {
            let calories = this.state.calories;
            this.setState({ calories: text });
          }}
        />
        
       
      

         <Text style={{ marginBottom: 5, width: "60%", fontSize: 15,color:"orange",alignItems: "center" }}>
          date
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
            title="Update this activity"


            onPress={() => {
              const token = this.props.navigation.state.params.token;
              const {navigate} = this.props.navigation;
               fetch("https://mysqlcs639.cs.wisc.edu/activities/"+this.props.navigation.state.params.activity.id, {
                method: "PUT",
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': this.props.navigation.state.params.token,
                  Connection: 'keep-alive',
                  'cache-control': 'no-cache',
                },
                body: JSON.stringify({
                  name: this.state.name,
                  duration: this.state.duration,
                  calories:this.state.calories,
                  date: this.state.date,
                })
              })
               .then(res => {
                  return res.json();
                })
               .then(res => {
                    alert(res.message);
                    this.props.navigation.state.params.componentDidMount();
                });
                navigate("ActivityLand");
            }}
          />
        </View>

        

          <View style={style.button}>
          <Button
            color={"red"}
            title="Delete this activity"
            onPress={() => {
             

              
             
           fetch("https://mysqlcs639.cs.wisc.edu/activities/"+this.props.navigation.state.params.activity.id, {
                method: "DELETE",
                headers: {
                 Accept: '*/*',
                'x-access-token': this.props.navigation.state.params.token,
                Connection: 'keep-alive',
               'cache-control': 'no-cache',
                },
           })
              const {navigate} = this.props.navigation;
              const token = this.props.navigation.state.params.token;
              this.props.navigation.state.params.componentDidMount();
              alert('Delete successfully');
              navigate("ActivityLand");
               
            }}
          />
        </View>
       

    </View>
      </View>
      </ScrollView>
    );
  }
}

export default Show;
