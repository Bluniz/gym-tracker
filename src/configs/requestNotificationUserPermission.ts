import notifee, {AuthorizationStatus} from '@notifee/react-native';
import reactotron from 'reactotron-react-native';

export async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    reactotron.log('Permission settings:', settings);
  } else {
    reactotron.log('User declined permissions');
  }
}
