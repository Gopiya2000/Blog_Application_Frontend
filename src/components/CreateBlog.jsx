import React from 'react'
import { Box, TextField, Button, TextareaAutosize, Typography, InputLabel } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { useStyles, labelStyles, chooseFile } from '../styles/styles'
import { addBlog, updateBlog } from "../store/Actions/blogActions"
import { getAllProfile } from '../store/Actions/profileActions'
import { useEffect } from 'react'
import { viewProfile } from '../store/Actions/userActions'

export const CreateBlog = () => {

    const classes = useStyles()
    const userId = useSelector(state => state.userTokener._id)
    const user = useSelector((state) => {
        return state.auth.user.existingUser
    })
    console.log("user :",user)
    const profile = useSelector((state) => {
        return state.profileDetails.profile
    })
    console.log("profile details:",profile)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProfile())
    },[dispatch])

    useEffect(() => {
        dispatch(viewProfile(userId))
    },[userId])

    const [blogDetails, setblogDetails] = useState({
        title: '',
        content: '',
        image: '',
        tag: '',
        user: '',
        profile: ''
    })
    
    const changeHandler = (event) => {
        let newState = { [event.target.name]: event.target.value }
        setblogDetails((prevState) => ({
            ...prevState, ...newState,
            user: user["_id"],
            profile: profile["_id"]
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(addBlog(blogDetails))
        navigate('/blogs')
    }

    return (
        <form onSubmit={submitHandler}>
            <Box border={3} borderColor="#2E3B55" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={3} display='flex' marginLeft={28} flexDirection={'column'} width={"60%"} >
                <Typography variant="h4" sx={{ marginLeft: "42%", marginTop: "1%", width: "70%" }}>Blog details</Typography>
                <InputLabel margin='auto' variant='outlined' className={classes.labelStyles}>Title</InputLabel>
                <br></br>
                <TextField type="text" variant="standard" name="title" value={blogDetails.title} onChange={changeHandler} required />
                <InputLabel margin='auto' variant='outlined' className={classes.labelStyles}>Content</InputLabel>
                <br></br>
                <TextareaAutosize type="text" variant="standard" name="content" value={blogDetails.content} onChange={changeHandler} required />
                <div className={classes.chooseFile}>
                    <Typography>  Create Blog Image</Typography>
                    <br></br>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setblogDetails({ ...blogDetails, image: base64 })} />
                </div>
                <InputLabel margin='auto' variant='outlined' className={classes.labelStyles}>Tag</InputLabel>
                <br></br>
                <TextField type="text" variant='outlined' name="tag" value={blogDetails.tag} onChange={changeHandler} required />
                <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type="submit" onClick={submitHandler}>Add</Button>
            </Box>
        </form>
    )
}
