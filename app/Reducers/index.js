import * as types from '../Constant';
const initialState = {
    locations:{},
    reviews:{},
    locationId:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_LOCATIONS:{
            return Object.assign({},state,{locations:action.locations})
        } 
        case types.SET_SEARCHED_LOCATION:{
            const { reviews } = action.response;
            return Object.assign({},state,{reviews:reviews})
        } 
        case types.SET_LOCATION_ID:{
            return Object.assign({},state,{locationId:action.id})
        }
        case types.UPDATE_REVIEW:{
            const { reviews } = state;
            reviews[action.site] = reviews[action.site].map((review)=>{
                if(review.id=== action.response.id){
                    return review.responses = action.response.responses
                }
            })

            return Object.assign({},state,{reviews:reviews})
        }
        default:
            return state;
    }
}