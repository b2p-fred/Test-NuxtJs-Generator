export default function ({$axios, $config, redirect}) {
  // Update request headers
  $axios.setHeader('Content-Type', 'application/json');
  // fixme: including application name and version, and something else ?
  $axios.setHeader('X-User-Agent', `${$config.APP_NAME}_${$config.APP_VERSION}`);

  $axios.onRequest(request => {
    console.log(`[axios] requesting ${request.method} ${request.url}...`)
  })

  $axios.onError((error, request) => {
    const code = parseInt(error.response && error.response.status)
    console.error(`[axios] HTTP error code: ${code}`)
    if (code === 500) {
      redirect('/login')
    }
    // if (code === 404) {
    //   const p = new Promise(function(p1: (value: (PromiseLike<T> | T)) => void,p2: (reason?: any) => void){});
    //   return p.resolve({ id: 1, code: 404 });
    // }
  })
}
