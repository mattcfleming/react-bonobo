// import * as React from 'react';

// import { StyleSheet, View, Text } from 'react-native';
// import { multiply } from 'react-bonobo';

// export default function App() {
//   const [result, setResult] = React.useState<number | undefined>();

//   React.useEffect(() => {
//     multiply(3, 7).then(setResult);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Result: {result}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
// });

import React, { Component, useState, useEffect } from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withNavigation,
} from '../../src';

// import Sidebar from './Sidebar';
// import Grid from './Grid';
// import Clock from './Clock';
import Slideshow from './components/Slideshow';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: width,
    height: height,
    position: 'absolute',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };

    // In case you want to update the App with new dimensions value:
    // Dimensions.addEventListener((dimensionsValue, target) => {
    //   console.log(dimensionsValue, target);
    // });
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return null;
    }

    return (
      <View style={styles.surface}>
        <Slideshow />
      </View>
    );
  }
}

const NavigationApp = withNavigation(App);

render(<NavigationApp />, document.getElementById('root'), () =>
  console.log('App mounted')
);

export default App;
