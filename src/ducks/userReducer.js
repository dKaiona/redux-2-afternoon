import axios from 'axios'

const inState = {
    email: null,
    firstName: null,
    lastName: null
}

// action Types
let REQUEST_USER_DATA = 'REQUEST_USER_DATA'

// action creators
export function requestUserData () {
    let user = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: user 
    }
}


//Reducer Function

export default function reducer(state = inState, action) {
    switch(action.type) {
        case REQUEST_USER_DATA + '_FULFILLED':
        let {firstName, lastName, email} = action.payload.user
        return {...state, firstName, lastName, email }
        default: return state
    }
    
}