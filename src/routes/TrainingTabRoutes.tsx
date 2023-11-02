import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TrainingScreen } from '../screens/Training';



const Tab = createBottomTabNavigator();

export const TrainingTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.red500, 
        tabBarLabelStyle: {
          color: Theme.colors.white,
          fontSize: 14
        },
        tabBarStyle: {
          backgroundColor: Theme.colors.gray500,
          paddingVertical: 8,
          height: 60,
          borderColor: Theme.colors.red500
        },
      }}
        
      initialRouteName='Training'
    >
      <Tab.Screen name='Training' component={TrainingScreen} options={{
        tabBarIcon: (props) => {
          return (
            <MaterialCommunityIcons name="dumbbell" {...props}/>
          );
        }
      }}/>
      <Tab.Screen name='Exercises' component={Home}  options={{
        tabBarIcon: (props) => {
          return (
            <MaterialCommunityIcons name="bike" {...props}/>
          );
        }
      }}/>
    </Tab.Navigator>
  );
};
