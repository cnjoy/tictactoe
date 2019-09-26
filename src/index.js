import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Steps from './components/Steps';
import Board from './components/Board';
import AI from './classes/AI';
import Games from './classes/Games';
import {sortAscending, sortDescending, calculateWinner} from './helpers/functions';


class Game extends React.Component {
  ai = new AI();
  games = new Games();
	constructor(props) {
    super(props);
    
		this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: {x:null, y:null},
      }],		
      stepNumber: 0,
      xIsNext: true,
     
    }
    
    // this.games.on('moved', (arg) =>{
    //   const history = this.state.history.slice(0,this.state.stepNumber + 1);
    //   const current = history[history.length - 1];
    //   if(!this.state.xIsNext) {
    //   this.setState({
    //     history: history.concat([{
    //       squares: arg.board,
    //       position: {x:0, y:1}
    //     }]),
    //     stepNumber: history.length,
    //     xIsNext: !this.state.xIsNext,
    //     position: [{x:0, y:1}],
    //   });
    //   this.games.update();
    // }
    // })
    

  }
  componentDidUpdate() { 
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // this.ai.player
    // if(!this.state.xIsNext)
    // console.log('search: ' + this.ai.search(squares));
    
    
  }

  handleClick(i,x,y) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(squares);
    const win = calculateWinner(squares);
  //  console.log('search: ' + this.ai.search(squares));
		if( win.winner || squares[i]) {
			return;
		}
   
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log('1xisnext ' + this.state.xIsNext);
      this.setState({
        history: history.concat([{
          squares: squares,
          position: {x:x, y:y},
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        position: [{x:x, y:y}],
      });
console.log('2xisnext ' + this.state.xIsNext);
      if(this.state.xIsNext) 
      {
        console.log('3xisnext ' + this.state.xIsNext);
        this.games.on('moved', (arg) =>{
          const history = this.state.history.slice(0,this.state.stepNumber + 1);
          const current = history[history.length - 1];
         
          this.setState({
            history: history.concat([{
              squares: arg.board,
              position: {x:0, y:1}
            }]),
            stepNumber: history.length,
            xIsNext: true,
            position: [{x:0, y:1}],
          });
          console.log('4xisnext ' + this.state.xIsNext);
        
      
      })
      console.log(squares);
      this.games.update(squares);
    }
  }

  handleSort(e) {
    this.setState({
      sortStepDescending: !this.state.sortStepDescending,
    });

  }
   
  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    })
  }

	render () {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const win = calculateWinner(current.squares);

    let stepArray = Array.from(Array(this.state.history.length).keys());
    stepArray = this.state.sortStepDescending ? sortDescending(stepArray) : sortAscending(stepArray);
    
    let status;

    if (win.winner) {
      status = 'Winner: ' + win.winner;
    } else if(win.winner === null && history.length > 9) {
      status = 'This is draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

		return (
      <div className="container">
        <header>
          <h1>Tic Tac Toe</h1>
        </header>
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick={(i,x,y) => this.handleClick(i,x,y)}
              highlight={win.lines}
            />
          </div>
          <div className="game-info">
            <div className="game-status">{status}</div>
            <div className="step-sort">
              <button className="btn btn-primary" onClick={(event) => this.handleSort(event)}>
                Sort {this.state.sortStepDescending ? 'Ascending' : 'Descending'}
              </button>
            </div>
            <div className="ul-sort">
              <ul>
                <Steps
                    stepArray = {stepArray}
                    click={this.jumpTo} 
                    history={history} 
                    stepNumber={this.state.stepNumber}
                    howManySteps= {this.state.stepNumber}
                    descend={this.state.sortStepDescending}
                    
                  />
              </ul>
            </div>
            
          </div>
         
        </div>
        </div>
		);
	}
}
ReactDOM.render(
	<Game/>,
	document.getElementById('tictac-root')
);


