import 'react-native-gesture-handler'

import CustomDrawerContent from '@/components/drawerItems/CustomDrawerContent'
import { useAuthContext } from '@/contexts/AuthContext'
import CategoryItemsScreen from '@/screens/CategoryScreen/CategoryItemsScreen'
import CategoryScreen from '@/screens/CategoryScreen/CategoryScreen'
import FriendsScreen from '@/screens/FriendsScreen/FriendsScreen'
import LoginScreen from '@/screens/LoginScreen/LoginScreen'
import SettingsScreen from '@/screens/SettingsScreen/SettingsScreen'
import { RootDrawerParamList } from '@/types/navigation.types'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator<RootDrawerParamList>()

const RootLayout = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName={isLoggedIn ? 'Category' : 'Login'}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerType: 'slide',
        unmountOnBlur: true
      }}
      backBehavior="history"
    >
      <Drawer.Screen name="Category" component={CategoryScreen} />

      <Drawer.Screen
        name="CategoryItem"
        component={CategoryItemsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />

      <Drawer.Screen name="Friends" component={FriendsScreen} />

      <Drawer.Screen name="Profile" component={SettingsScreen} />

      <Drawer.Screen name="Login" component={LoginScreen} options={{}} />
    </Drawer.Navigator>
  )
}

export default RootLayout
