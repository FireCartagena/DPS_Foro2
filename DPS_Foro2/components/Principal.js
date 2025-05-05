import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Animated
} from 'react-native';

const images = [
  { uri: 'https://img.freepik.com/fotos-premium/telefonos-moviles-tienda-generative-ai_220873-21825.jpg', title: 'Electronicos' },
  { uri: 'https://st3.depositphotos.com/3591429/18305/i/450/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg', title: 'Deporte' },
  { uri: 'https://www.salgar.net/cdnassets/monterrey-600-africa_l.jpg', title: 'Hogar' },
  { uri: 'https://st4.depositphotos.com/5354238/20734/i/450/depositphotos_207344950-stock-photo-women-clothing-hangers-boutique-store.jpg', title: 'Ropa' },
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Principal = () => {
  const [imgActive, setImgActive] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserScrolling) {
        if (imgActive < images.length) {
          scrollViewRef.current.scrollTo({
            animated: true,
            x: WIDTH * (imgActive + 1),
          });
          setImgActive(imgActive + 1);
        } else {
          scrollViewRef.current.scrollTo({
            animated: false,
            x: 0,
          });
          setImgActive(0);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [imgActive, isUserScrolling]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          style={styles.scrollView}
          onTouchStart={() => setIsUserScrolling(true)}
          onTouchEnd={() => setIsUserScrolling(false)}
          onTouchCancel={() => setIsUserScrolling(false)}
          onMomentumScrollEnd={() => setIsUserScrolling(false)}
        >
          {images.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image
                key={index}
                resizeMode='stretch'
                style={styles.image}
                source={{ uri: item.uri }}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        
          <View style={styles.slide}>
            <Image
              key={images.length}
              resizeMode='stretch'
              style={styles.image}
              source={{ uri: images[0].uri }}
            />
            <Text style={styles.title}>{images[0].title}</Text>
          </View>
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={index}
              style={[
                index === imgActive ? styles.dotActive : styles.dot,
                { marginRight: 5 },
              ]}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    marginTop: HEIGHT * 0.1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  slide: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    alignItems: 'center',
  },
  image: {
    width: WIDTH,
    height: '80%',
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    right: 10, 
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black', 
  },
  dot: {
    margin: 3,
    color: 'blue', 
  },
});

export default Principal;

