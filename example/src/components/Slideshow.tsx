import React, { Component, useState, useEffect, RefObject } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ListView,
} from 'react-bonobo';

const { width }: { width: any } = Dimensions.get('window');

const styles = StyleSheet.create({
  slideshow: {
    position: 'absolute',
    left: 380,
    top: 20,
    backgroundColor: 'blue',
    width: 1000,
    height: 720,
    overflow: 'hidden',
  },
  txt: {
    fontSize: 42,
    color: 'white',
  },
});

// These images are under creative commons CC0
const slides = [
  'https://images.unsplash.com/photo-1670705881039-2645d2bb1603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
  'https://images.unsplash.com/photo-1670705881039-2645d2bb1603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
];

const delay = 2500;

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef: RefObject<NodeJS.Timeout> = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef?.current) {
      clearTimeout(timeoutRef?.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  return (
    <View style={{ ...styles.slideshow }}>
      {/* <View>
        <Image style={{ width: 100, height: 100 }} src={slides[currentSlide]} />
      </View> */}
      <Text style={{ ...styles.txt }}>Slideshow</Text>
      <Text>More Text</Text>
      <ListView
        style={{ position: 'absolute', top: 200, width: 1000, height: 220 }}
        data={slides}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}

/*
  <View style={styles.slideshowDots}>
    {slides.map((_, index) => (
      <View 
        style={index === idx ? styles.slideshowDotActive : styles.slideshowDot }
      />
    ))}
  </View>
*/

export default Slideshow;
