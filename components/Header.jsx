import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoshanTimer from './RoshanTimer';

const Header = () => {
   const [leftTime, setLeftTime] = useState(0);
   const [rightTime, setRightTime] = useState(0);
   const [mainTime, setMainTime] = useState(0);

   useEffect(() => {
      let timer = setInterval(() => {
         setLeftTime(leftTime + 1);
      }, 1000);
      return () => clearInterval(timer);
   }, [leftTime]);

   useEffect(() => {
      let timer = setInterval(() => {
         setRightTime(rightTime + 1);
      }, 1000);
      return () => clearInterval(timer);
   }, [rightTime]);

   useEffect(() => {
      let timer = setInterval(() => {
         setMainTime(mainTime + 1);
      }, 1000);
      return () => clearInterval(timer);
   }, [mainTime]);

   const renderTimer = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return (
         <Text style={styles.timerText}>
            {`${minutes < 10 ? '0' + minutes : minutes}:${
               seconds < 10 ? '0' + seconds : seconds
            }`}
         </Text>
      );
   };

   return (
      <View style={styles.container}>
         <View style={[styles.section, styles.sideSection]}>
            <RoshanTimer />
         </View>
         <View style={[styles.section, styles.middleSection]}>
            <Ionicons name="stopwatch-outline" size={32} color="white" />
            {renderTimer(mainTime)}
         </View>
         <View style={[styles.section, styles.sideSection]}>
            <Ionicons name="timer-outline" size={24} color="white" />
            {renderTimer(rightTime)}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      height: 100,
      gap: 10,
      marginTop: 20,
      fontFamily: 'Hypatia-Sans-Pro',

      // alignItems: 'center',
   },
   section: {
      flex: 1,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ' rgba(45, 49, 63, 0.51)',
      borderWidth: 1,
      borderColor: '#4A5055',
   },
   sideSection: {
      // backgroundColor: 'red',
      // flexDirection: 'row',
      alignItems: 'center',
   },
   middleSection: {
      // backgroundColor: 'blue',
      flex: 2,
      height: '100%',
      alignSelf: 'flex-end',
   },
   rightSection: {
      backgroundColor: 'green',
   },
   timerText: {
      color: 'white',
      fontSize: 16,
      // fontWeight: 'bold',
      // marginLeft: 10,
      fontFamily: 'radiance-semibold',
   },
});

export default Header;
