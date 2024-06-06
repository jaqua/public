// import { StatusBar, View, Text, } from 'react-native'
// import 'react-native-gesture-handler'

// import { AuthProvider } from '@/contexts/AuthContext'
// import { useCustomFont } from '@/hooks/useCustomFont'
// import RootLayout from '@/layouts/RootLayout'
// import { NavigationContainer } from '@react-navigation/native'

// export default function App(){
//   const { fontsLoaded, onLayoutRootView } = useCustomFont()

//   // useLayoutEffect(() => {
//   //   onLayoutRootView();
//   // }, [onLayoutRootView])

//   if (!fontsLoaded) {
//     return null
//   }

//   return (
//     <>

//       <StatusBar
//         animated={true}
//         backgroundColor={'#111B2F'}
//         barStyle="light-content"
//         networkActivityIndicatorVisible={true}
//       />
      
//       <NavigationContainer
//         onReady={() => {
//           onLayoutRootView()
//         }}
//       >
//         <AuthProvider> 
//          <RootLayout /> 
//          </AuthProvider> 
//        </NavigationContainer> 
//     </>
//   )
// }

// ./src/app/App.tsx

import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import CalculationScreen from './screens/CalculationScreen/CalculationScreen';
const App: React.FC = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#111B2F'}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      
      <CalculationScreen />
    </>
  );
}

export default App;
