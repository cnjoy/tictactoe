import React from 'react';

const square = (props) => {
	return (
		<button 
        id={"square" + props.id}
				className={"square "  + props.class}
				onClick={props.click}
				>
				{props.value}
       
    </button>
	);
}

export default square;