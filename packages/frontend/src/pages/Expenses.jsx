import { lazy } from 'react'

const ListOfExpenses = lazy(() => import('../components/ListOfExpenses'))

const Expenses = () => {
	return <ListOfExpenses />
}
export default Expenses
