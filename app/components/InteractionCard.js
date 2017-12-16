import React, { Component } from 'react';
import * as actions from '../Actions';
import './style.css';
class InteractionCard extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { count, text, svg } = this.props;
    return (<div className="interactionCard">
        <div dangerouslySetInnerHTML={{__html:svg}}/>
        <div>
        <div className="count">{count}</div>
        <div>{text}</div>
        </div>
    </div>)
  }
}
export default InteractionCard;
