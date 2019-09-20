class AI {

// alphabeta([X,0,0,0,0,0,0,0,0], 8, -Infinity, Inifinity, True)
alphabeta(squares, depth, a,b, maximizingPlayer) {
    console.log(squares)
    if( depth == 0 ){
        return -Infinity;
    }

    if (this.calculateWinner(squares).winner === 'X'){ return Infinity};
    if (this.calculateWinner(squares).winner === 'O'){ return -Infinity;}
    if(!squares.includes(null)) return 0;
    

    return null;
}

// nextBoard(board, player){
//     for(i = 0, i < board.length; i++ ) {
//         if(!board[i])
//     }
// }
    

calculateWinner(squares) {
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
}

export default AI;