const axios = require('axios');

export async function getMatch(matchid) {
   try {
      const url = 'https://api.opendota.com/api/matches/' + matchid;
      console.log('INITIATING GET MATCH REQUEST TO: ' + url);
      const response = await fetch(url, {
         headers: {
            Authorization: 'Bearer 2713ed3e-f337-4a75-9d19-d65d373ffe6e',
         },
      });
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = JSON.parse(await response.text());
      // console.log('RESULT', result.players);
      const allPlayers = result.players.map((player) => {
         return {
            heroId: player.hero_id,
            steamId: player.account_id,
            isRadiant: player.isRadiant,
         };
      });

      const players = {
         radiant: allPlayers.filter((player) => player.isRadiant),
         dire: allPlayers.filter((player) => !player.isRadiant),
      };

      console.log('PLAYERS', players);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      return players;
   } catch (error) {
      console.error('ERROR', error);
      return '';
   }
}
