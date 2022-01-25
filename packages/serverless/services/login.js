const AWS = require('aws-sdk')
const util = require('../utils/util')
const bcrypt = require('bcryptjs')
AWS.config.update({
	region: 'eu-central-1'
})
const dynamodb = new AWS.DynamoDB.DocumentClient()
const userTable = 'budgeto-users'
const auth = require('../utils/auth')

async function login(user) {
	const username = user.username
	const password = user.password

	if (!user || !username || !password) {
		return util.buildResponse(401, {
			message: 'username and password are required'
		})
	}

	const dynamoUser = await getUser(username.toLowerCase().trim())
	if (!dynamoUser || !dynamoUser.username) {
		return util.buildResponse(403, {
			message: 'user doesnt exist'
		})
	}

	if (!bcrypt.compareSync(password, dynamoUser.password)) {
		return util.buildResponse(403, {
			message: 'password is incorrect'
		})
	}

	const userInfo = {
		username: dynamoUser.username,
		name: dynamoUser.name
	}

	const token = auth.generateToken(userInfo)
	const response = {
		user: userInfo,
		token: token
	}
	return util.buildResponse(200, response)
}

async function getUser(username) {
	const params = {
		TableName: userTable,
		Key: {
			username: username
		}
	}

	return await dynamodb
		.get(params)
		.promise()
		.then(
			(res) => {
				return res.Item
			},
			(error) => {
				console.error('There is an error getting user: ', error)
			}
		)
}

module.exports.login = login