import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailScreen = ({ route }) => {
  const { meditation } = route.params; // Get meditation data
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load audio
  const loadAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(meditation.audio, { shouldPlay: false });
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis || 0);
        setDuration(status.durationMillis || 0);
        setIsPlaying(status.isPlaying);
      }
    });
  };

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) await sound.pauseAsync();
    else await sound.playAsync();
  };

  const seekAudio = async (value) => {
    if (sound) await sound.setPositionAsync(value);
  };

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      {/* Artwork */}
      <Image source={meditation.image} style={styles.artwork} />

      {/* Title and Subtitle */}
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.subtitle}>Joseph Goldstein</Text>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#FFF"
        maximumTrackTintColor="#888"
        thumbTintColor="#FFF"
        onSlidingComplete={seekAudio}
      />

      {/* Time Labels */}
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => seekAudio(position - 15000)}>
          <Icon name="replay" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
          <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={50} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seekAudio(position + 15000)}>
          <Icon name="fast-forward" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  time: {
    fontSize: 14,
    color: '#FFF',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 30,
  },
});

export default DetailScreen;
