import queryString from 'query-string'

export const API_URL = 'https://api.themoviedb.org/3'

export const API_KEY_3 = '4c9f08e5b5ff371dd393a903cc6febd7'

export const API_KEY_4 =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzlmMDhlNWI1ZmYzNzFkZDM5M2E5MDNjYzZmZWJkNyIsInN1YiI6IjVkMDFlYTNkYzNhMzY4NjIzMDIzOTMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BaMdakxdMQyuEGXCffBmzp_OaFI5IUJlY6uhqppzEtA'

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => {
        resolve(data)
        // console.log(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error)
          // console.log('error', error);
        })
      })
  })
}

export default class CallApi {
  static get (url, options = {}) {
    const { params = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
  }

  static post (url, options = {}) {
    const { params = {}, body = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
  }

  static delete (url, options = {}) {
    const { params = {}, body = {} } = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
  }
}
