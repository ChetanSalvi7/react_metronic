import Swal from 'sweetalert2'

export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {access_token, user},
      } = store.getState()
      config.baseURL = process.env.REACT_APP_API_BASE_URL;
      config.headers.request_from = 'web'
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
        if (user) {
          config.headers.user_id = user.id
        }
      }

      return config
    },
    (err: any) => Promise.reject(err),
  )

  axios.interceptors.response.use((response: any) => {
      return response
    }, (error: any) => {
      return new Promise((resolve, reject) => {
        if (error.config && !error.config._retry) {
          switch (error.response?.status) {
            case 401:
              window.location.href = '/logout'
              break
            case 500:
            case 501:
            case 502:
              // @ts-ignore
              Swal.fire({
                title: 'Warning!',
                html: 'Server is not reachable',
                icon: 'warning',
                allowOutsideClick: false,
                buttons: {
                  confirm: {
                    text: 'Re-Try',
                    value: true,
                    visible: true,
                    className: '',
                    closeModal: true,
                  },
                },
              }).then(() => {
                window.location.reload()
              })
              break

            default:
              break
          }
        }
        return reject(error)
      })
    },
  )
}
