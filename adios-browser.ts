import { IAdiosGetOptions, IAdiosPostOptions } from './interfaces'

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

export default class Adios {
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

		gOpts.method = 'get'
		gOpts.url = url
		return Adios.request(gOpts)
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
		const gOpts: any = Object.assign({}, OPTIONS_DEFAULT_GET, opts)

		const options: any = {
			body:
				typeof gOpts.data === 'object'
					? JSON.stringify(gOpts.data)
					: gOpts.data,
			cache: 'no-cache' || gOpts.cache,
			credentials: 'same-origin',
			headers: gOpts.headers,
			method: gOpts.method,
			mode: 'cors' || gOpts.mode,
			redirect: 'follow' || gOpts.redirect,
			referrerPolicy: 'no-referrer' || gOpts.referrerPolicy,
		}

		if (gOpts.credentials) {
			options.credentials = gOpts.credentials
		}

		// Run interceptors here, same in post
		if (Adios._interceptors[gOpts.method || 'request'].length) {
			Adios._interceptors[gOpts.method || 'request']
				.filter((cb: any) => cb)
				.forEach((cb: any) => {
					cb(options)
				})
		}

		let handle: any
		if (gOpts.timeout) {
			const ac = new AbortController()
			gOpts.signal = ac.signal
			handle = setTimeout(() => ac.abort(), gOpts.timeout)
		}
		return await fetch(gOpts.url || '', options).then((response: any) => {
			clearTimeout(handle)
			return response.json()
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
}
