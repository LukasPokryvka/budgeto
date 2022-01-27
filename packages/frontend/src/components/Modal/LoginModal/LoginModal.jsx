import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import api from '../../../API/api'
import history from '../../../router/history'
import { setUserSession } from '../../../services/AuthService'

const LoginModal = ({ handleCloseModal }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	const handleLogin = (e) => {
		e.preventDefault()
		if (!username.trim() || !password.trim()) {
			setMessage('All fields are required')
			return
		}

		if (message) setMessage(null)

		const requestBody = {
			username,
			password
		}

		api
			.post('/login', requestBody)
			.then((res) => {
				setUserSession(res.data.user, res.data.token)
				handleCloseModal()
				history.push('/')
			})
			.catch((err) => {
				if (err.response.status === 401 || err.response.status === 403) {
					setMessage(err.response.data.message)
				} else {
					setMessage('Sorry, server is down, please t ry again later.')
				}
			})
	}

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': {
					m: 1,
					width: '25ch'
				},
				display: 'flex',
				flexFlow: 'column',
				alignItems: 'center'
			}}
		>
			<Typography id="modal-modal-title" variant="h6" component="h2">
				Login Form
			</Typography>
			<TextField
				label="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<TextField
				type="password"
				autoComplete="current-password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{message && (
				<Typography
					component="small"
					sx={{ color: 'red', textAlign: 'center' }}
				>
					{message}
				</Typography>
			)}
			<Button
				variant="contained"
				color="secondary"
				sx={{ mt: '1.5em' }}
				onClick={handleLogin}
			>
				Login
			</Button>
		</Box>
	)
}

export default LoginModal
