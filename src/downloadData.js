export default function downloadData(dataGame, dataUsers) {
  const sessions = require(`${dataGame}`);
  const users = require(`${dataUsers}`);
  const { rounds, puzzles } = sessions;
  const mapedGames = _.map(puzzles, (puzzle, idx) => {
    const round = _.find(rounds, ['puzzleIndex.$numberLong', idx.toString()]);
    return { ...puzzle, ...round };
  });

  const mapedUsers = _.map(users, (user) => {
    const solutions = mapedGames
      .filter(game => game.solutions[user.uid])
      .map(({ solutions, ...rest }) => ({ ...rest, result: solutions[user.uid] }));
    return { ...user, solutions };
  });
  return [_.sortBy(mapedUsers, 'displayName'), puzzles];
}
