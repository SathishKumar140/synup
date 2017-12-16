import React, { Component } from 'react';
import * as actions from '../Actions';
import './style.css';
class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
        data:[]
    }
  }
  searchedLocation(e){
    const { dispatch } = this.props;
    const value = e.target.value;
    if(value){
        const locationObj = this.findLocationId(value)
        if(locationObj.length > 0){
            const location = locationObj[0];
            dispatch(actions.fetchReviewLocation(location))
        }
    }
  }

  findLocationId(value){
    const { locations } = this.props;
    return locations ? locations.filter((location)=>{
        return location.city === value
    }) : []
  }

  render(){
    const { locations } = this.props;
    return (<div>
       <div className="header">
            <div className="logo">
                Synup
            </div>
            <div className="searchBar">
                <input list="data" placeholder="Search" name="search" onChange={(e)=>this.searchedLocation(e)}/>
                <datalist id="data" >
                    {locations && locations.length > 0 && locations.map((location)=>{
                        return (
                            <option key={location.id} value={location.city}/>
                        )
                    })}
                </datalist>
            </div>
       </div>
    </div>)
  }
}
 export default Header;