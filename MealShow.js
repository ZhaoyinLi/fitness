import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView, } from "react-native";
import DatePicker from 'react-native-datepicker';

function FoodButton(props) {
  return (
    <Button
      style={{ width: '90%', marginBottom: 5 }}
      title={props.food.name} 
      mode="contained"
      color="orange"
      onPress={() => {
        props.listener();
      }}>
     
    </Button>
  );
}

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      date:"2019-11-19",
      foods:[],
      foodFat:'',
      foodCalories:'',
      foodProtein:'',
      foodCarbohydrates:'',
    };
  }
  static navigationOptions = {
    title: "Meal Details",
  };




  async componentDidMount() {
    const token = this.props.navigation.state.params.token;
    let response = await fetch('https://mysqlcs639.cs.wisc.edu' + '/meals/'+this.props.navigation.state.params.meal.id, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': this.props.navigation.state.params.token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
     const meal = this.props.navigation.state.params.meal;
     let foods = await fetch('https://mysqlcs639.cs.wisc.edu/meals/'+meal.id+'/foods/', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': this.props.navigation.state.params.token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
      foods = await foods.json();
      
      response = await response.json();
      let mealInfo = {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        name: meal.name,
        date: meal.date.split('T')[0],
        id: meal.id,
      };
      this.setState({
      name: response.name,
      date : response.date,
      foods: foods.foods,
    
    });
      foods = foods.foods;
      
      for (let i = 0; i < foods.length; i++) {
        let f = this.state.foods[i];
        mealInfo.calories += parseFloat(f.calories);
        mealInfo.protein += parseFloat(f.protein);
        mealInfo.carbohydrates += parseFloat(f.carbohydrates);
        mealInfo.fat += parseFloat(f.fat);
      }
     this.setState({
      
     foodFat:mealInfo.fat,
     foodCalories:mealInfo.calories,
     foodProtein:mealInfo.protein,
     foodCarbohydrates:mealInfo.carbohydrates
    });
    
    
   
  }

  render() {
    const { navigate } = this.props.navigation.navigate;
    let btn = [];
    const foods= this.state.foods;
    
    
     foods.forEach(a => {
        btn.push(
          <FoodButton
            food={a}
            listener={() => {
              const token = this.props.navigation.state.params.token;
              const meal = this.props.navigation.state.params.meal;
              
              const { navigate } = this.props.navigation;
              navigate("FoodShow", {
                componentDidMount: ()=>{this.componentDidMount()},
                token: token,
                food:a,
                meal:meal,
             }
              )
            }}
            />
              );
      });
    

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
        <Text style={{ marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
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

        <Text style={{  marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
         Total Calories
        </Text>
        <Text>
          { this.state.foodCalories+ ""}
        </Text>

        <Text style={{  marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
         Total Protein
        </Text>
        <Text>
          {this.state.foodProtein + ""}
        </Text>

        <Text style={{  marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
         Total Carbohydrates
        </Text>
        <Text>
          {this.state.foodCarbohydrates + ""}
        </Text>
        
        <Text style={{  marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
         Total Fat
        </Text>
        <Text>
          {this.state.foodFat + ""}
        </Text>

       <Text style={{  marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
          Added Food
        </Text>
         {btn}
       
      

         <Text style={{ marginBottom: 5, width: "60%", fontSize: 10,color:"orange",alignItems: "center" }}>
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
       title="Add Food Here"
       color="hotpink"
       onPress={() => {
          const {navigate} = this.props.navigation; 
          const token = this.props.navigation.state.params.token;
          const meal = this.props.navigation.state.params.meal;
           navigate("Food", {
             componentDidMount: ()=>{this.componentDidMount()},
             token: token,
             meal: meal,
             }
           )       
       }
      }
      />
 </View>
        <View style={style.button}>
          <Button
            color={"#f194ff"}
            title="Update this meal"


            onPress={() => {
              const token = this.props.navigation.state.params.token;
              const {navigate} = this.props.navigation;
               fetch("https://mysqlcs639.cs.wisc.edu/meals/"+this.props.navigation.state.params.meal.id, {
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
              navigate("MealLand");
            }}
          />
        </View>

        

          <View style={style.button}>
          <Button
            color={"red"}
            title="Delete this meal"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              
             
           fetch("https://mysqlcs639.cs.wisc.edu/meals/"+this.props.navigation.state.params.meal.id, {
                method: "DELETE",
                headers: {
                 Accept: '*/*',
                'x-access-token': this.props.navigation.state.params.token,
                Connection: 'keep-alive',
               'cache-control': 'no-cache',
                },
           })
              const {navigate} = this.props.navigation;
              this.props.navigation.state.params.componentDidMount();
              alert('Delete successfully');
              navigate("MealLand");// to do : delete 后不能自带删除
               
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
