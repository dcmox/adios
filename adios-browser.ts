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

	public static async all(promises: any[]): Promise<any> {
		for (let i = 0; i < promises.length; i++) {
			if (typeof promises[i] === 'string') {
				promises[i] = Adios.request({ url: promises[i] }, true)
			} else if (toString.call(promises[i]) !== '[object Promise]') {
				promises[i] = Adios.request(promises[i], true)
			}
		}

		return await Promise.all(promises).then(async (responses) => {
			const resp: any = []
			responses.forEach(async (response) => {
				resp.push(await response.json())
			})
			return resp
		})
	}
	public static async request(
		opts: IAdiosPostOptions,
		noAwait: boolean = false,
	): Promise<any> {
		// Set options
		const gOpts: any = Object.assign({}, OPTIONS_DEFAULT_GET, opts)

		const options: any = {
			body:
				typeof gOpts.data === 'object'
					? JSON.stringify(gOpts.data)
					: gOpts.data,
			cache: gOpts.cache || 'no-cache',
			headers: gOpts.headers,
			method: gOpts.method,
			mode: gOpts.mode,
			redirect: gOpts.redirect || 'follow',
			referrerPolicy: gOpts.referrerPolicy || 'no-referrer',
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

		if (gOpts.progress) {
			const fetchHandle = await fetch(gOpts.url || '', options)
			if (fetchHandle.body && fetchHandle.headers) {
				const reader = fetchHandle.body.getReader()
				console.log(fetchHandle)
				const contentLength =
					+fetchHandle.headers.get('Content-Length') || 'Unknown'
				let receivedLength = 0
				const chunks = []

				while (true) {
					const { done, value } = await reader.read()

					if (done) {
						gOpts.progress({
							bytes:
								contentLength === 'Unknown'
									? receivedLength
									: contentLength,
							chunkSize: 0,
							percent: 100,
							total:
								contentLength === 'Unknown'
									? receivedLength
									: contentLength,
						})
						clearTimeout(handle)
						break
					}

					chunks.push(value)
					receivedLength += value.length
					const percent =
						contentLength === 'Unknown'
							? 'Unknown'
							: Number(
									(
										(receivedLength / contentLength) *
										100
									).toFixed(2),
							  )
					gOpts.progress({
						bytes: receivedLength,
						chunkSize: value.length,
						percent,
						total: contentLength,
					})
				}
				const chunksAll = new Uint8Array(receivedLength)
				let position = 0
				for (const chunk of chunks) {
					chunksAll.set(chunk, position)
					position += chunk.length
				}
				return new TextDecoder('utf-8').decode(chunksAll)
			} else {
				//  Unhandled
			}
			return fetchHandle
		} else {
			if (noAwait) {
				return fetch(gOpts.url || '', options)
			}
			return await fetch(gOpts.url || '', options).then(
				(response: any) => {
					clearTimeout(handle)
					return response.json()
				},
			)
		}
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
