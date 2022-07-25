import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../../api';
import { SET_PROFILE } from './authTypes';

const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}

export const viewProfile = (id) => {
    return (dispatch) => {
        axios.get(`${url}/api/profile/?user=${id}`)
            .then((profile) => {
                dispatch(setProfile(profile.data[0]))
            })
            .catch(err => console.log(err))
    }
}

export const addProfile = (profile) => {
    return (dispatch, getState) => {
        axios.post(`${url}/api/profile/add-profile`, profile)
            .then(profile => {
                dispatch({
                    type: "ADD_PROFILE",
                    profile
                })
            }
            )
            .catch(err => {
                console.log("error", err.message)
            })
    }
}

export const getAllProfile = () => {
    return(dispatch) => {
        axios.get(`${url}/api/profile/all`)
        .then(profile=> {
            console.log("profile all",profile.data)
            dispatch({
                type:"GET_ALL_PROFILE",
                profiles: profile.data
            })
        })
        .catch(err =>{
            console.log("error",err)
        })
    }
}