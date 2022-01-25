import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'

import routes from '../../router/routes'

const Navigation = ({ setTitle }) => (
	<div>
		{routes.map((route) => (
			<Link
				to={route.path}
				onClick={() => setTitle(route.title)}
				key={route.title}
				style={{ color: 'inherit', textDecoration: 'inherit' }}
			>
				<ListItem button>
					<ListItemIcon>{route.icon}</ListItemIcon>
					<ListItemText primary={route.title} />
				</ListItem>
			</Link>
		))}
	</div>
)

export default Navigation
