
const users = {
	'test@zola.com': {
		'role': 'admin',
		'permissions': 'all',
		'password': 'zola#frontend'
	}
}

export default function(email) {
	return users[email];
}
