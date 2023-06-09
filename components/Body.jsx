import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import { abilityImages } from '../assets/abilityIndex';
import { heroImages } from '../assets/heroIndex';
import HorizontalSection from './HorizontalSection';
import { getMatch } from '../services/matchService';
import { useTimer } from 'react-timer-hook';
import Timer from './Timer';
const Body = ({ matchId, radiant: radiantIn, manualTeams, paused }) => {
   const [allyTeam, setAllyTeam] = React.useState([]);
   const [enemyTeam, setEnemyTeam] = React.useState([]);
   const [radiant, setRadiant] = React.useState(true);

   React.useEffect(() => {
      setRadiant(radiantIn);
   }, [radiantIn]);

   React.useEffect(() => {
      console.log(manualTeams);
      if (
         manualTeams.allyTeam.length === 5 &&
         manualTeams.enemyTeam.length === 5
      ) {
         setAllyTeam(manualTeams.allyTeam);
         setEnemyTeam(manualTeams.enemyTeam);
      }
   }, [manualTeams]);

   React.useEffect(() => {
      if (!radiantIn) return;
      console.log('RADIANT', radiantIn);
      setRadiant(radiantIn);
   }, [radiantIn]);

   React.useEffect(() => {
      if (!matchId) return;
      console.log('MATCH ID', matchId);
      getMatch(matchId).then((data) => {
         console.log('DATA', data);
         const { radiant, dire } = data;

         if (radiant) {
            setAllyTeam(radiant);
            setEnemyTeam(dire);
         } else {
            setAllyTeam(dire);
            setEnemyTeam(radiant);
         }
         console.log('ALLY TEAM', allyTeam);
         console.log('ENEMY TEAM', enemyTeam);
      });
   }, [matchId]);

   const abilities = require('../assets/data/abilities.json');
   const heroes = require('../assets/data/heroes.json');
   const myTeam = [87, 45, 2, 3, 4];
   // const enemyTeam = [5, 100, 29, 120, 49];
   const disruptor = heroes[87];
   const abilitiesDisruptor = disruptor.abilities.map((ability) => {
      // console.log('IS THIS WORKING?', ability);
      return abilities[ability.abilityId];
   });
   // console.log('DISRUPTOR:', abilitiesDisruptor);
   // console.log(abilitiesDisruptor);
   const baseUrl = 'https://cdn.stratz.com/images/dota2/abilities/';
   const fileExtension = '.png';
   const disruptorName = disruptor.name.replace('npc_dota_hero_', '');
   const disruptorThumb = {
      uri: `https://cdn.stratz.com/images/dota2/heroes/${disruptorName}_horz.png`,
   };
   console.log(disruptorThumb);
   return (
      <View style={styles.container}>
         <View style={styles.section}>
            <View style={styles.horizontalSection}>
               {/* Show all of my team's images */}
               {allyTeam &&
                  allyTeam.map((allyHero) => {
                     const heroId = allyHero.heroId;
                     // console.log('HERO ID', heroId);
                     const hero = heroes[heroId];
                     const heroName = hero.name.replace('npc_dota_hero_', '');
                     const heroThumb = `../assets/images/heroes/${heroName}_horz.png`;
                     // console.log(heroThumb);
                     return (
                        <Image
                           style={styles.smallImage}
                           source={heroImages[heroName].image}
                           key={heroId}
                        />
                     );
                  })}
            </View>
         </View>
         <View style={styles.section}>
            {/* Make horizontal sections for each enemy hero with their hero icon first */}
            {enemyTeam.map((enemyHero) => {
               const heroId = enemyHero.heroId;
               const hero = heroes[heroId];
               const heroName = hero.name.replace('npc_dota_hero_', '');
               const heroThumb = `../assets/images/heroes/${heroName}_horz.png`;
               const heroAbilities = hero.abilities.reduce(
                  (results, ability) => {
                     const abilityData = abilities[ability.abilityId];

                     try {
                        const imageSource =
                           abilityImages[abilityData.name].image;

                        const active = true;

                        const id = abilityData.id;
                        const ultimate = abilityData.stat.isUltimate;
                        const maxLevel = abilityData.stat.maxLevel
                           ? abilityData.stat.maxLevel
                           : ultimate
                           ? 3
                           : 4;
                        // const level = Math.floor(Math.random() * maxLevel); // 0, 1, 2, 3
                        const level = maxLevel; // 0, 1, 2, 3
                        const cooldown = abilityData.stat.cooldown
                           ? abilityData.stat.cooldown
                           : undefined;
                        if (cooldown && cooldown.length < maxLevel) {
                           // This means the cooldown is the same for all levels
                           for (let i = cooldown.length; i < maxLevel; i++) {
                              cooldown.push(cooldown[0]);
                           }
                        }

                        results.push({
                           imageSource,
                           cooldown,
                           active,
                           ultimate,
                           maxLevel,
                           level,
                           id,
                        });
                     } catch (error) {
                        // console.log('DATA', abilityData);

                        console.log(error);
                     }
                     return results;
                  },
                  []
               );
               console.log(heroAbilities);
               // console.log(heroThumb);
               return (
                  <HorizontalSection
                     paused={paused}
                     backgroundImage={heroImages[heroName].image}
                     number={heroId}
                     title={hero.displayName}
                     buttonText="Press me"
                     onPress={() => console.log('Pressed')}
                     abilities={heroAbilities}
                     key={heroId}
                  />
               );
            })}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   section: {
      // paddingVertical: 20,
      // paddingHorizontal: 10,
      display: 'flex',
      gap: 10,
   },
   horizontalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      display: 'flex',
      // maxHeight: 100,
      marginBottom: 10,
      width: '100%',
      backgroundColor: 'rgba(45, 49, 63, 0.51)',
      borderWidth: 1,
      borderColor: '#4A5055',
      // borderRadius: '6px', '1px solid #2D313F'
      borderRadius: 10,
      padding: 10,
      // gap: 2,
   },
   image: {
      // height: 200,
      // width: '100%',
      height: '100%',
      width: '20%',
      resizeMode: 'cover',
   },
   smallImage: {
      height: 38,
      // width: 20,
      resizeMode: 'contain',
      width: '20%',
      borderRadius: 4,
      flex: 1,
   },
});

export default Body;
