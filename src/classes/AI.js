class AI {

search(squares) {
    let bestMoveValue = -Infinity;
    let move = 0;
    for(let i=0; i<squares.length; i++ ) {
        let newBoard = this.updateBoard([...squares], i, 'O');
        if(newBoard) {
            // console.log('================search newboard ' + i + ' - '  + newBoard);
            let predictedMoveValue = this.minMoveValue(newBoard);
            if (predictedMoveValue > bestMoveValue) {
                bestMoveValue = predictedMoveValue
                move = i;
            }
        }
    }
    return move;
}

minMoveValue (squares) {
    if (this.calculateWinner(squares).winner === 'O') return Infinity;
    if (this.calculateWinner(squares).winner === 'X') return -Infinity;
    if (!squares.includes(null)) return 0;

    let bestMoveValue = Infinity

    for (let i = 0; i < squares.length; i++) {
      let newBoard = this.updateBoard([...squares], i, 'X')
      if (newBoard) {
        // console.log('min board' + newBoard);
        let predictedMoveValue = this.maxMoveValue(newBoard)
        if (predictedMoveValue < bestMoveValue) bestMoveValue = predictedMoveValue;
      }
    }

    return bestMoveValue
  }

  maxMoveValue (squares) {
    if (this.calculateWinner(squares).winner === 'O') return Infinity;
    if (this.calculateWinner(squares).winner === 'X') return -Infinity;
    if (!squares.includes(null)) return 0;

    let bestMoveValue = -Infinity

    for (let i = 0; i < squares.length; i++) {
      let newBoard = this.updateBoard([...squares], i, 'O')
      if (newBoard) {
        let predictedMoveValue = this.minMoveValue(newBoard)
        if (predictedMoveValue > bestMoveValue) bestMoveValue = predictedMoveValue
      }
    }

    return bestMoveValue
  }

updateBoard(board, index, player) {

    if (board[index] === null) {
        board[index] = player
      return board
    }
    return
}



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