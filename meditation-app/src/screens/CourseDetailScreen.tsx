import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CourseDetailScreen = ({ route }) => {
  const { course } = route.params;

  const renderSession = ({ item }) => (
    <View style={styles.sessionItem}>
      <Text style={styles.sessionTitle}>{item.title}</Text>
      <Text style={styles.sessionDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseDescription}>{course.description}</Text>
      <FlatList
        data={course.sessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4ED',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  sessionItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default CourseDetailScreen;
