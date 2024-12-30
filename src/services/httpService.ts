import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getToastifyTheme } from "../utils/common";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error: AxiosError) => {
	const expectedError =
		error.response &&
		(error.response.status >= 400) && (error.response.status <= 500);

	if (!expectedError) {
		toast.error("An expected error occurred");
	}

	return Promise.reject(error);
});

export function getErrors({ response }: { response: any }) {
	const { message } = response;
	toast.error(message, getToastifyTheme());
	return response;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};
