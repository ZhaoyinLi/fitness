import * as React from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

function AButton(props) {
  return (
    <Button
      style={{ width: '90%', marginBottom: 5 }}
      title={props.activity.name}
      mode="contained"
      color="orange"
      onPress={() => {
        props.listener();
      }}
    />
  );
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      goalDailyCalories: '',
      goalDailyActivity: '',
      username: '',
      activity: {},
      activities: [],
      currentActivity: {},
      showMealCal: '',
      showActivityCal: '',
      showMealCar: '',
      showMealPro: '',
      showMealFat: '',
      graph_data: [],
    };
  }
  static navigationOptions = {
    title: 'Landing',
  };

  async componentDidMount() {
    const username = this.props.navigation.state.params.username;
    const token = this.props.navigation.state.params.token;
    let response = await fetch(
      'https://mysqlcs639.cs.wisc.edu/users/' + username,
      {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'x-access-token': token,
          Connection: 'keep-alive',
          'cache-control': 'no-cache',
        },
      }
    );

    response = await response.json();
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
    let today = new Date();
    today =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let meals = await fetch('https://mysqlcs639.cs.wisc.edu'+ '/meals', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    meals = await meals.json();
    meals = meals.meals;
    let mealsT = [];
    for(var i = 0; i < meals.length; i++) {
      const m = meals[i];
      const mealDate = m.date.split('T')[0];
      if(today === mealDate)
        mealsT.push(m.id); 
    }
    let foodsT = {
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0,
    };
    for (let i = 0; i < mealsT.length; i++) {
      let mid = mealsT[i];
      let foods = await fetch('https://mysqlcs639.cs.wisc.edu'+ '/meals/' + mid + '/foods/', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'x-access-token': token,
          Connection: 'keep-alive',
          'cache-control': 'no-cache',
        },
      });
      foods = await foods.json();
      foods = foods.foods;
      for (let i = 0; i < foods.length; i++) {
        let f = foods[i];
        foodsT.calories += f.calories;
        foodsT.carbohydrates += f.carbohydrates;
        foodsT.protein += f.protein;
        foodsT.fat += f.fat;
      }
    }

    var graph_data = {};
    for (let i = 0; i < meals.length; i++) {
      var x = meals[i];
      var foods = await fetch('https://mysqlcs639.cs.wisc.edu' + '/meals/' + x.id + '/foods/', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'x-access-token': token,
          Connection: 'keep-alive',
          'cache-control': 'no-cache',
        },
      });
      foods = await foods.json();
      foods = foods.foods;
      var tempCals = 0;
      for (let j = 0; j < foods.length; j++) {
        var food = foods[j];
        var curCalories = parseFloat(food.calories);
        tempCals += curCalories;
      }
      graph_data[x.date] = tempCals;
    }
    graph_data = Object.values(graph_data);
    this.setState({
      firstName: response.firstName,
      lastName: response.lastName,
      goalDailyCalories: response.goalDailyCalories,
      goalDailyActivity: response.goalDailyActivity,
      username: response.username,
      activity: activities.activity,
      activities: activities.activities,
      showMealCal: foodsT.calories,
      showMealCar: foodsT.carbohydrates,
      showMealPro: foodsT.protein,
      showMealFat: foodsT.fat,
      graph_data: graph_data,
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goalStatus } = this.state;
    let btn = [];
    const activities = this.state.activities;

    activities.forEach(a => {
      btn.push(
        <AButton
          activity={a}
          listener={() => {
            const token = this.props.navigation.state.params.token;
            const { navigate } = this.props.navigation;
            navigate('Show', {
              componentDidMount: () => {
                this.componentDidMount();
              },
              token: token,
              activity: a,
            });
          }}
        />
      );
    });

    const style = StyleSheet.create({
      input: {
        borderWidth: 1,
        borderColor: 'orange',
        height: 40,
        width: '60%',
        marginBottom: 30,
        paddingLeft: 5,
        color: 'black',
      },

      textStyle: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 60,
        color: 'orange',
      },
    });

    return (
      <ScrollView>
        <View>
          <Button
            title="Check Activity Here"
            color="coral"
            onPress={() => {
              const { navigate } = this.props.navigation;
              const token = this.props.navigation.state.params.token;
              navigate('ActivityLand', {
                componentDidMount: () => {
                  this.componentDidMount();
                },
                token: token,
              });
            }}
          />
          <Button
            title="Check Meal Here"
            color="hotpink"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              navigate('MealLand', {
                componentDidMount: () => {
                  this.componentDidMount();
                },
                token: token,
              });
               this.componentDidMount();
            }}
          />

          <Button
            title="Check My 7-day Graph"
            color="blue"
            onPress={() => {
              let graph_data = this.state.graph_data;
              navigate('Page', {
                graph_data: graph_data,
              });
            }}
          />

          <Button
            title="Check Profile Here"
            color="black"
            onPress={() => {
              const token = this.props.navigation.state.params.token;
              const username = this.props.navigation.state.params.username;
              navigate('Profile', {
                componentDidMount: () => {
                  this.componentDidMount();
                },
                token: token,
                username: username,
              });
            }}
          />

          <Button
            title="Refresh"
            color="grey"
            onPress={() => {
              this.componentDidMount();
            }}
          />

          <View style={style.textStyle}>
            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Carlorie Goal
            </Text>
            <Text>{this.state.goalDailyCalories + ''}</Text>

            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>

            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Activity Goal
            </Text>
            <Text>{this.state.goalDailyActivity + ''}</Text>

            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>

            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Meal Calories
            </Text>
            <Text>{this.state.showMealCal + ''}</Text>

            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>
            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Meal Carbohydrates
            </Text>
            <Text>{this.state.showMealCar + ''}</Text>

            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>
            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Meal Protein
            </Text>
            <Text>{this.state.showMealPro + ''}</Text>

            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>
            <Text
              style={{
                width: '90%',
                fontSize: 15,
                color: 'orange',
                alignItems: 'center',
              }}>
              Meal Fat
            </Text>
            <Text>{this.state.showMealFat + ''}</Text>
            <Text
              style={{
                width: '90%',
                fontSize: 10,
                color: 'black',
                alignItems: 'center',
              }}>
              --------------------------------------------------------------
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Landing;
