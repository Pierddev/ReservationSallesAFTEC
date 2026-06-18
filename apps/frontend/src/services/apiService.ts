import axios from "axios";

// Create axios instance
const api = axios.create({
	// baseURL define the base URL for all requests
	baseURL: "/api",
	withCredentials: true,
	// default header to allow the back end to know that we're sending JSON
	headers: {
		"Content-Type": "application/json",
	},
});

// Response interceptor -- to handle the responses from the backend
api.interceptors.response.use(
	// If response is successful (2XX), return the data (response)
	(response) => response,

	// If response is error (4XX or 5XX), handle it here
	(error) => {
		// If error.response => resposne receivend (status code ex: 401 or 400)
		// If error.request => no response was received from server (ex: server is down, CORS issues, request timeout)
		if (error.response) {
			// Backend send error response, transferr error to the component
			return Promise.reject(error.response.data);
		} else if (error.request) {
			// No response was received from server
			return Promise.reject({
				message: "API is unreachable (server down or CORS)",
			});
		}
		// For other cases
		return Promise.reject(error);
	},
);

// Export the instance for using it in components
export default api;
