import React, { Component } from 'react';
import * as actions from '../Actions';
import InteractionCard from './InteractionCard';
import './style.css';
class Interaction extends Component{
  constructor(props){
    super(props);
    this.state = {
        interaction:[]
    }
  }
  componentDidMount(){
    this.findInteraction(this.props)
  }
  componentWillReceiveProps(nextProps){
    this.findInteraction(nextProps)
  }
  numDaysBetween(d1,d2){
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  
  }
  findInteraction(props){
      const { reviews } = props;
      const flattenReviews = [];
      const interaction = [];
      Object.keys(reviews).map((review)=>{
          reviews[review].map((item)=>{
              flattenReviews.push(Object.assign({},item,{site:review}))
          })
      })
      const postiveReviews = flattenReviews.filter((review)=>{
        return review.rating > 3
      })
      const newReviews = flattenReviews.filter((review)=>{
        const d1 = new Date();
        const d2 = new Date(review.date);
        this.numDaysBetween(d2,d1);
        return this.numDaysBetween(d2,d1) > 30
      })
      interaction.push({
            count:flattenReviews.length - newReviews.length,
            text: 'Total Interactions',
            svg:`<svg width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Signup" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Artboard-3" transform="translate(-45.000000, -40.000000)">
                    <g id="Group-Copy-2" transform="translate(45.000000, 41.000000)">
                        <path d="M4.69140446,46.9271586 L0,52 L0,41.3597123 L0.081181267,41.3862455 C0.0277266961,41.0375657 4.4531881e-17,40.6804112 0,40.3167808 L0,30 C-4.73447626e-16,26.1340068 3.13400675,23 7,23 L24,23 C27.8659932,23 31,26.1340068 31,30 L31,40.3167808 C31,44.1827741 27.8659932,47.3167808 24,47.3167808 L7,47.3167808 C6.19108672,47.3167808 5.41422024,47.1795721 4.69140446,46.9271586 Z M13.95,34.0185413 L13.95,37.0581389 L17.05,37.0581389 L17.05,34.0185413 L13.95,34.0185413 Z M7.75,34.0185413 L7.75,37.0581389 L10.85,37.0581389 L10.85,34.0185413 L7.75,34.0185413 Z M20.15,34.0185413 L20.15,37.0581389 L23.25,37.0581389 L23.25,34.0185413 L20.15,34.0185413 Z" id="Combined-Shape" fill="#084478"></path>
                        <g id="Group" transform="translate(17.000000, 0.000000)">
                            <circle id="Oval-4" stroke="#084478" stroke-width="2" fill="#F8F8F8" cx="17.5" cy="17.5" r="17.5"></circle>
                            <circle id="Oval-6" fill="#084478" cx="17.5" cy="17.5" r="8.5"></circle>
                        </g>
                    </g>
                </g>
            </g>
        </svg>`
      })
      interaction.push({
            count:newReviews.length,
            text: 'New Interactions',
            svg:`
            <svg width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Signup" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Signup-Copy-12" transform="translate(-382.000000, -138.000000)">
                        <g id="Group-2" transform="translate(382.000000, 139.000000)">
                            <g id="Group-Copy-4">
                                <path d="M4.69140446,46.9271586 L0,52 L0,41.3597123 L0.081181267,41.3862455 C0.0277266961,41.0375657 4.4531881e-17,40.6804112 0,40.3167808 L0,30 C-4.73447626e-16,26.1340068 3.13400675,23 7,23 L24,23 C27.8659932,23 31,26.1340068 31,30 L31,40.3167808 C31,44.1827741 27.8659932,47.3167808 24,47.3167808 L7,47.3167808 C6.19108672,47.3167808 5.41422024,47.1795721 4.69140446,46.9271586 Z M13.95,34.0185413 L13.95,37.0581389 L17.05,37.0581389 L17.05,34.0185413 L13.95,34.0185413 Z M7.75,34.0185413 L7.75,37.0581389 L10.85,37.0581389 L10.85,34.0185413 L7.75,34.0185413 Z M20.15,34.0185413 L20.15,37.0581389 L23.25,37.0581389 L23.25,34.0185413 L20.15,34.0185413 Z" id="Combined-Shape" fill="#F39C12"></path>
                                <g id="Group" transform="translate(17.000000, 0.000000)" fill="#F8F8F8" stroke="#F39C12" stroke-width="2">
                                    <circle id="Oval-4" cx="17.5" cy="17.5" r="17.5"></circle>
                                </g>
                            </g>
                        </g>
                        <path d="M417,164 C419,157.404176 420,152.915523 420,150.53404 C420,146.961815 418.656854,145 417,145 C415.343146,145 414,146.961815 414,150.53404 C414,152.915523 415,157.404176 417,164 Z" id="Oval" fill="#F39C12"></path>
                        <circle id="Oval-6" fill="#F39C12" cx="417" cy="167" r="2"></circle>
                    </g>
                </g>
            </svg>
            `
      })
      interaction.push({
          count:postiveReviews.length,
          text: 'Positive Interactions',
          svg:`<svg width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Signup" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Signup-Copy-12" transform="translate(-684.000000, -138.000000)">
                  <g id="Group-2-Copy" transform="translate(684.000000, 139.000000)">
                      <g id="Group-Copy-4">
                          <path d="M4.69140446,46.9271586 L0,52 L0,41.3597123 L0.081181267,41.3862455 C0.0277266961,41.0375657 4.4531881e-17,40.6804112 0,40.3167808 L0,30 C-4.73447626e-16,26.1340068 3.13400675,23 7,23 L24,23 C27.8659932,23 31,26.1340068 31,30 L31,40.3167808 C31,44.1827741 27.8659932,47.3167808 24,47.3167808 L7,47.3167808 C6.19108672,47.3167808 5.41422024,47.1795721 4.69140446,46.9271586 Z M13.95,34.0185413 L13.95,37.0581389 L17.05,37.0581389 L17.05,34.0185413 L13.95,34.0185413 Z M7.75,34.0185413 L7.75,37.0581389 L10.85,37.0581389 L10.85,34.0185413 L7.75,34.0185413 Z M20.15,34.0185413 L20.15,37.0581389 L23.25,37.0581389 L23.25,34.0185413 L20.15,34.0185413 Z" id="Combined-Shape" fill="#7CCC63"></path>
                          <g id="Group" transform="translate(17.000000, 0.000000)" fill="#F8F8F8" stroke="#7CCC63" stroke-width="2">
                              <circle id="Oval-4" cx="17.5" cy="17.5" r="17.5"></circle>
                          </g>
                      </g>
                  </g>
                  <polygon id="Path-3-Copy" fill="#7CCC63" points="709 157.297297 711.83908 154.594595 715.87931 158.594595 725.16092 148 728 150.054054 716.316092 164"></polygon>
              </g>
          </g>
      </svg>
      `
      })
      interaction.push({
        count:flattenReviews.length - postiveReviews.length,
        text: 'Negative Interactions',
        svg:`<svg width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Signup" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Signup-Copy-12" transform="translate(-990.000000, -138.000000)">
                <g id="Group-2-Copy-2" transform="translate(990.000000, 139.000000)">
                    <g id="Group-Copy-4">
                        <path d="M4.69140446,46.9271586 L0,52 L0,41.3597123 L0.081181267,41.3862455 C0.0277266961,41.0375657 4.4531881e-17,40.6804112 0,40.3167808 L0,30 C-4.73447626e-16,26.1340068 3.13400675,23 7,23 L24,23 C27.8659932,23 31,26.1340068 31,30 L31,40.3167808 C31,44.1827741 27.8659932,47.3167808 24,47.3167808 L7,47.3167808 C6.19108672,47.3167808 5.41422024,47.1795721 4.69140446,46.9271586 Z M13.95,34.0185413 L13.95,37.0581389 L17.05,37.0581389 L17.05,34.0185413 L13.95,34.0185413 Z M7.75,34.0185413 L7.75,37.0581389 L10.85,37.0581389 L10.85,34.0185413 L7.75,34.0185413 Z M20.15,34.0185413 L20.15,37.0581389 L23.25,37.0581389 L23.25,34.0185413 L20.15,34.0185413 Z" id="Combined-Shape" fill="#E74C3C"></path>
                        <g id="Group" transform="translate(17.000000, 0.000000)" fill="#F8F8F8" stroke="#E74C3C" stroke-width="2">
                            <circle id="Oval-4" cx="17.5" cy="17.5" r="17.5"></circle>
                        </g>
                    </g>
                </g>
                <text id="+" transform="translate(1026.500000, 157.500000) rotate(45.000000) translate(-1026.500000, -157.500000) " font-family="Roboto-Medium, Roboto" font-size="30" font-weight="400" letter-spacing="1.66666675" fill="#E74C3C">
                    <tspan x="1017" y="168">+</tspan>
                </text>
            </g>
        </g>
    </svg>
    `
      })
      this.setState({
        interaction
      })

  }
  render(){
    const { interaction } = this.state;
    return (<div className="reviewCard">
        {interaction.map((inter,i)=>{
            const count = inter.count;
            const text = inter.text;
            const svg = inter.svg;
                return (<InteractionCard 
                    key={i}
                    count={count}
                    text={text}
                    svg={svg}
            />)
        })}
    </div>)
  }
}
export default Interaction;
