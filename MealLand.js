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

function ActivityButton(props) {
  return (
    <Button
      style={{ width: '90%', marginBottom: 5 }}
      title={props.meal.name}
      mode="contained"
      color="orange"
      onPress={() => {
        props.listener();
      }}
    />
  );
}

class MealLand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
    };
  }
  static navigationOptions = {
    title: 'Landing',
  };

  async componentDidMount() {
    const username = this.props.navigation.state.params.username;
    const token = this.props.navigation.state.params.token;
    let meals = await fetch('https://mysqlcs639.cs.wisc.edu/meals', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'x-access-token': token,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    });
    meals = await meals.json();

    this.setState({
      meals: meals.meals,
    });
  }

  render() {
    const { navigate } = this.props.navigation.navigate;
    const { goalStatus } = this.state;
    let btn = [];
    const meals = this.state.meals;

    meals.forEach(a => {
      btn.push(
        <ActivityButton
          meal={a}
          listener={() => {
            const token = this.props.navigation.state.params.token;
            const { navigate } = this.props.navigation;
            navigate('MealShow', {
              componentDidMount: () => {
                this.componentDidMount();
              },
              token: token,
              meal: a,
            });
          }}
        />
      );
    });

    return (
      <ScrollView>
        <View>
          <Button
            title="Add Meal Here"
            color="hotpink"
            onPress={() => {
              const { navigate } = this.props.navigation;
              const token = this.props.navigation.state.params.token;
              navigate('Meal', {
                componentDidMount: () => {
                  this.componentDidMount();
                },
                token: token,
              });
            }}
          />
          <Text
            style={{
              width: '90%',
              fontSize: 20,
              color: 'orange',
              alignItems: 'center',
            }}>
            Added Meals
          </Text>
          {btn}
        </View>
      </ScrollView>
    );
  }
}

export default MealLand;
