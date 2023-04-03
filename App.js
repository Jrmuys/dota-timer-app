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
import Dialog from 'react-native-dialog';
import HeroSelector from './components/HeroSelector';
import { heroImages } from './assets/heroIndex';
import { useEffect } from 'react';

export default function App() {
   const [newGame, setNewGame] = useState(true);
   const [matchId, setMatchId] = useState('');
   const [visible, setVisible] = useState(true);
   const [manualMode, setManualMode] = useState(false);
   const [manualTeams, setManualTeams] = useState({
      allyTeam: [],
      enemyTeam: [],
   });
   const [radiant, setRadiant] = useState(true);
   const [paused, setPaused] = useState(true);

   const [heroList, setHeroList] = useState([]);

   const [fontsLoaded] = useFonts({
      'Hypatia-Pro': require('./assets/fonts/Hypatia.ttf'),
      'Hypatia-Bold': require('./assets/fonts/Hypatia-Bold.ttf'),
      'Hypatia-Semibold': require('./assets/fonts/Hypatia-Semibold.ttf'),
      radiance: require('./assets/fonts/radiance.ttf'),
      'radiance-semibold': require('./assets/fonts/radiance-semibold.ttf'),
      'Reaver-Bold:': require('./assets/fonts/Reaver-Bold.ttf'),
      'Reaver-SemiBold': require('./assets/fonts/Reaver-SemiBold.ttf'),
   });

   useEffect(() => {
      const heroes = require('./assets/data/heroes.json');
      // console.log('HEROES', heroes);
      const heroList = Object.keys(heroes).map((heroId) => {
         // console.log('HERO ID', heroId);
         const hero = heroes[heroId];

         if (hero && hero.displayName) {
            // console.log(
            //    heroId,
            //    hero.displayName,
            //    heroImages[hero.name.replace('npc_dota_hero_', '')].image
            // );
            return {
               heroId: hero.id,
               name: hero.displayName,
               image: heroImages[hero.name.replace('npc_dota_hero_', '')].image,
            };
         }
      });
      setHeroList(heroList);
   }, []);

   const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
         await SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   handleIdInput = (text) => {
      console.log('TEXT', text, text.length);
      if (text.length === 10) {
         setMatchId(text);
         console.log('MATCH ID', matchId);
      }
   };

   const handleManualModeSubmit = (teams) => {
      console.log('TEAMS', teams);
      setManualMode(false);
      setManualTeams(teams);
   };

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
            {newGame && (
               <Dialog.Container visible={newGame}>
                  <Dialog.Title>Start New Game</Dialog.Title>
                  <Dialog.Description>
                     Enter match ID to start a new game
                  </Dialog.Description>
                  <Dialog.Input
                     // codeLength={10}
                     label="Match ID"
                     placeholder="Enter match ID"
                     keyboardType="numeric"
                     maxLength={10}
                     onChangeText={(text) => handleIdInput(text)}
                  />
                  <Dialog.Button
                     label="Cancel"
                     onPress={() => {
                        setNewGame(false);
                        setManualMode(true);
                     }}
                  />
                  <Dialog.Button
                     disabled={matchId.length !== 10}
                     label="Start"
                     onPress={() => setNewGame(false)}
                  />
               </Dialog.Container>
            )}
            {manualMode && (
               <HeroSelector
                  setTeams={handleManualModeSubmit}
                  heroList={heroList}
               />
            )}
            {!manualMode && (
               <View style={styles.overlay}>
                  <View style={[styles.container, styles.main]}>
                     <Header paused={paused} setPaused={setPaused}></Header>
                     <Body
                        paused={paused}
                        matchId={matchId}
                        manualTeams={manualTeams}
                        radiant={radiant}
                     ></Body>
                  </View>
               </View>
            )}
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
