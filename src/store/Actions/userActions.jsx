import { SET_USER_TOKEN, SET_USER_RETRIEVE_TOKEN, DELETE_USER_TOKEN, SET_DETAILS, SET_PROFILE, ADD_PROFILE,GET_ALL_USER, SET_BLOG } from "./authTypes"
import axios from "axios"
import { url } from '../../api';

const setUserToken = (token) => {
    return {
        type: SET_USER_TOKEN,
        token
    }
}

const setUserRetrieveToken = (token) => {
    return {
        type: SET_USER_RETRIEVE_TOKEN,
        token
    }
}

const deleteUserToken = () => {
    return {
        type: DELETE_USER_TOKEN
    }
}

const setDetails = (user) => {
    return {
        type: SET_DETAILS,
        payload: user
    }
}

const getAllUsers = (user) => {
    return {
        type: GET_ALL_USER,
        payload: user
    }
}

const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}

const setProfileDetails = (profile) => {
    return{
        type : ADD_PROFILE,
        payload : profile
    }
}

const storeUserToken = (user, type = 'login') => {
    return async (dispatch) => {
        await axios.post(`${url}/api/user/${type}`, user)
            .then(token => {
                if (type === 'login') {
                    sessionStorage.setItem("usersToken", token.data.token)
                    dispatch(setUserToken(token.data.token))
                }
            })
            .catch(err => console.log(err.response))
    }
}

const retrieveUserToken = () => {
    return (dispatch, getState) => {
        const token = getState().userTokener.userToken
        if (token) {
            dispatch(setUserRetrieveToken(token))
        }
    }
}

export const viewAllUser =  () => {
    return(dispatch) => {
        axios.get(`${url}/api/user/`)
        .then((user) => {
            dispatch(getAllUsers(user.data))
            console.log("user.data :",user.data)
        })
        .catch(err => console.log(err))
    }  
}

const viewUser = (id) => {
    return (dispatch) => {
        axios.get(`${url}/api/user/${id}`)
            .then((user) => {
                dispatch(setDetails(user.data.user))
            })
            .catch(err => console.log(err))
    }
}

const updateUser = (userDetails, id) => {
    return (dispatch) => {
        axios.put(`${url}/api/user/details/${id}`, userDetails)
            .then(() => {
                dispatch(setDetails(userDetails))
            })
            .catch(err => console.log("error : ", err))
    }
}

const addProfile = (profile) => {
    return(dispatch) => {
        axios.post(`${url}/api/profile/add-profile`, profile)
        .then(() => {
            dispatch(setProfileDetails(profile))
        })
        .catch(err => console.log("error :",err))
    } 

}

const viewProfile = (id) => {
    return (dispatch) => {
        axios.get(`${url}/api/profile/?user=${id}`)
            .then((profile) => {
                dispatch(setProfile(profile.data[0]))
            })
            .catch(err => console.log(err))
    }
}

const updateProfile = (profileDetails, _id) => {
    return (dispatch) => {
        axios.put(`${url}/api/profile/update-profile/${_id}`, profileDetails)
            .then(() => {
                dispatch(setProfile(profileDetails))
            })
            .catch(err => console.log("error : ", err))
    }
}

const updateBlog = (blogDetails, _id) => {
    return (dispatch) => {
        axios.put(`${url}/api/profile/update/${_id}`, blogDetails)
            .then(() => {
                dispatch(setBlog(blogDetails))
            })
            .catch(err => console.log("error : ", err))
    }
}

export {
    storeUserToken,
    retrieveUserToken,
    deleteUserToken,
    viewUser,
    updateUser,
    viewProfile,
    addProfile,
    updateProfile,
    updateBlog
}