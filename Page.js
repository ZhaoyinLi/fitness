import React from 'react';
import { View, Text } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      graph_data: [50, 10, 40, 95, 4, 24, 8],
    };
  }
  async componentDidMount() {
    this.setState({ graph_data: this.props.navigation.state.params.graph_data });
  }

  static navigationOptions = {
    title: 'My 7-day Graph',
  };

  render() {
    const fill = 'purple';
    const graph_data = this.state.graph_data;
    return (
      <View>
        <View>
          <AreaChart
            style={{ height: 200 }}
            data={graph_data}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}>
            <Grid />
          </AreaChart>
        </View>
      </View>
    );
  }
}

export default Page;
