interface IKVPair {
	[key: string]: any
}

interface IAdiosCredentials {
	username: string
	password: string
}

interface IAdiosProxyOptions {
	host: string
	port: number
	auth?: IAdiosCredentials
}

interface IProgressResult {
	bytes?: number
	chunkSize?: number
	total?: number
	percent?: number
}

interface IAdiosPostOptions {
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
}

interface IAdiosGetOptions {
	timeout?: number
	headers?: any
	port?: number
	progress?: (progress: IProgressResult) => any
}
