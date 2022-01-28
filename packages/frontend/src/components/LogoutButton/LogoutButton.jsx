import Button from '@mui/material/Button'

import { resetUserSession } from '../../services/AuthService'
import history from '../../router/history'

const LogoutButton = ({ setIsAuthenticated }) => {
	const logout = () => {
		resetUserSession()
		setIsAuthenticated(false)
		history.push('/')
	}

	return (
		<Button variant="contained" color="secondary" onClick={logout}>
			Logout
		</Button>
	)
}

export default LogoutButton
