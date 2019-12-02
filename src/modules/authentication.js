export function isLoggedIn() {
  const auth = JSON.parse(localStorage.getItem('WevolverAuth'))
  return auth && auth.user ? auth.user : false
}