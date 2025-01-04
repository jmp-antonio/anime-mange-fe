import { Author } from "../interfaces/Author";
import http from "./httpService";
// import config from "../config.json";
import { toast } from "react-toastify";

const apiEndpoint = "/authors";

function authorUrl(id : number) {
	return `${apiEndpoint}/${id}`;
}

export function getOptions() {
    return http.get(`${apiEndpoint}/get-options`);
}

export function getAll(pageDetails : any) {
	const {
		current_page,
		per_page,
		sort_by,
		sort_direction,
		first_name,
		last_name,
	} = pageDetails;

	let url = `${apiEndpoint}?page=${current_page}&per_page=${per_page}&sort_by=${sort_by}&sort_direction=${sort_direction}`;

	if (first_name) url += `&first_name=${first_name}`;

	if (last_name) url += `&last_name=${last_name}`;

	return http.get(url);
}

export function save(values: Author) {
	try {
		return http.post("/authors", values);
	} catch (error) {
		toast.error("Failed to save author");
		throw error;
	}
}