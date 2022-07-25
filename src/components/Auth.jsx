import { Button, TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useStyles, fieldTypography, authSubmit, changeButton, signupError } from '../styles/styles';
import { setLogin, setSignOut, toggleSignup } from '../store/Actions/authActions';
import { storeUserToken } from '../store/Actions/userActions';

const Auth = () => {

	const classes = useStyles()
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
		mode: 'onChange'
	})

	const signup = useSelector(state => state.auth.signup)

	const [Inputs, setInputs] = useState({
		name: "",
		email: "",
		username: "",
		mobile: "",
		date: "",
		password: "",
		confirm: ""
	})

	const sendRequest = async (type = "login") => {
		const res = await axios.post(`http://localhost:4567/api/user/${type}`, {
			name: Inputs.name,
			email: Inputs.email,
			username: Inputs.username,
			mobile: Inputs.mobile,
			date: Inputs.date,
			password: Inputs.password,
			confirm: Inputs.confirm
		}
		).catch((err) => console.log(err));
		const data = await res.data;
		return data;
	};

	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const signupHandler = () => {
		dispatch(toggleSignup())
	}

	const { message, error } = useSelector(state => state.userTokener)

	const submitHandler = (e) => {
		if (signup) {
			sendRequest("signup")
				.then(() => {
					dispatch(storeUserToken(Inputs, 'signup'))
					dispatch(setSignOut())
				})
				.then(data => console.log(data))
			navigate("/")
		}
		else {
			sendRequest()
				.then(async (data) => {
					await dispatch(storeUserToken(Inputs))
					await dispatch(setLogin(data))
					navigate("/blogs")
				}
				)
		}
	}
	const password = watch('confirm')

	return (
		<div>
			<form onSubmit={handleSubmit(submitHandler)}>
				<Box className={classes.submitForm} >
					<Typography variant='h4' style={fieldTypography}>
						{signup ? "Signup" : "Login"}
					</Typography>
					{message && <small>{message}</small>}
					{signup && <TextField
						{...register('name', {
							required: 'Name required',
							pattern: {
								value: /^[a-zA-Z ]+$/,
								message: 'Name should contain only alphabets'
							}
						})}
						type={'text'} onChange={handleChange} value={Inputs.name} placeholder='name' margin='normal' required />}
					{errors.name && <small>{errors.name.message}</small>}
					{signup && <TextField
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/,
								message: 'Email should be valid.Eg:gopiya000@gmail.com'
							}
						})}
						onChange={handleChange} value={Inputs.email} type={"email"} placeholder='email' margin='normal' required />}
					{errors.email && <small>{errors.email.message}</small>}
					<TextField
						{...register('username', {
							required: 'Username is required',
							pattern: {
								value: /^[a-zA-Z0-9]{3,18}$/,
								message: 'Username must has minimum 3 and maximum 18 characters'
							}
						})}
						type={'text'} name='username' onChange={handleChange} value={Inputs.username} placeholder='username' margin='normal' required />
					{errors.username && <small>{errors.username.message}</small>}
					{signup && <TextField
						{...register('mobile', {
							required: 'Mobile is required',
							pattern: {
								value: /^(\+91-)[6-9]\d{9}$/,
								message: 'Mobile number should contain 10 digit number along with +91(Eg:+91-9876543212)'
							}
						})}
						type={'text'} name='mobile' onChange={handleChange} value={Inputs.mobile} placeholder='mobile' margin='normal' required />}
					{errors.mobile && <small>{errors.mobile.message}</small>}
					{signup && <TextField
						{...register('date', {
							required: 'DOB is required',
							pattern: {
								value: /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/,
								message: 'The date should be in this format DD/MM/YYYY'
							}
						})}
						type={'text'} name='date' onChange={handleChange} value={Inputs.date} placeholder='DOB' margin='normal' required />}
					{errors.date && <small>{errors.date.message}</small>}
					<TextField
						{...register('password', {
							required: 'Password is required',
							pattern: {
								value: /^[a-zA-Z0-9]{8,12}$/,
								message: 'Password length should be minimum 8 and maximum 12.It should not contain Special characters.'
							}
						})}
						name='password' onChange={handleChange} value={Inputs.password} type={'password'} placeholder='password' margin='normal' required />
					{errors.password && <small>{errors.password.message}</small>}
					{signup && <TextField
						{...register('confirm', {
							required: 'Confirm is required',
							validate: confirm => confirm === password || 'Confirm password doesnot match the password'
						})}
						name='confirm' onChange={handleChange} value={Inputs.confirm} type={'password'} placeholder='confirm password' margin='normal' required />}
					{errors.confirm && <small>{errors.confirm.message}</small>}
					<Button type='submit' variant='contained' style={authSubmit}>{signup ? "Signup" : "Login"}</Button>
					{!signup && <Typography>Don't have an account ?</Typography>}
					<Link onClick={signupHandler} to='/'>{!signup && "Signup"}</Link>
				</Box>
			</form>
		</div>
	)
}

export default Auth;

