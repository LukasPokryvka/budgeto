import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import routes from '../../../router/routes'
import { getToken } from '../../../services/AuthService'

const NavigationRender = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{routes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						exact
						element={getToken() ? <route.component /> : <div>Login please</div>}
					></Route>
				))}
			</Routes>
		</Suspense>
	)
}

export default NavigationRender
