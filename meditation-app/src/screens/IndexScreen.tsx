import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

// Sample data for the carousel
const carouselData = [
  { id: '1', image: require('../../assets/images/course1.jpg'), title: 'Meditate' },
  { id: '2', image: require('../../assets/images/course2.jpg'), title: 'Relax' },
  { id: '3', image: require('../../assets/images/course3.jpg'), title: 'Focus' },
  { id: '4', image: require('../../assets/images/course4.jpg'), title: 'Breathe' },
];

const IndexScreen = () => {
  const carouselRef = useRef(null);
  const [fontsLoaded] = useFonts({ Poppins_600SemiBold });
  if (!fontsLoaded) return null;

  // Render each carousel item
  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => alert(`Clicked on ${item.title}`)}
    >
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={[styles.appName, { marginTop: 30 }]}>Welcome to Serenity</Text>

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width * 0.7}
        inactiveSlideScale={0.95} // Shrinks inactive slides slightly
        inactiveSlideOpacity={0.7} // Fades inactive slides
        loop={true} // Enables infinite looping
        autoplay={true} // Carousel autoplay
        autoplayInterval={3000} // 3 seconds per slide
        containerCustomStyle={styles.carouselContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4ED',
    paddingTop: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4A6572',
  },
  carouselContainer: {
    marginTop: 20,
  },
  carouselItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  carouselImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  carouselText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: '#4A6572',
  },
});

export default IndexScreen;
