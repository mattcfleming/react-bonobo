import React from 'react';
import {
  render,
  Text,
  ListView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  withNavigation,
} from 'react-bonobo';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  surface: {
    position: 'absolute',
    backgroundColor: '#202020',
    width: width,
    height: height,
  },
  text: {
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 29,
  },
  containerTime: {
    backgroundColor: '#202020',
    position: 'absolute',
    top: 50,
    left: 300,
  },
  logo: {
    top: 10,
    left: 30,
  },
  list: {
    top: 100,
    left: 0,
    backgroundColor: '#303030',
    width: width,
    height: 400,
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.posters = [
      { name: 'Narcos', src: '../src/assets/narcos.jpeg' },
      { name: 'Daredevil', src: '../src/assets/daredevil.jpeg' },
      { name: 'Stranger Things', src: '../src/assets/stranger-things.jpg' },
      // { name: 'Narcos', src: 'narcos.jpg' },
      // { name: 'Daredevil', src: '../src/narcos.png' },
      // { name: 'Stranger Things', src: 'stranger-things.jpg' },
      // { name: 'Narcos', src: 'narcos.jpg' },
      // { name: 'Daredevil', src: 'daredevil.jpg' },
      // { name: 'Stranger Things', src: 'stranger-things.jpg' },
    ];
    this.state = {
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.setState({ time });
    }, 100);
  }

  renderPostersList() {
    const renderRow = (data, idx) => (
      <View height={200} width={200} key={'poster-list-' + idx}>
        <Image
          style={{ x: 220 * idx + 30, y: 140, width: 200, height: 300 }}
          src={data.src}
        />
      </View>
    );

    return (
      <ListView
        dataSource={this.posters}
        renderRow={renderRow}
        style={styles.list}
      />
    );
  }

  render() {
    return (
      <View style={styles.surface}>
        <Image
          src={'netflix.png'}
          style={styles.logo}
          width={210}
          height={100}
        />
        <Text style={styles.text}>React Ape Originals</Text>
        <View style={styles.containerTime}>
          <Text style={styles.text}>{this.state.time}</Text>
        </View>
        {this.renderPostersList()}
      </View>
    );
  }
}

const NavigationApp = withNavigation(App);

render(<NavigationApp />, document.getElementById('root'), () =>
  console.log('App mounted')
);

export default App;
