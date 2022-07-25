import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Button, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { useStyles, appBar, loginTabs, loginBox, logoutButton, signupButton, LoginButton } from '../styles/styles'
import { setLogout, setSignOut, setSignUp } from '../store/Actions/authActions';
import { viewUser } from '../store/Actions/userActions';
import { deleteUserToken } from '../store/Actions/userActions';

const Header = () => {

	const location = useLocation()
	const userId = useSelector(state => state.userTokener._id)
	const classes = useStyles()
	const dispatch = useDispatch();
	const login = useSelector(state => state.auth.login);
	const [selectTab, setSelectTab] = useState(0)

	const logoutHandler = () => {
		dispatch(deleteUserToken())
		Navigate('/')

	}

	useEffect(() => {
		if (location.pathname === "/" || location.pathname === '/blogs') {
			setSelectTab(0)
		}
		else if (location.pathname === "/blogs/add") {
			setSelectTab(1)
		}
		else if (location.pathname === "/my-blogs") {
			setSelectTab(2)
		}
		else if (location.pathname === "/user-details") {
			setSelectTab(3)
		}

	}, [login])

	useEffect(() => {
		dispatch(viewUser())
		console.log(login)
	}, [dispatch, login])

	return (
		<>
			<AppBar position="sticky" style={appBar}>
				<Toolbar>
					<Typography variant='h4'>Blog Application</Typography>
					{userId && <>
						<Box className={classes.loginForm}>
							<Tabs value={selectTab} textColor='inherit' onChange={(e, value) => setSelectTab(value)}>
								<Tab LinkComponent={Link} to="/blogs" label="Home" />
								<Tab LinkComponent={Link} to="/blogs/add" label="Create Blog" />
								<Tab LinkComponent={Link} to="/my-blogs" label="My Blog" />
								<Tab LinkComponent={Link} to="/user-details" label="My Profile" />
							</Tabs>
						</Box></>}
					<Box style={loginBox}>
						{userId && (
							<Button
								onClick={logoutHandler}
								LinkComponent={Link}
								to="/"
								variant='contained'
								style={logoutButton}
							>
								Logout
							</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Header;