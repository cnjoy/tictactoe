import React from 'react';
import Square from './Square';


class Board extends React.Component {
	renderSquare (i,x,y) {
    const highlight = this.props.highlight;
    let highlightClass = '';
    if(highlight.includes(i)){
      highlightClass = 'yellow';
    }

		return ( 
					<Square
						 	value={this.props.squares[i]}
							click={()=>this.props.onClick(i,x,y)}
              key={"key" +i}
              class={highlightClass}
              id={i}
					 />
		);
  }
  

	render() {
    const items=[0,1,2];
    let counter = -1;
    const blocks = items.map((row)=> {
                    return (
                      <div className="board-row" key={row}>
                        {
                          items.map((col)=>{
                            counter++;
                            return this.renderSquare(counter, col,row);
                          })
                          
                        }
                      </div>                      
                    );
            })
		return (
		<div>
			<div className="status">{/*status*/}</div>
      {blocks}
		</div>
		);
	}
}
export default Board;