import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
	loginForm: {
		display: "flex",
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'warning'
	},
	submitForm: {
		maxWidth: 400,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '10px 10px 20px #ccc',
		padding: 3,
		margin: 'auto',
		marginTop: 5,
		borderRadius: 7,
		//height: 400
	}
}))

export let appBar = {
	backgroundColor: '#2E3B55'
}

export let loginBox = {
	display: "flex",
	marginLeft: 'auto',
	color: 'warning'
}

export let LoginButton = {
	margin: 1,
	borderRadius: 10,
	backgroundColor: '#e95307'
}

export let logoutButton = {
	margin: 1,
	borderRadius: 10,
	backgroundColor: '#e95307'
}

export let signupButton = {
	margin: 1,
	borderRadius: 10,
	backgroundColor: '#e95307'
}

export let fieldTypography = {
	padding: 3,
	textAlign: 'center'
}

export let authSubmit = {
	borderRadius: 3,
	marginTop: 3,
	backgroundColor: '#e95307'
}

export let changeButton = {
	borderRadius: 3,
	marginTop: 3
}

export let headerMenu = {
	color: 'white'
}

export let headerButtons = {

	borderRadius: '3px'
}

export let labelStyles = {
	mb: 1,
	mt: 2,
	fontSize: '24px',
	fontWeight: 'bold'
}

export let chooseFile = {
	width: "95%",
	margin: "10px 0",
}

export let profileImage = {
	paddingTop: '81.25%',
	borderRadius: '50%',
	margin: '28px'
}

export let signupError = {
	text: {
		color: 'red'
	}
}

export let blogHome = {
	backgroundColor: '#FAFBFC'
}

export let p = {
	textAlign : "center"
}