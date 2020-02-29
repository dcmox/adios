const Adios = require('../adios')
import assert from 'assert'

describe('Adios test suite', () => {
	it('should make a GET request and log progress', async () => {
		Adios.interceptors.post.use((cfg: any) => console.log(cfg))
		await Adios.get(
			'https://www.google.com/logos/doodles/2020/sir-john-tenniels-200th-birthday-6753651837108300.5-l.png',
			{
				progress: ({
					bytes,
					chunkSize,
					total,
					percent,
				}: {
					bytes: number
					chunkSize: number
					total: number
					percent: number
				}) => console.log(bytes, chunkSize, total, percent),
			},
		)
			.then((response: any) => {
				console.log('Done!')
				// console.log(response)
			})
			.catch((err: any) => console.log(err))
	})
})

// Adios.post('https://reqres.in/api/users', {
// 	data: {
// 		name: 'John Doe',
// 	},
// 	id: 'test',
// 	port: 443,
// 	proxy: {
// 		host: '134.73.238.2',
// 		// 107.155.152.10
// 		port: 3128, // 8080
// 	},
// 	timeout: 30000,
// })
// 	.then((response) => console.log('post resp', response))
// 	.catch((err) => console.log('err post', err))
