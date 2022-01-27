import { lazy } from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard'
import PaymentsIcon from '@mui/icons-material/Payments'
import PersonIcon from '@mui/icons-material/Person'

const routes = [
	{
		path: '/',
		component: lazy(() => import('../pages/Expenses')),
		title: 'Dashboard',
		icon: <DashboardIcon />
	},
	{
		path: '/edit-expense',
		component: lazy(() => import('../pages/EditExpense')),
		title: 'Edit Expense',
		icon: <PaymentsIcon />
	},
	{
		path: '/user',
		component: lazy(() => import('../pages/User')),
		title: 'User',
		icon: <PersonIcon />
	}
]

export default routes
