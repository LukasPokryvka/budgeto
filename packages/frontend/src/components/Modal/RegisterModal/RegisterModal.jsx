import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import api from '../../../API/api'

const RegisterModal = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	const handleRegister = (e) => {
		e.preventDefault()
		if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
			setMessage('All fields are required')
			return
		}

		if (message) setMessage(null)

		const requestBody = {
			username,
			email,
			name,
			password
		}

		api
			.post('/register', requestBody)
			.then((res) => {
				console.log(res)
				setMessage('Registration succesful')
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
				Register Form
			</Typography>
			<TextField
				required
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				required
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				required
				label="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<TextField
				required
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
				color="warning"
				sx={{ mt: '1.5em' }}
				onClick={handleRegister}
			>
				Register
			</Button>
		</Box>
	)
}

export default RegisterModal
