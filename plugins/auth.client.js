export default function({ $auth }) {
  // extend the plugin as you want
  if ($auth.loggedIn) {
    // eslint-disable-next-line
    console.log(`Hi ${$auth.user.name}!`)
  } else {
    // eslint-disable-next-line
    console.log('Not yet logged-in...')
  }

  $auth.onError((error, name, endpoint) => {
    console.error('Authentication error...', error, name, endpoint);
  })

  $auth.onRedirect((to, from) => {
    console.log('Redirecting...', to);
    // you can optionally change `to` by returning a new value
  })
}
