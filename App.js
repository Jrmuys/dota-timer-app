import { StatusBar } from 'expo-status-bar';
import {
   StyleSheet,
   Text,
   View,
   Button,
   Image,
   SafeAreaView,
   ImageBackground,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Header from './components/Header';
import Body from './components/Body';

export default function App() {
   const [fontsLoaded] = useFonts({
      'Hypatia-Pro': require('./assets/fonts/Hypatia.ttf'),
      'Hypatia-Bold': require('./assets/fonts/Hypatia-Bold.ttf'),
      'Hypatia-Semibold': require('./assets/fonts/Hypatia-Semibold.ttf'),
      radiance: require('./assets/fonts/radiance.ttf'),
      'radiance-semibold': require('./assets/fonts/radiance-semibold.ttf'),
      'Reaver-Bold:': require('./assets/fonts/Reaver-Bold.ttf'),
      'Reaver-SemiBold': require('./assets/fonts/Reaver-SemiBold.ttf'),
   });

   const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
         await SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   const image = './assets/minimap.jpg';

   return (
      <SafeAreaView onLayout={onLayoutRootView}>
         {/* <Image source={image} /> */}
         <ImageBackground
            style={styles.image}
            blurRadius={8}
            source={require('./assets/images/minimap.jpg')}
            resizeMode="cover"
         >
            <View style={styles.overlay}>
               <View style={[styles.container, styles.main]}>
                  <Header></Header>
                  <Body></Body>
               </View>
            </View>
         </ImageBackground>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   overlay: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      height: '100%',
      width: '100%',
   },
   container: {
      flex: 1,
      // justifyContent: 'center',
      marginHorizontal: 16,
      marginTop: 20,
   },
   title: {
      fontFamily: 'Hypatia-Pro',
      textAlign: 'center',
      // marginVertical: 8,
      fontSize: 32,
   },
   main: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
   },
   fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
   },
   button: {
      margin: 10,
   },
   tinyLogo: {
      width: 50,
      height: 50,
   },
   logo: {
      width: 66,
      height: 58,
   },
   image: {
      width: '100%',
      height: '100%',
   },
});
