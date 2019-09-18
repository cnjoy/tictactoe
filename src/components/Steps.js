import React from 'react';

const StepButton = (props) => {
 return (
     <span 
     onClick={props.click}
     className={"btn-step " + props.class} >
     > {props.desc}
     </span>
 );
}

class Steps extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    const stepArray = this.props.stepArray;
    let list =  stepArray.map((step, index) => {
                  const desc = step ? 
                    'Go to move #' + step + '(' + this.props.history[step].position.x + ',' + this.props.history[step].position.y +')':
                    'Go to game start';

                  return (
                    <li key={step.toString()}>
                      <StepButton 
                          click={() => this.props.click(step)} 
                          class={this.props.stepNumber === step ? 'active' : ''}
                          desc={desc}
                      />
                    </li>
      
                  )
                });
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default Steps;