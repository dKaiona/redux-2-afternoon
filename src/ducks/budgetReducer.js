import axios from 'axios'

const inState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//Action Types
let REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
let ADD_PURCHASE = 'ADD_PURCHASE'
let REMOVE_PURCHASE = 'REMOVE_PURCHASE'

//Action Creators
export function removePurchase(id) {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return{
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export function addPurchase (price, description, category) {
let data = axios.post('/api/budget-data/purchase', {
    description,
    price,
    category
}).then(res => res.data)
return {
    type: ADD_PURCHASE,
    payload: data
}
}

export function requestBudgetData () {
    let data = axios.get('/api/budget-data').then(res => res.data)
    console.log(22,data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

//Reducer Function

export default function reducer(state = inState, action) {
    switch(action.type) {

        case REQUEST_BUDGET_DATA + '_PENDING':
        return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
        let {purchases, budgetLimit} = action.payload
        return {...state, purchases, budgetLimit}
        case ADD_PURCHASE + '_PENDING':
        return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
        return {...state, purchases: action.payload, loading: false}
        case REMOVE_PURCHASE + '_PENDING':
        return {...state, loading: true}
        case REMOVE_PURCHASE + '_FULFILLED':
        return {...state, loading: false, purchases: action.payload}
        default: return state
    }
}