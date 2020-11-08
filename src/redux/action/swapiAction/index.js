import { api } from "../../config";

const cors = 'https://cors-anywhere.herokuapp.com/'

export const getInitPeopleData = () => {
    return async dispatch => {
        await api.get(`/people`).then(response => {
            console.log(response)
            dispatch({ type: "FETCH_PEOPLE", result: response.data })
        }, (err) => console.log(err))
    }
}

export const getPeopleData = (params) => {
    return async dispatch => {
        await api.get(cors + params).then(response => {
            console.log(response)
            dispatch({ type: "FETCH_PEOPLE", result: response.data })
        }, (err) => console.log(err))
    }
}