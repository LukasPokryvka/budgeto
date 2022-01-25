import { useState, Fragment } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

import Navigation from '../components/Navigation'
import NavigationRender from '../components/Navigation/NavigationRender'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9)
			}
		})
	}
}))

const lightTheme = createTheme()

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
})

const Dashboard = () => {
	const [open, setOpen] = useState(true)
	const [title, setTitle] = useState('Dashboard')
	const [darkMode, setDarkMode] = useState(false)
	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<BrowserRouter>
			<ThemeProvider theme={!darkMode ? lightTheme : darkTheme}>
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					<AppBar position="absolute" open={open}>
						<Toolbar
							sx={{
								pr: '24px' // keep right padding when drawer closed
							}}
						>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer}
								sx={{
									marginRight: '36px',
									...(open && { display: 'none' })
								}}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								component="h1"
								variant="h6"
								color="inherit"
								noWrap
								sx={{ flexGrow: 1 }}
							>
								{title}
							</Typography>
							<Button variant="contained" sx={{ mr: '1em' }} color="secondary">
								Login
							</Button>
							<Button variant="contained" color="warning">
								Register
							</Button>
						</Toolbar>
					</AppBar>
					<Drawer variant="permanent" open={open}>
						<Toolbar
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								px: [1]
							}}
						>
							<IconButton onClick={toggleDrawer}>
								<ChevronLeftIcon />
							</IconButton>
						</Toolbar>
						<Divider />
						<List>
							<Navigation setTitle={setTitle} />
						</List>

						{open && (
							<Fragment>
								<Divider />
								<List>
									<ListItem>
										<ListItemText primary="Dark mode" />
										<Switch onChange={() => setDarkMode(!darkMode)} />
									</ListItem>
								</List>
							</Fragment>
						)}
					</Drawer>
					<Box
						component="main"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.mode === 'light'
									? theme.palette.grey[100]
									: theme.palette.grey[900],
							flexGrow: 1,
							height: '100vh',
							overflow: 'auto'
						}}
					>
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 7 }}>
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={12}>
									<NavigationRender />
								</Grid>
							</Grid>
						</Container>
						<Toolbar />
					</Box>
				</Box>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default Dashboard
