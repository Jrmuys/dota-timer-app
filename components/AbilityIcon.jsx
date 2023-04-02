import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AbilityIcon = ({
   imageSource,
   cooldowns,
   isActive,
   level,
   maxLevel,
   ultimate,
}) => {
   // console.log('COOLDOWNS', cooldowns);
   const [cooldownRemaining, setCooldownRemaining] = useState(
      cooldowns ? cooldowns[level - 1] : 0
   );
   const [isOnCooldown, setIsOnCooldown] = useState(false);

   if (cooldowns) {
      useEffect(() => {
         let cooldownInterval = null;
         if (isOnCooldown) {
            cooldownInterval = setInterval(() => {
               setCooldownRemaining((prevRemaining) => prevRemaining - 1);
            }, 1000);
         } else {
            clearInterval(cooldownInterval);
            setCooldownRemaining(cooldowns[level - 1]);
         }
         if (cooldownRemaining <= 0) {
            setIsOnCooldown(false);
         }
         return () => clearInterval(cooldownInterval);
      }, [isOnCooldown, cooldownRemaining]);
   }
   const handlePress = () => {
      if (!isOnCooldown) {
         console.log('pressed', cooldowns[level - 1], cooldownRemaining);
         setIsOnCooldown(true);
      }
   };

   const iconBorderColor =
      cooldowns && !(level === 0) ? (isOnCooldown ? '#000' : '#888') : '#000';

   const overlayWidth = isOnCooldown
      ? `${(cooldownRemaining / cooldowns[level - 1]) * 100}%`
      : '0%';
   const text = isOnCooldown ? cooldownRemaining.toString() : '';
   return (
      <View>
         <TouchableOpacity
            disabled={!cooldowns || level === 0}
            style={[styles.iconContainer, { borderColor: iconBorderColor }]}
            onPress={handlePress}
         >
            <Image source={imageSource} style={styles.icon} />
            <View style={[styles.overlay, { width: overlayWidth }]} />
            {(isOnCooldown || level === 0) && (
               <View style={styles.saturationOverlay} />
            )}
            {isOnCooldown && (
               <View style={styles.textContainer}>
                  <Text style={styles.text}>{text}</Text>
               </View>
            )}
         </TouchableOpacity>
         {/* Display the level of the ability, there should be four gray rectangles for non ultimates, and three for ultimates. The number of rectangles that are gold corresponds to the level of the ability  */}
         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
               marginTop: 6,
            }}
         >
            {Array.from({ length: maxLevel }, (_, i) => i + 1).map((num) => (
               <View
                  key={num}
                  style={{
                     width: 5,
                     height: 2,
                     borderRadius: 0,
                     backgroundColor: num <= level ? '#FFD700' : '#000',
                     marginRight: 2,
                  }}
               />
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   iconContainer: {
      position: 'relative',
      width: 40,
      height: 40,
      // borderColor: '#fff',
      borderWidth: 1,
   },
   icon: {
      width: '100%',
      height: '100%',
   },
   overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   textContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontFamily: 'radiance-semibold',
      color: '#fff',
      fontSize: 18,
      // fontWeight: 'bold',
   },
   saturationOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
   },
});

export default AbilityIcon;
