import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { viewUser,viewProfile } from '../store/Actions/userActions'
import { Avatar, Button, Card, CardMedia, SnackbarContent, Stack, Typography,Grid } from '@mui/material'
import { useStyles } from "../styles/styles"


const UserDetails = () => {

	const userId = useSelector(state => state.userTokener._id)
	const user = useSelector((state) => state.userDetails.user)
	const profile = useSelector((state) => state.profileDetails.profile)
	const dispatch = useDispatch()
	const classes = useStyles()

	useEffect(() => {
		dispatch(viewUser(userId))
	}, [userId])

	useEffect(() => {
		dispatch(viewProfile(userId))
	}, [userId])

	if (profile == undefined) {
		return (
			<>
		<Button LinkComponent={Link} to='/add-profile' variant='contained' color='warning' style={{ marginTop: 10,marginLeft: 600 ,borderRadius: 4}}>
			+ Add Bio and Profile picture
			</Button>
		<Box sx={{
			width: 400,
			height: 370,
			margin: 'auto',
			marginTop: '90px'
		}}>
			<Stack spacing={1}>
				<SnackbarContent action={user.name} message="NAME" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.email} message="EMAIL" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.username} message="USERNAME" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.mobile} message="MOBILE" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.date} message="DATE" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
			</Stack>
			<Button LinkComponent={Link} to='/user-details/edit' variant='outlined' sx={{ borderRadius: 4, marginLeft: 20, marginTop: 3 }} >Edit</Button>
		</Box>
		</>
		)
	}
	else {
		return (
			<>
			<Grid container>
			<Grid item xs={6}>
				<Box sx={{
					width: 400,
					height: 370,
					margin: 'auto',
					marginTop: '90px'
				}}>
					<Avatar
						src={profile.image}
						sx={{
							width:"200px",
							height:"200px"
						}}
					/>
					<br></br>
					<Stack>
						<SnackbarContent action={profile.bio} message="BIO" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
					</Stack>
					<br></br>
					<Button LinkComponent={Link} to='/profile/edit' variant='outlined' sx={{ borderRadius: 4, marginLeft: 20, marginTop: 3 }}>Edit</Button>
					</Box>
					</Grid>
					<Grid item xs={6}>
					<Box sx={{
			width: 400,
			height: 370,
			margin: 'auto',
			marginTop: '90px'
		}}>
			<Stack spacing={1}>
				<SnackbarContent action={user.name} message="NAME" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.email} message="EMAIL" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.username} message="USERNAME" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.mobile} message="MOBILE" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
				<SnackbarContent action={user.date} message="DATE" sx={{ backgroundColor: "#2E3B55", color: 'white' }} />
			</Stack>
			<Button LinkComponent={Link} to='/user-details/edit' variant='outlined' sx={{ borderRadius: 4, marginLeft: 20, marginTop: 3 }} >Edit</Button>
		</Box>
		</Grid>
				</Grid>
			</>
		)
	}
}



export default UserDetails;