import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Header from './Header.js';
import ReviewContainer from './ReviewContainer';
import Interaction from './Interaction';
import './style.css';


class Home extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(actions.getLocations());
  }

  render(){
    const { locations, dispatch, reviews, locationId } = this.props;
    return (<div className="homeContainer">
        <Header
          locations = {locations}
          dispatch= {dispatch}
        />
        <Interaction reviews = { reviews}/>
        <ReviewContainer
        locationId ={locationId}
          reviews = { reviews}
        />

    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locations:state.locations,
    reviews:state.reviews,
    locationId:state.locationId
  }
}

export default connect(mapStateToProps)(Home);
