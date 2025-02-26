import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Sample data for the single sessions carousel
const singleSessionsData = [
  {
    id: '1',
    image: require('../../assets/images/course1.jpg'),
    title: 'Meditate',
    description: 'Start your day with a calming meditation.',
    audio: require('../../assets/audio/meditate.mp3'),
  },
  {
    id: '2',
    image: require('../../assets/images/course2.jpg'),
    title: 'Relax',
    description: 'Unwind and relax after a long day.',
    audio: require('../../assets/audio/meditate.mp3'),
  },
];

// Sample data for the courses carousel
const coursesData = [
  {
    id: '1',
    title: 'Mindful Living',
    description: 'A 7-day journey into mindfulness.',
    image: require('../../assets/images/course1.jpg'),
    sessions: [
      { id: '1', title: 'Day 1: Breathing Basics', description: 'Start with mindful breathing.', audio: require('../../assets/audio/meditate.mp3') },
      { id: '2', title: 'Day 2: Body Awareness', description: 'Connect with your body.', audio: require('../../assets/audio/meditate.mp3') },
    ],
  },
  {
    id: '2',
    title: 'Stress Relief',
    description: 'A 5-day course to reduce stress.',
    image: require('../../assets/images/course2.jpg'),
    sessions: [
      { id: '1', title: 'Day 1: Relaxation Techniques', description: 'Learn to relax deeply.', audio: require('../../assets/audio/meditate.mp3') },
      { id: '2', title: 'Day 2: Letting Go', description: 'Let go of stress and tension.', audio: require('../../assets/audio/meditate.mp3') },
    ],
  },
];

const IndexScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
  if (!fontsLoaded) return null;

  const renderSingleSessionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate('Detail', { meditation: item })} // Navigate to session detail
    >
      <Image source={item.image} style={styles.carouselImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradientOverlay}
      >
        <Text style={styles.carouselText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate('CourseDetail', { course: item })} // Navigate to course detail
    >
      <Image source={item.image} style={styles.carouselImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradientOverlay}
      >
        <Text style={styles.carouselText}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* App Header */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>SERENITY</Text>

      {/* Single Sessions Carousel */}
      <Text style={styles.sectionSubtitle}>Single Sessions</Text>
      <Carousel
        data={singleSessionsData}
        renderItem={renderSingleSessionItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />

      {/* Courses Carousel */}
      <Text style={styles.sectionSubtitle}>Courses</Text>
      <Carousel
        data={coursesData}
        renderItem={renderCourseItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: '#4A6572',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: '#4A6572',
    marginVertical: 15,
  },
  carouselItem: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'flex-end',
  },
  carouselText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFF',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#DDD',
    lineHeight: 18,
  },
});

export default IndexScreen;
