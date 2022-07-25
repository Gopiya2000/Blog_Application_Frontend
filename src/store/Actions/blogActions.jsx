import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../../api';
import { VIEW_SINGLE_BLOG, UPDATE_BLOG, DELETE_BLOG, SET_BLOG, VIEW_USER_BLOGS } from './authTypes';

export const setViewSingleBlogs = (blog) => {
    return {
        type: VIEW_SINGLE_BLOG,
        payload: blog
    }
}

export const setEditSingleBlog = (blog) => {
    return {
        type: UPDATE_BLOG,
        payload: blog
    }
}

export const setDeleteSingleBlog = (id) => {
    return {
        type: DELETE_BLOG,
        payload: id
    }
}

export const setBlogByUser = (blogs) => {
    return {
        type: VIEW_USER_BLOGS,
        payload: blogs
    }
}

export const viewBlogs = async () => {
    return await axios.get(`${url}/api/blog/`)
}

//add blogs
export const addBlog = (blog) => {
    console.log("addBlog :",blog)
    blog.tag = blog.tag.split(',');
    return (dispatch, getState) => {

        axios.post(`${url}/api/blog/add`, blog)
        .then(blogs => {
            console.log("created",blogs)

            //     dispatch({
            //         type: "ADD_BLOG",
            //         blogs
            //     })
        }
        )
        .catch(err => {
            console.log("error", err.message)
        })
     }
}

export const viewSingleBlog = (id) => {
    return (dispatch) => {
        axios.get(`${url}/api/blog/single/${id}`)
            .then(blog => {
                dispatch({
                    type: "VIEW_SINGLE_BLOG",
                    blog: blog.data
                })
            })
            .catch(err => {
                console.log("error", err.message)
            })
    }
}

export const updateBlog = (updateCredentials, id) => {
    return (dispatch) => {
        axios.put(`${url}/api/blog/update/${id}`, updateCredentials)
            .then(blog => {
                dispatch({
                    type: "UPDATE_BLOG",
                    blog: blog.data
                })
            })
            .catch(err => {
                console.log("error", err.message)
            })
    }
}

export const deleteBlog = (id) => {
    return () => {
        axios.delete(`${url}/api/blog/${id}`)
    }
}

export const viewUserBlog = (id) => {
    return (dispatch) => {
        axios.get(`${url}/api/blog/${id}`)
            .then(blog => {
                dispatch(setBlogByUser(blog.data));
            })
            .catch(err => {
                return console.log(err);
            })
    }
}

