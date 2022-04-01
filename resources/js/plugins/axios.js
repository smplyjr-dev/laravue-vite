let init = axios;

init.defaults.baseURL = window.$APP.BASE_URL + "/api";

// Request interceptor for authorization token
init.interceptors.request.use((request) => {
  const token = 1;

  if (token) {
    request.headers.common["Accept"] = `application/json`;
    request.headers.common["Authorization"] = `Bearer ${token}`;
    request.headers.common["Content-Type"] = `application/json`;
  }

  return request;
});

// Response interceptor for failed ajax request
init.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    if (status >= 500) {
      alert("Something from the background went wrong! Please contact the system administrator immediately.");
    }

    if (status === 401 && 1) {
      alert("Unauthenticated.");

      // display the modal
      // App.methods.showUnauthModal();
    }

    return Promise.reject(error);
  }
);

window.axios = init;
