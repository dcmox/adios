import {
	IAdiosGetOptions,
	IAdiosPostOptions,
	IProgressResult,
} from './interfaces'

const { parseUri } = require('urlparser-simple')

const TIMEOUT_DEFAULT = 4000
const OPTIONS_DEFAULT_POST: IAdiosPostOptions = {
	data: {},
	headers: {},
	method: 'post',
	timeout: TIMEOUT_DEFAULT,
}
const OPTIONS_DEFAULT_GET: IAdiosGetOptions = {
	headers: {},
	timeout: TIMEOUT_DEFAULT,
}

export class Adios {
	public static interceptors: any = {
		delete: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.delete.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.delete[index] = null
			},
		},
		get: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.get.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.get[index] = null
			},
		},
		patch: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.patch.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.patch[index] = null
			},
		},
		post: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.post.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.post[index] = null
			},
		},
		put: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.put.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.put[index] = null
			},
		},
		request: {
			use(callback: (config: any) => any): number {
				return Adios._interceptors.request.push(callback)
			},
			remove(index: number): any {
				Adios._interceptors.request[index] = null
			},
		},
	}
	public static controllers: any = {
		abort: (id: string): boolean => {
			if (Adios.handles[id]) {
				Adios.handles[id].handle.abort()
				Adios.handles[id].resolve({ statusMessage: 'Aborted' })
				delete Adios.handles[id]
				return true
			}
			return false
		},
	}
	public static handles: any = {}
	public static async get(
		url: string,
		opts?: IAdiosGetOptions,
	): Promise<any> {
		// Assign options
		const gOpts = opts
			? Object.assign({ url }, OPTIONS_DEFAULT_GET, opts, { url })
			: Object.assign({ url }, OPTIONS_DEFAULT_GET, { url })
		// Set protocol
		const protocol =
			gOpts.url.toLowerCase().indexOf('https') === 0
				? require('https')
				: require('http')
		const port = gOpts.port
			? gOpts.port
			: gOpts.url.toLowerCase().indexOf('https') === 0
			? 443
			: 80
		if (!gOpts.port) {
			gOpts.port = port
		}
		// Run interceptors here, same in post
		if (Adios._interceptors.get.length) {
			Adios._interceptors.get
				.filter((cb: any) => cb)
				.forEach((cb: any) => {
					cb(gOpts)
				})
		}
		// Return promise
		return await new Promise((resolve, reject) => {
			protocol.get(url, gOpts, (res: any) => {
				Adios._handleResponse(
					res,
					resolve,
					reject,
					gOpts.progress || undefined,
				)
			})
		})
	}

	public static async put(
		url: string,
		opts: IAdiosPostOptions,
	): Promise<any> {
		const gOpts = Object.assign({ url }, opts, { method: 'PUT' })
		return Adios.request(gOpts)
	}
	public static async delete(
		url: string,
		opts: IAdiosPostOptions,
	): Promise<any> {
		const gOpts = Object.assign({ url }, opts, { method: 'DELETE' })
		return Adios.request(gOpts)
	}
	public static async patch(
		url: string,
		opts: IAdiosPostOptions,
	): Promise<any> {
		const gOpts = Object.assign({ url }, opts, { method: 'PATCH' })
		return Adios.request(gOpts)
	}

	public static async request(opts: IAdiosPostOptions): Promise<any> {
		// Set options
		const gOpts = Object.assign({}, OPTIONS_DEFAULT_GET, opts)

		const fragments = parseUri(opts.url)
		const scheme = fragments.scheme.toLowerCase()

		// Set protocol
		const protocol =
			scheme === 'https'
				? require('follow-redirects').https
				: require('follow-redirects').http

		// Set host/path based on proxy options
		if (gOpts.proxy) {
			if (scheme === 'https') {
				const HttpsProxyAgent = require('https-proxy-agent')
				const agent = new HttpsProxyAgent({
					host: gOpts.proxy.host,
					port: gOpts.proxy.port,
				})
				gOpts.agent = agent
			} else {
				gOpts.host = gOpts.proxy.host
				gOpts.port = gOpts.proxy.port
				gOpts.path = gOpts.url
			}
			if (gOpts.proxy.auth) {
				gOpts.headers['Proxy-Authorization'] = new Buffer(
					'Basic ' +
						`${gOpts.proxy.auth.username}:${gOpts.proxy.auth.password}`,
				).toString('base64')
			}
		} else {
			gOpts.host = fragments.host
			gOpts.path = '/' + fragments.path
		}

		// Set port
		const port = gOpts.port
			? gOpts.port
			: gOpts.url.toLowerCase().indexOf('https') === 0
			? 443
			: 80

		if (!gOpts.port) {
			gOpts.port = port
		}

		// Stringify data and add header
		let data: string = ''
		if (gOpts.data && Object.keys(gOpts.data).length) {
			data = JSON.stringify(gOpts.data)
			if (!gOpts.headers['Content-Length']) {
				gOpts.headers['Content-Length'] = data.length
			}
			if (!gOpts.headers['Content-type']) {
				gOpts.headers['Content-type'] = 'application/json'
			}
		}

		// Run interceptors here, same in post
		if (Adios._interceptors[gOpts.method || 'request'].length) {
			Adios._interceptors[gOpts.method || 'request']
				.filter((cb: any) => cb)
				.forEach((cb: any) => {
					cb(gOpts)
				})
		}

		// Return promise
		return await new Promise((resolve, reject) => {
			try {
				const handle = protocol.request(gOpts, (res: any) => {
					Adios._handleResponse(
						res,
						resolve,
						reject,
						gOpts.progress || undefined,
					)
				})
				if (gOpts.id) {
					Adios.handles[gOpts.id] = { handle, resolve }
				}
				if (data.length) {
					handle.write(data)
				}
				handle.end()
			} catch (e) {
				reject(e.toString())
			}
		})
	}

	public static async post(
		url: string,
		opts: IAdiosPostOptions,
	): Promise<any> {
		// Assign options
		const gOpts = opts
			? Object.assign({ url }, OPTIONS_DEFAULT_POST, opts)
			: Object.assign({ url }, OPTIONS_DEFAULT_POST)
		return Adios.request(gOpts)
	}

	private static _interceptors: any = {
		delete: [],
		get: [],
		patch: [],
		post: [],
		put: [],
		request: [],
	}

	private static _handleResponse(
		res: any,
		resolve: any,
		reject: any,
		progress?: (args: IProgressResult) => any,
	): any {
		const { headers, statusCode, statusMessage } = res

		// Handle bad status codes
		if (statusCode >= 400) {
			res.resume()
			reject({ headers, statusCode, statusMessage })
			return
		}

		// For progress monitoring
		const len = Number(res.headers['content-length'])

		// Handle our response
		res.setEncoding('utf8')
		let rawData = ''
		res.on('data', (chunk: string) => {
			rawData += chunk
			// If progress callback
			if (progress) {
				progress({
					bytes: rawData.length,
					chunkSize: chunk.length,
					percent: Number(((rawData.length / len) * 100).toFixed(2)),
					total: len,
				})
			}
		})

		// Attempt to resolve and clear timeout
		res.on('end', () => {
			if (progress) {
				progress({
					bytes: len,
					chunkSize: 0,
					percent: 100,
					total: len,
				})
			}
			try {
				const parsedData = Adios._parse(rawData)
				resolve(parsedData)
			} catch (e) {
				reject(e.message)
			}
		})
	}
	private static _parse(s: string): string {
		if (s.trim().search(/^(\[|\{){1}/) > -1) {
			try {
				const tmp = JSON.parse(s)
				return tmp
			} catch (e) {
				return s
			}
		}
		return s
	}
}
