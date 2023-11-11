import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useAuth} from '../../contexts/auth';
import {currentTheme} from '../../styles/theme';

export function CustomDrawer(props) {
  const {signOut} = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      style={{height: '100%', backgroundColor: currentTheme.colors.background}}
      contentContainerStyle={{justifyContent: 'space-between', height: '100%'}}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Sair"
        onPress={() => signOut?.()}
        labelStyle={{
          textAlign: 'center',
          color: currentTheme.colors.text,
        }}
      />
    </DrawerContentScrollView>
  );
}
