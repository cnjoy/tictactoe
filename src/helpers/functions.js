function sortAscending(arr){
  return arr.sort((a,b) => a - b)
}
  
function sortDescending(arr){
  return arr.sort((a,b) => a - b).reverse();
}

function calculateWinner(squares) {
    let result = {winner : null, lines: []};
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        result.winner = squares[a];
        result.lines = lines[i];
        return result;
      }
    }
    return result;
  }

export {
    sortAscending,
    sortDescending,
    calculateWinner
}