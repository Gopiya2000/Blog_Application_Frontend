import React from 'react'
import { Box, TextField, Button, TextareaAutosize, Typography, InputLabel } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { addProfile } from '../store/Actions/userActions'
import { useStyles, chooseFile, labelStyles } from '../styles/styles'

const AddProfile = () => {

    const classes = useStyles()

    const user = useSelector((state) => {
        return state.auth.user.existingUser
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profileDetails, setProfileDetails] = useState({
        bio: '',
        user: ''
    })

    const changeHandler = (event) => {
        let newState = { [event.target.name]: event.target.value }
        setProfileDetails((prevState) => ({
            ...prevState, ...newState,
            user: user["_id"]
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(addProfile(profileDetails))
        console.log("before navigarion")
        navigate('/blogs')
    }

    return (
        <form onSubmit={submitHandler}>
            <Box border={3} borderColor="#2E3B55" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={3} display='flex' flexDirection={'column'} width={"80%"} >
                <Typography variant="h4" sx={{ marginLeft: "32%", marginTop: "5%", width: "70%" }}>Profile details</Typography>
                <InputLabel margin='auto' variant='outlined' className={classes.labelStyles}>Bio</InputLabel>
                <br></br>
                <TextField type="text" variant="standard" name="bio" value={profileDetails.bio} onChange={changeHandler} required />
                <div className={classes.chooseFile}>
                    <Typography>Profile Image</Typography>
                    <br></br>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setProfileDetails({ ...profileDetails, image: base64 })} />
                </div>
                <Button type="submit" variant='contained'  color='warning' style={{ margin: '6%' }}>Add</Button>
            </Box>
        </form>
    )
}

export default AddProfile;















