import React, { useState, useEffect } from 'react';
import {
   TouchableHighlight,
   StyleSheet,
   Text,
   View,
   ImageBackground,
} from 'react-native';
import {} from 'react-native-web';

const Ability = ({ imageSource, cooldown, active }) => {
   const [cooldownTime, setCooldownTime] = useState(cooldown);
   const [cooldownStarted, setCooldownStarted] = useState(false);

   useEffect(() => {
      if (cooldownStarted && cooldownTime > 0) {
         const interval = setInterval(() => {
            setCooldownTime(cooldownTime - 1);
         }, 1000);
         return () => clearInterval(interval);
      } else {
         setCooldownStarted(false);
         setCooldownTime(cooldown);
      }
   }, [cooldownStarted, cooldownTime]);

   const handlePress = () => {
      if (!cooldownStarted) {
         setCooldownStarted(true);
         setCooldownTime(cooldown);
      }
   };

   const overlayOpacity = cooldownStarted ? 0.8 : 0;

   const imageStyle = cooldownStarted
      ? { ...styles.image, ...styles.desaturate }
      : styles.image;

   return (
      <View style={styles.container}>
         {/* <Text style={styles.title}>{active ? 'Active' : 'Inactive'}</Text>
         <Text style={styles.subtitle}>{`Cooldown: ${cooldown}s`}</Text>
         <Text style={styles.instructions}>
            {`Press the icon to activate the ability`}
         </Text> */}
         <TouchableHighlight style={styles.iconButton} onPress={handlePress}>
            <ImageBackground source={imageSource} style={styles.icon}>
               {cooldownStarted && (
                  <View style={styles.cooldownOverlay}>
                     <Text style={styles.cooldownText}>{cooldownTime}</Text>
                  </View>
               )}
               {/* You can add an icon or other content here if needed */}
            </ImageBackground>
         </TouchableHighlight>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
   },
   image: {
      width: 30,
      height: 30,
   },
   desaturate: {
      tintColor: 'gray',
   },
   cooldownOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      width: 50,
      height: 50,
   },
   cooldownText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
   },
   title: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
   },
   subtitle: {
      marginTop: 10,
      fontSize: 16,
      color: '#666',
   },
   instructions: {
      marginTop: 20,
      fontSize: 16,
      color: '#666',
   },
   iconButton: {
      marginTop: 20,
      // borderRadius: 50,
      overflow: 'hidden',
   },
   icon: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default Ability;
