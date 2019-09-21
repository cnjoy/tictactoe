class AI {

search(squares) {
    let bestMoveValue = -Infinity;
    let move = 0;
    for(let i=0; i<squares.length; i++ ) {
        let newBoard = this.move(i,'O', squares);
        if(newBoard) {
            let depth = newBoard.filter(x => x == null).length;
            let predictedMoveValue = this.alphabeta(newBoard, depth, -Infinity, Infinity, true);
            if (predictedMoveValue > bestMoveValue) {
                bestMoveValue = predictedMoveValue
                move = i
                
              }
        }
    }
    console.log('Move: ' + move);
    return move;
}
// alphabeta([X,0,0,0,0,0,0,0,0], 8, -Infinity, Inifinity, True)
alphabeta(squares, depth, a,b, maximizingPlayer) {
    console.log(depth + ': ' +squares)
    if( depth == 0 ){
        return -Infinity;
    }
    let move = 0;

    if (this.calculateWinner(squares).winner === 'X'){ return Infinity};
    if (this.calculateWinner(squares).winner === 'O'){ return -Infinity;}
    if(!squares.includes(null)) return 0;
    
    if(maximizingPlayer) {
        let value = -Infinity;
        for(let i=0; i<squares.length; i++ ) {
            let newBoard = this.move(i,'O', squares);
            if(newBoard) {
                console.log('i: ' + i + '- ' + 'newBoard: ' + newBoard);
                value = this.max(value, this.alphabeta(newBoard, depth - 1, a,b, false));
                a = (a  >= value) ? a : value;
                if(a >= b) {
                    break;
                }
            }
        }
        return value;
    }else {
        let value = Infinity;
        for(let i=0; i<squares.length; i++ ) {
            let newBoard = (i,'X', squares);
            if(newBoard) {
                value = this.min(value, this.alphabeta(newBoard, depth - 1, a,b, true));
                a = (a  <= value) ? a : value;
                if(a >= b) {
                    break;
                }
            }
            
        }
        return value;
    }
}

max(a, b){
    return (a  >= b) ? a : b;
}
min(a, b){
    return (a  <= b) ? a : b;
}
move (move, player, board) {
    let newBoard = board;

    if (newBoard[move] === null) {
      newBoard[move] = player
      return newBoard
    }
    return
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