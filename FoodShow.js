import * as React from "react";
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView } from "react-native";




class FoodShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      calories:'',
      protein:'',
      carbohydrates:'',
      fat:'',
    };
  }
  static navigationOptions = {
    title: "Food Details",
  };

    newName = (text) => {
      this.setState({ name: text })
   }
   newProtein = (text) => {
      this.setState({ protein: text })
   }
   newCalories = (text) => {
      this.setState({ calories: text })
   }
   newCarbohydrates = (text) => {
      this.setState({ carbohydrates: text })
   }
   newFat = (text) => {
      this.setState({ fat: text })
   };

food = () => {
     const {navigate} = this.props.navigation;
     navigate("FoodShow");
   }
   
  async componentDidMount() {
    const token = this.props.navigation.state.params.token;
    const meal =this.props.navigation.state.params.meal;
    const food =this.props.navigation.state.params.food;
    
    let foods = await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + meal.id + '/foods/'+food.id, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': this.props.navigation.state.params.token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    
      foods = await foods.json();

    
    
    this.setState({
      name: foods.name,
      calories: foods.calories,
      protein: foods.protein,
      carbohydrates: foods.carbohydrates,
      fat: foods.fat,
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
        <Text style={{ marginBottom: 20, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Name
        </Text>
        <TextInput
          placeholder={"This is your food name"}
          style={style.input}
          value={this.state.name+ ""}
          // onChangeText={text => {
          //   let name = this.state.name;
          //   this.setState({ name: text });
          // }}
          onChangeText = {this.newName}
        />

        <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
          Calories
        </Text>
        <TextInput
          placeholder={"Enter your food data"}
          style={style.input}
          value={this.state.calories+ ""}
          // onChangeText={text => {
          //   let duration = this.state.duration;
          //   this.setState({ duration:text});
          // }}
          onChangeText = {this.newCalories}
         />

 <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
        Protein
        </Text>
        <TextInput
          style={style.input}
          value={this.state.protein  + ""}
          placeholder={"Enter your food data"}
          // onChangeText={text => {
          //   let calories  = this.state.calories ;//TO DO: DATE FLOAL NEED 
          //   this.setState({ calories : text });
          // }}
          onChangeText = {this.newProtein}
        />

        <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
        Carbohydrates
        </Text>
        <TextInput
          style={style.input}
          value={this.state.carbohydrates  + ""}
          placeholder={"Enter your food data"}
          // onChangeText={text => {
          //   let calories  = this.state.calories ;//TO DO: DATE FLOAL NEED 
          //   this.setState({ calories : text });
          // }}
          onChangeText = {this.newCarbohydrates}
        />

        <Text style={{ marginBottom: 10, width: "90%", fontSize: 20,color:"orange",alignItems: "center" }}>
        Fat
        </Text>
        <TextInput
          style={style.input}
          value={this.state.fat  + ""}
          placeholder={"Enter your food data"}
          
          onChangeText = {this.newFat}
        />
  
      


   <View style={style.button}>
       
 </View>
        <View style={style.button}>
          <Button
            color={"#f194ff"}
            title="Update this food"


            onPress={() => {
               let name = this.state.name;
              let calories = this.state.calories;
              let protein = this.state.protein;
              let carbohydrates = this.state.carbohydrates;
              let fat = this.state.fat;
              let token = this.props.navigation.state.params.token;
              const meal = this.props.navigation.state.params.meal;
              const food =this.props.navigation.state.params.food;
               fetch('https://mysqlcs639.cs.wisc.edu/meals/' + meal.id + '/foods/'+food.id, {
                method: "PUT",
                
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': this.props.navigation.state.params.token,
                  Connection: 'keep-alive',
                  'cache-control': 'no-cache',
                  
                },
                body: JSON.stringify({
                  name: name,
                  calories: calories,
                  protein: protein,
                  carbohydrates: carbohydrates,
                  fat: fat,
                })
              })
              
               .then(res => {
                  return res.json();
                })
               .then(res => {
                    alert(res.message);
                    this.props.navigation.state.params.componentDidMount();
                });
              navigate("MealShow");
            }}
          />
        </View>

        

          <View style={style.button}>
          <Button
            color={"red"}
            title="Delete this food"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              const meal = this.props.navigation.state.params.meal;
              const food =this.props.navigation.state.params.food;
             
           fetch('https://mysqlcs639.cs.wisc.edu/meals/' + meal.id + '/foods/'+food.id, {
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
              navigate("MealShow");// to do : delete 后不能自带删除
               
            }}
          />
        </View>
       

    </View>
      </View>
      </ScrollView>
    );
  }
}

export default FoodShow;
