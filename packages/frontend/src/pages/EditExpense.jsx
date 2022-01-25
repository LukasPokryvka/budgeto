import { lazy } from 'react'

const AddExpense = lazy(() => import('../components/AddExpense'))

const EditExpense = () => <AddExpense />

export default EditExpense
