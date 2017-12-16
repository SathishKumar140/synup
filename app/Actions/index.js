import * as constant from '../Constant';
export function getLocations(){
    const URL = `${constant.END_POINT}/${constant.API_KEY}/locations.json`;
    return dispatch => (
        fetch(URL, {
          method: 'get'
        })
        .then(response => response.json())
        .then((json) => {
          dispatch(setLocationResponse(json));
        })
    );
}

function setLocationResponse(response){
    const { locations }  = response;
    return {
        type:constant.SET_LOCATIONS,
        locations:locations || {}
    }
}

export function fetchReviewLocation(location){
    const { id } = location;
    const URL = `${constant.END_POINT}/${constant.API_KEY}/locations/${id}/reviews.json`;
    return dispatch => {
        dispatch(setLocationId(id));
        return fetch(URL, {
          method: 'get'
        })
        .then(response => response.json())
        .then((json) => {
          dispatch(setSearchedReviews(json));
        })
    };
}

function setSearchedReviews(response){
    return {
        type:constant.SET_SEARCHED_LOCATION,
        response
    }
}

function setLocationId(id){
    return {
        type:constant.SET_LOCATION_ID,
        id
    }
}

export function postReview(locationId,id, content, site){
    const URL = `${constant.END_POINT}/${constant.API_KEY}/location/${locationId}/reviews/${id}.json`;
    const data = {
        content: content
      }
    const header = {
        'Content-Type': 'application/json'
    }
    return dispatch => (
        fetch(URL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers:header
        })
        .then(response => response.json())
        .then((json) => {
          dispatch(updateReview(json,site))
        })
    );
}

function updateReview(response, site){
    return {
        type:types.UPDATE_REVIEW,
        response,
        site
    }
}