import { Button, Card, CardMedia, SnackbarContent, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { viewProfile } from '../store/Actions/userActions'
import { useStyles, profileImage } from "../styles/styles"

const Profile = () => {

	const classes = useStyles()
	const userId = useSelector(state => state.userTokener._id)
	const profile = useSelector((state) => state.profileDetails.profile)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(viewProfile(userId))
	}, [userId])

	// if (profile == undefined) {
	// 	return (<p LinkComponent={Link} to='/add-profile' variant='outlined' sx={{ borderRadius: 4, marginLeft: 20, marginTop: 3 }}>+ Add</p>
	// 	)
	// }
	// else {
		return (
			<>
				<Box sx={{
					width: 400,
					height: 370,
					margin: 'auto',
					marginTop: '90px'
				}}>
					<Stack>
						<SnackbarContent action={profile.bio} message="BIO" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
					</Stack>
					<br></br>
					<CardMedia
						className={classes.profileImage}
						image={profile.image}
					/>
					<Button LinkComponent={Link} to='/profile/edit' variant='outlined' sx={{ borderRadius: 4, marginLeft: 20, marginTop: 3 }}>Edit</Button>
				</Box>
			</>
		)
	}
//}

export default Profile;


