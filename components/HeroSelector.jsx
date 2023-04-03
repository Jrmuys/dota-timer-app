import React, { useState } from 'react';
import {
   View,
   Text,
   TextInput,
   FlatList,
   Image,
   TouchableOpacity,
   StyleSheet,
} from 'react-native';

const HeroSelector = ({ heroList, setTeams }) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [allyTeam, setAllyTeam] = useState([]);
   const [enemyTeam, setEnemyTeam] = useState([]);

   const filteredHeroes = heroList
      .filter(
         (hero) =>
            hero.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !allyTeam.includes(hero) &&
            !enemyTeam.includes(hero)
      )
      .sort((a, b) => a.name.localeCompare(b.name));

   const addToTeam = (hero) => {
      if (allyTeam.length < 5) {
         setAllyTeam([...allyTeam, hero]);
      } else if (enemyTeam.length < 5) {
         setEnemyTeam([...enemyTeam, hero]);
      }
   };

   const handleSubmit = () => {
      setTeams({ allyTeam, enemyTeam });
   };

   return (
      <View style={styles.container}>
         <View style={styles.teamContainer}>
            <View style={styles.team}>
               <Text style={styles.teamTitle}>My Team</Text>
               <FlatList
                  data={allyTeam}
                  keyExtractor={(item) => 'teamview-' + item.heroId}
                  renderItem={({ item }) => (
                     <View style={styles.heroItem}>
                        <Image
                           source={item.image}
                           style={styles.teamHeroImage}
                        />
                     </View>
                  )}
                  horizontal={true}
                  style={styles.teamList}
               />
            </View>
            <View style={styles.team}>
               <Text style={styles.teamTitle}>Enemy Team</Text>
               <FlatList
                  data={enemyTeam}
                  keyExtractor={(item) => 'teamview-' + item.heroId}
                  renderItem={({ item }) => (
                     <View style={styles.heroItem}>
                        <Image
                           source={item.image}
                           style={styles.teamHeroImage}
                        />
                     </View>
                  )}
                  horizontal={true}
                  style={styles.teamList}
               />
            </View>
         </View>
         <TextInput
            placeholder="Search for a hero"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            style={styles.searchInput}
         />
         <FlatList
            data={filteredHeroes}
            keyExtractor={(item) => item.heroId}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => addToTeam(item)}>
                  <View style={styles.heroItem}>
                     <Image source={item.image} style={styles.heroImage} />
                     <Text style={styles.heroName}>{item.name}</Text>
                  </View>
               </TouchableOpacity>
            )}
            style={styles.heroList}
         />
         {/* Clear button */}
         {allyTeam.length > 0 && (
            <TouchableOpacity
               style={styles.nextButton}
               onPress={() => {
                  setAllyTeam([]);
                  setEnemyTeam([]);
               }}
            >
               <Text style={styles.nextButtonText}>Clear</Text>
            </TouchableOpacity>
         )}
         {allyTeam.length === 5 && enemyTeam.length === 5 && (
            <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
               <Text style={styles.nextButtonText}>Proceed to next page</Text>
            </TouchableOpacity>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      paddingTop: 22,
   },
   teamContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   team: {
      flex: 1,
      marginRight: 8,
   },
   teamTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
   },
   teamList: {
      maxHeight: 50,
   },
   searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
   },
   heroList: {
      flex: 1,
   },
   heroItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
   },
   heroImage: {
      width: 40,
      height: 40,

      borderRadius: 8,
      // marginRight: 8,
   },
   teamHeroImage: {
      width: 30,
      height: 30,
      borderRadius: 4,
      marginRight: 2,
   },
   heroName: {
      fontSize: 16,
   },
   nextButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
   },
   nextButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
   },
});

export default HeroSelector;
