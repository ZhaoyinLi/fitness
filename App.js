import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Profile from './Profile.js';
import Activity from './Activity.js';
import Meal from './Meal.js';
import Landing from './Landing.js';
import Show from './Show.js';
import MealLand from './MealLand.js';
import MealShow from './MealShow.js';
import ActivityLand from './ActivityLand.js';
import Food from './Food.js';
import FoodShow from './FoodShow.js';
import Page from './Page.js';
// or any pure javascript modules available in npm

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Profile: { screen: Profile },
  Activity: { screen: Activity },
  Meal: { screen: Meal },
  Landing: { screen: Landing },
  Show: { screen: Show },
  MealLand: { screen: MealLand },
  MealShow: { screen: MealShow },
  ActivityLand: { screen: ActivityLand },
  Food: { screen: Food },
  FoodShow: { screen: FoodShow },
  Page: { screen: Page },
});

const App = createAppContainer(MainNavigator);

export default App;
