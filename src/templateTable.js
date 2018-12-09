/* eslint-disable no-trailing-spaces */
export default function templateTable(dataSours) {
  const [mapedUsers, puzzles] = dataSours;
  const resultTab = _.template(` <tr><th class="lc">DisplayName Участника</th><% _.forEach(puzzles, function(puzzle) { %><th class="even"><%- puzzle.name %></th><% }); %><th class="even">Total time</th><th class="even">Comparison</th></tr>
            <% let position = '';
             let arrayResNaw =[];
            _.map(mapedUsers, function (user) {
              position = user.displayName;
                let totalTime = 0; 
                let arrayTime = [];
                %><tr><td class="lc"><%- user.displayName %></td><%
                 _.map(puzzles, function (puzzle) {
                   let time = 0; 
                   let code = '';
                   const game  = user.solutions.find((solution) => solution.name === puzzle.name);
                   if (game) {
                       time = game.result.time.$numberLong;
                       code = game.result.correct + ': '+ game.result.code;
                    }
                    else {
                        time = '150';
                        code = "didn't play game";
                    } 
                  totalTime +=Number(time);
                  arrayTime.push(time);
                  %><th title = "<%- code %>"><%- time %></th><%
                }).join('');
                %><th><%- totalTime %></th><th class = 'graf'><input class = "<%- position %>" value = "<%- arrayTime %>" type="checkbox"/></th></tr><%
            }).join('') %> 
          `);
  const finalTab = resultTab({ mapedUsers, puzzles });
  return finalTab;
  
}
