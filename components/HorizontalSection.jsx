import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   View,
   Text,
   ImageBackground,
   TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ability from './Ability';
import AbilityIcon from './AbilityIcon';

const HorizontalSection = ({
   paused,
   backgroundImage,
   number,
   title,
   buttonText,
   onPress,
   abilities,
}) => {
   // Create states for buyback status and cooldown
   const [buybackStatus, setBuybackStatus] = useState(false);
   const [buybackCooldown, setBuybackCooldown] = useState(0);

   handleBuyback = () => {
      // If the buyback status is false, set it to true and start the cooldown
      if (!buybackStatus) {
         setBuybackStatus(true);
         setBuybackCooldown(480);
      }
   };

   useEffect(() => {
      // If the buyback status is true, start the cooldown
      let interval;
      if (buybackStatus && !paused) {
         interval = setInterval(() => {
            setBuybackCooldown((timer) => {
               if (timer === 0) {
                  setBuybackStatus(false);
                  clearInterval(interval);
               }
               return timer - 1;
            });
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [buybackStatus, paused]);

   const getTimerString = (timer) => {
      const minutes = Math.floor(timer / 60)
         .toString()
         .padStart(2, '0');
      const seconds = (timer % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
   };

   return (
      <View style={styles.container}>
         <ImageBackground source={backgroundImage} style={styles.image}>
            <LinearGradient
               colors={['rgba(45, 49, 63, 1)', '#1B203100']}
               tart={[1, 0]}
               end={[0, 0]}
               style={styles.gradient}
            />
            <View style={styles.content}>
               <Text style={styles.title}>{title}</Text>
               <View style={styles.bottomContent}>
                  <View style={styles.circle}>
                     <Text style={styles.number}>{number}</Text>
                  </View>
                  <View style={styles.buyback}>
                     <Text style={styles.buybackText}>Buyback</Text>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={handleBuyback}
                        onLongPress={() => setBuybackStatus(false)}
                     >
                        <Text style={styles.buttonText}>
                           {' '}
                           {buybackStatus
                              ? getTimerString(buybackCooldown)
                              : 'Ready'}{' '}
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Show the tracked abilities for this hero */}
            </View>
         </ImageBackground>
         <View style={styles.abilityContainer}>
            {abilities &&
               abilities.map((ability) => (
                  <AbilityIcon
                     paused={paused}
                     imageSource={ability.imageSource}
                     cooldowns={ability.cooldown}
                     active={ability.active}
                     level={ability.level}
                     ultimate={ability.ultimate}
                     key={ability.id}
                     maxLevel={ability.maxLevel}
                  />
               ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   abilityContainer: {
      flex: 1,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginRight: 10,

      // position: 'absolute',
      // right: 0,
      // bottom: 0,
   },
   container: {
      height: 75,
      // marginHorizontal: 20,
      // marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      flexDirection: 'row',
      backgroundColor: 'rgba(45, 49, 63, 1)',
      borderSize: 1,
      display: 'flex',
      borderColor: '#4A5055',
      borderRadius: 6,
      justifyContent: 'space-between',
      borderColor: '#4A5055',
      borderWidth: 1,
   },
   image: {
      // flex: 1,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100%',
      width: 150,
   },
   gradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 50,
   },
   content: {
      flex: 1,
      flexDirection: 'column',
      // alignItems: 'center',
      padding: 10,
      paddingTop: 0,
      alignItems: 'baseline',
   },
   bottomContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
   },
   circle: {
      width: 25,
      height: 25,
      borderRadius: 25,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
   },
   number: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
   },
   title: {
      fontSize: 14,
      // fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      fontFamily: 'radiance-semibold',
      // flex: 1,
   },
   button: {
      backgroundColor: '#292823',
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderColor: '#FFDD29',
      borderWidth: 1,
   },
   buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFDD29',
   },
   buyback: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
   },
   buybackText: {
      fontSize: 12,
      // fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      fontFamily: 'radiance-semibold',
   },
});

export default HorizontalSection;
