import React from "react";
import { View, Text } from "react-bonobo";

// Look at public/index.html!

class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#44bb44"
        }}
      >
        <View>
          <Text color="#ffffff">Hello World</Text>
        </View>
      </View>
    );
  }
}

export default App;
