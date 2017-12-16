import React, { Component } from 'react';
import * as actions from '../Actions';
import ReviewCard from './Review';
import './style.css';
class ReviewContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
        reviews:[],
        platform:[],
        month:'',
        platformSelected:'',
    }
  }
  componentDidMount(){
    const { reviews } = this.props;
    this.flattenReviews(reviews);
    this.setState({
        platform:Object.keys(reviews)
    })
  }

  componentWillReceiveProps(nextprops){
    const { reviews } = nextprops;
    this.flattenReviews(reviews);
    this.setState({
        platform:Object.keys(reviews)
    });
    if(nextprops.reviews!==this.props.reviews){
        this.platform.value = '';
    }
  }

  flattenReviews(reviews){
    const flattenReviews = [];
    Object.keys(reviews).map((review)=>{
        reviews[review].map((item)=>{
            flattenReviews.push(Object.assign({},item,{site:review}))
        })
    })
    this.setState({
        reviews:flattenReviews
    })
  }

  filter(value){
    const { reviews } = this.props;
    const platformKey = this.platform.value;
    this.setState({
        month:this.month.value,
        platformSelected:platformKey
    })
    if(platformKey){
        const keySelected = Object.keys(reviews).filter((key)=>{
            return key===platformKey
        });
        const review = {};
        review[platformKey] = reviews[keySelected]
        this.flattenReviews(review);
    }
  }
  
  render(){
    const { reviews, platform, dispatch, locationId } = this.state;
    return (<div className="reviewContainer">
        <div className="interactionFilter">
           <div> All Interaction <span className="splitContent"> in </span> </div>
           <select ref={(refs)=>{this.month = refs}} onChange={()=>this.filter('month')}>
               <option value="all">All</option>
           </select>
           <span className="splitContent"> from </span>
           <select ref={(refs)=>{this.platform = refs}}onChange={()=>this.filter('platform')}>
               {platform.map((plat)=>{
                   return (
                       <option value={plat}>{plat}</option>
                   )
               })}
           </select>
        </div>
        {Object.keys(reviews).length > 0 && reviews.map((review,i)=>{
            return (
                <div key={i}>
                    <ReviewCard 
                    locationId={locationId}
                    review ={review}
                    dispatch={dispatch}
                    />
                </div> 
            )
        })}
      
    </div>)
  }
}
 export default ReviewContainer;