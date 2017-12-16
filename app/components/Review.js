import React, { Component } from 'react';
import * as actions from '../Actions';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import './style.css';
class ReviewCard extends Component{
  constructor(props){
    super(props);
    this.state = {
        content:'',
        showTextArea:false
    }
  }
  sendRespond(id){
    this.setState({
        showTextArea:true
    })
  }
  cancel(){
    this.setState({
        showTextArea:false
    })
  }
  setContent(e){
      this.setState({
          content:e.target.value
      })
  }
  submit(id, site){
    const { dispatch, locationId } = this.props;
    const { content } = this.state;
    this.cancel();
    dispatch(actions.postReview(locationId,id,content, site))
  }
  render(){
    const { review } = this.props;
    const { showTextArea } = this.state;
    const { author_name, title, comment, date, rating,site,id, responses }  = review || {}
    return (<div className="reviewCard">
       <div className="reviewCardLeft">
            <div className="logoHolder">
                <div className="companyLogo">
                    <img src={`../assets/${site}.png`} width="30" height="30"/>
                    <div className="companyName">{site}</div>
                </div>
                <div>
                    <div className="authorName">{author_name}</div>
                    <div className="rating">
                        <Rating 
                            empty={<img src="../assets/empty.png" className="icon" />}
                            full={<img src="../assets/fill.png" className="icon" />}
                            initialRate={rating}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="date">Rated on {date}</div>
            </div>
       </div>
       <div className="split"></div>
       <div className="reviewCardRight">
            <div className="title">{title}</div>
            <div className="comment">{comment}</div>
            <div className="title">You Replied</div>
            <div className="Responses">
                {responses.map((response)=>{
                    return (
                        <div className="yourResponse"> - {response.content}</div>
                    )
                })}
            </div>
            {showTextArea && <textarea onChange={(e)=>this.setContent(e)}></textarea>}
            {showTextArea && <div className="respond">
                <div className="respondButton" onClick={()=>this.submit(id,site)}>Submit</div>
                <div className="cancel" onClick={()=>this.cancel()}>Cancel</div>
            </div>}
            {!showTextArea && <div><div className="respondButton" onClick={()=>this.sendRespond()}>RESPOND</div></div>}
       </div>
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
  
export default connect(mapStateToProps)(ReviewCard);
