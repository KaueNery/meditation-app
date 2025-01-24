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
          backgroundColor: '#FFFFFF', // Semi-transparent footer
          height: 70, // Increased height for better spacing
          paddingBottom: 10, // Space for labels
        },
        tabBarItemStyle: {
          marginVertical: 5, // Align icons and labels
        },
        tabBarActiveTintColor: '#000000', // Golden active color
        tabBarInactiveTintColor: '#A0A0A0', // White inactive color
        tabBarLabelStyle: {
          fontSize: 12, // Label font size
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'explore';
          else if (route.name === 'Library') iconName = 'library-books';
          else if (route.name === 'More') iconName = 'more-horiz';

          // Return the icon with custom size and color
          return <Icon name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        headerShown: false, // Hide header for all tabs
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // No footer on Login screen
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }} // Footer for all TabNavigator screens
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
