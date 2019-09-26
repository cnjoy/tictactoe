import { EventEmitter } from 'events'
import AI from './AI'
import square from '../components/Square';

export default class Games extends EventEmitter {
    ai = new AI();
    board =  Array(9).fill(null);

    update(squares) {
        
        squares = this.random(squares, 0, 'O');
        console.log('sq', squares);
        this.emit('moved', {board: squares});
    }

    random(squares, index, value) {
        
        if(squares.filter(x => x == null).length == 0) {
            return squares;
        }
        
        if(squares[index] == null) {
            squares[index] = value;
            return squares;
        }else {
            let rand = this.getRandomInt(0,8);
            console.log(rand);
            return this.random(squares, rand, value)
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}