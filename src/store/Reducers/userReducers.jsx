import jwtdecode from 'jwt-decode';

const initialState = {
    user: '',
    profile: '',
    blog: ''
}

const tokenState = {
    userToken: sessionStorage.getItem("usersToken"),
    _id: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DETAILS': return {
            ...state,
            user: action.payload
        }
        case 'GET_ALL_USER': return {
            ...state,
            user:action.payload
        }
        default: return state
    }
}

const profilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE': return {
            ...state,
            profile: action.payload
        }
        default: return state
    }
}

const tokenUserReducer = (state = tokenState, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
        case 'SET_USER_RETRIEVE_TOKEN':
            const user = jwtdecode(action.token)
            return {
                ...tokenState,
                userToken: action.token,
                _id: user.id
            }
        case 'DELETE_USER_TOKEN': sessionStorage.removeItem("usersToken")
            return {
                userToken: '',
                _id: ''
            }
        default: return state
    }
}

export {
    userReducer,
    profilesReducer,
    tokenUserReducer
}