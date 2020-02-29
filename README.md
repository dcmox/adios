# Adios

A replacement for Axios using Node HTTP/HTTPS modules and native Fetch API. Still an early work in progress.

## Usage

```typescript
Adios.interceptors.get.use((cfg: any) => console.log(cfg)) // Interceptor, is called before a request is made. Can be used to adjust config or add logging
Adios.get('https://pokeapi.co/api/v2/pokemon/ditto') // Simple get request
	.then((response) => {
		// Response is automatically parsed as JSON
		console.log(response)
	})
	.catch((err) => console.log(err))
```

## Todo

-   Make a client side version of this as well using Native Fetch API
-   Make the requests fully abortable
-   Add ability for multiple proxies.
-   Add ability for multiple requests in parallel.
