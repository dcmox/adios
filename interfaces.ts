export interface IKVPair {
	[key: string]: any
}

export interface IAdiosCredentials {
	username: string
	password: string
}

export interface IAdiosProxyOptions {
	host: string
	port: number
	auth?: IAdiosCredentials
}

export interface IProgressResult {
	bytes?: number
	chunkSize?: number
	total?: number
	percent?: number
}

export interface IAdiosPostOptions {
	id?: string // In case you wish to abort
	url?: string
	timeout?: number
	data?: IKVPair
	headers?: any
	method?: string
	port?: number
	host?: string
	path?: string
	proxy?: IAdiosProxyOptions
	agent?: any
	progress?: (progress: IProgressResult) => any
	signal?: any
}

export interface IAdiosGetOptions {
	timeout?: number
	headers?: any
	port?: number
	progress?: (progress: IProgressResult) => any
	signal?: any
	method?: 'get' | 'GET'
}
