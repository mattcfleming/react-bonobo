# [React Bonobo](https://react-bonobo.com)

> React Renderer to build UI interfaces using Canvas/WebGL

## API Usage

### Installation

#### using [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

```bash
# NPM
npm install react-bonobo

# Yarn
yarn add react-bonobo
```

#### React Bonobo's API usage example

```jsx
import React, { Component } from 'react';
import { Text, View } from 'react-bonobo';

class ReactBonoboComponent extends Component {
  render() {
    return (
      <View>
        <Text>
          Render this text on Canvas
        </Text>
        <Text>
          You just use React Bonobo components like 'View' and 'Text',
          just like React Native.
        </Text>
      </View>
    );
  }
}
```

