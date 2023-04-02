import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoshanTimer = ({ isPaused }) => {
   const [isRoshanDead, setIsRoshanDead] = useState(false);
   const [isRoshanRespawning, setIsRoshanRespawning] = useState(false);
   const [respawnTimer, setRespawnTimer] = useState(480); // 8 minutes in seconds
   const [respawningTimer, setRespawningTimer] = useState(180);

   useEffect(() => {
      let intervalId;
      if (isRoshanDead && !isPaused) {
         intervalId = setInterval(() => {
            setRespawnTimer((timer) => {
               if (timer === 0) {
                  // setRespawningTimer(3); // 3 minutes in seconds
                  setRespawningTimer(180); // 3 minutes in seconds
                  setIsRoshanRespawning(true);
                  setIsRoshanDead(false);
                  clearInterval(intervalId);
               }
               return timer - 1;
            });
         }, 1000);
      }

      return () => clearInterval(intervalId);
   }, [isRoshanDead, isPaused]);

   useEffect(() => {
      let intervalId;
      if (isRoshanRespawning && !isPaused) {
         intervalId = setInterval(() => {
            setRespawningTimer((timer) => {
               if (timer === 0) {
                  setIsRoshanDead(false);
                  setIsRoshanRespawning(false);
                  setRespawnTimer(480);
                  // setRespawnTimer(8);

                  clearInterval(intervalId);
               }
               return timer - 1;
            });
         }, 1000);
      }

      return () => clearInterval(intervalId);
   }, [isRoshanRespawning, isPaused]);

   const handleRoshanClick = () => {
      if (!isRoshanDead && !isRoshanRespawning && !isPaused) {
         setIsRoshanDead(true);
      }
   };

   const getTimerString = (timer) => {
      const minutes = Math.floor(timer / 60)
         .toString()
         .padStart(2, '0');
      const seconds = (timer % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
   };

   const getTimerColor = () => {
      if (isRoshanDead) {
         return '#FF0000'; // red
      } else if (isRoshanRespawning) {
         return '#FFA500'; // orange
      } else {
         return '#FFFFFF'; // white
      }
   };

   return (
      <TouchableOpacity style={styles.container} onPress={handleRoshanClick}>
         <View style={[styles.timer, { borderColor: getTimerColor() }]}></View>
         <Text style={styles.timerText}>
            {isRoshanDead
               ? getTimerString(respawnTimer)
               : isRoshanRespawning
               ? getTimerString(respawningTimer)
               : 'Roshan'}
         </Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   timer: {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
   },
   timerText: {
      fontSize: 18,
      // fontWeight: 'bold',
      fontFamily: 'radiance-semibold',
      color: '#FFFFFF',
   },
});

export default RoshanTimer;
