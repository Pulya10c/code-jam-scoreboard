/* eslint-disable no-trailing-spaces */
export default function setComparison(dataSours, dataSoursOld) {
  const [mapedUsers, puzzles] = dataSours;
  const [mapedUsersOld, puzzlesOld] = dataSoursOld;
  const result = _.template(` <tr><th class="lc">DisplayName Участника</th><% _.forEach(puzzles, function(puzzle) { %><th class="even"><%- puzzle.name %></th><% }); %><th class="even">Total time</th></tr>
    <% _.map(mapedUsers, function (user) { 
        for (let i = 0;i<mapedUsersOld.length;i++) {
            if (user.displayName === mapedUsersOld[i].displayName) {
        let totalTime = 0; 
        let totalTimeLast = 0;
        %><tr><td class="lc"><%- user.displayName %></td><%
         _.map(puzzles, function (puzzle) {
           let time = 0; 
           let timeLast = 0;
           let code = '';
           let codeLast = '';
           const game  = user.solutions.find((solution) => solution.name === puzzle.name);
           const gameLast  = mapedUsersOld[i].solutions.find((sol) => sol.name === puzzle.name);

           if (gameLast) {
            timeLast = gameLast.result.time.$numberLong;
            codeLast = gameLast.result.correct + ': '+ gameLast.result.code;
         }
         else {
             timeLast = 150;
             codeLast = "didn't play game";
         }
           if (game) {
               time = game.result.time.$numberLong;
               code = game.result.correct + ': '+ game.result.code;
            }
            else {
                time = 150;
                code = "didn't play game";
            }
          totalTime +=Number(time);
          totalTimeLast +=Number(timeLast);
          %><th title = "<%- codeLast +' / '+ code %>"><%- timeLast +' / '+ time %></th><%
        }).join('') 
        %><th><%- totalTimeLast +' / '+ totalTime %></tr><%
    }}}).join('') %> 
`);
  const final = result({ mapedUsersOld, mapedUsers, puzzles });
  return final;
}
