import CallApi from '../api/api'

function getFavorites (user, queryStringParams) {
  return CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: queryStringParams
  })
}

function getWatchList (user, queryStringParams) {
  return CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: queryStringParams
  })
}

export { getFavorites, getWatchList }
