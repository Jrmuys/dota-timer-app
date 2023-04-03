import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const { Value, timing } = Animated;

const Timer = ({
   countUp = false,
   initialTime = 0,
   pause = false,
   onTimeChange = () => {},
   onTimerEnd = () => {},
   reset = false,
   clear = false,
   textSize = 24,
   textColor = 'black',
}) => {
   const [time, setTime] = useState(initialTime);
   const [referenceTime, setReferenceTime] = useState(Date.now());
   const [timerId, setTimerId] = useState(null);

   const countdownUntilZero = () => {
      setTime((prevTime) => {
         if (prevTime <= 0) {
            onTimerEnd();
            clearInterval(timerId);
            return 0;
         }

         const now = Date.now();
         const interval = now - referenceTime;
         setReferenceTime(now);
         const newTime = countUp ? prevTime + interval : prevTime - interval;
         onTimeChange(newTime);
         return newTime;
      });
   };

   useEffect(() => {
      if (reset) {
         setTime(initialTime);
      }
   }, [reset, initialTime]);

   useEffect(() => {
      if (clear) {
         setTime(0);
         clearInterval(timerId);
      }
   }, [clear]);

   useEffect(() => {
      if (pause) {
         clearInterval(timerId);
      } else {
         setTimerId(setInterval(countdownUntilZero, 1000));
      }
   }, [pause]);

   return (
      <View style={styles.container}>
         {/* <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
               cx="50"
               cy="50"
               r="45"
               stroke="black"
               strokeWidth="2.5"
               fill="transparent"
            />
            <AnimatedCircle
               cx="50"
               cy="50"
               r="45"
               stroke="red"
               strokeWidth="5"
               fill="transparent"
               strokeDasharray="285"
               strokeDashoffset={timing(time * 0.285, {
                  duration: 1000,
                  easing: Easing.linear,
               })}
            />
         </Svg> */}
         <Text style={[styles.text, { fontSize: textSize, color: textColor }]}>
            {new Date(time).toISOString().substr(14, 5)}
         </Text>
      </View>
   );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   text: {
      marginTop: 10,
   },
});

export default Timer;
