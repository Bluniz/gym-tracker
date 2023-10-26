import { createDrawerNavigator } from '@react-navigation/drawer';
import {TrainingTabRoutes} from './TrainingTabRoutes';

const Drawer = createDrawerNavigator();


export const DrawerRoutes = () => {
  return <Drawer.Navigator   screenOptions={{
    // headerShown: false
  }}>
    <Drawer.Screen name="Treino" component={TrainingTabRoutes}/>
  </Drawer.Navigator>;
};
