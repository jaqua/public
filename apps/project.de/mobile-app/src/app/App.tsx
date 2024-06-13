import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'

import { AuthProvider } from '@/contexts/AuthContext'
import { useCustomFont } from '@/hooks/useCustomFont'
import RootLayout from '@/layouts/RootLayout'
import { client } from '@@/libs/apollo/client'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useCustomFont()

  // useLayoutEffect(() => {
  //   onLayoutRootView();
  // }, [onLayoutRootView])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#111B2F'}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      <NavigationContainer
        onReady={() => {
          onLayoutRootView()
        }}
      >
        <ApolloProvider client={client}>
          <AuthProvider>
            <RootLayout />
          </AuthProvider>
        </ApolloProvider>
      </NavigationContainer>
    </>
  )
}
