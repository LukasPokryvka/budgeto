import axios from 'axios'

const api = axios.create({
	baseURL: 'https://fdo4ssn9o1.execute-api.eu-central-1.amazonaws.com/dev',
	headers: {
		'x-api-key': 'EoQCBsmSrz4nz75Tx3O2h1S9mCU3gasP7IpnASxn'
	}
})

export default api
