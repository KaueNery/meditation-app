import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import IndexScreen from '../screens/IndexScreen'; // Meditation Home
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MoreScreen from '../screens/MoreScreen';
import DetailScreen from '../screens/DetailScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen'; // Meditation Details Screen

// Stack and Tab Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Screens with Footer
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          marginVertical: 5,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'explore';
          else if (route.name === 'Library') iconName = 'library-books';
          else if (route.name === 'More') iconName = 'more-horiz';

          return <Icon name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={IndexScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Tab Navigator */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* Detail Screen */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true, // Show header for detail screen
            title: 'Meditation Details', // Title for the detail screen
          }}
        />

        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{ title: 'Course Details' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
