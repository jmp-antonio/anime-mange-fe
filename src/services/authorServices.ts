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

// export function getAll(pageDetails : any) {
// 	const {
// 		current_page,
// 		per_page,
// 		sort_by,
// 		sort_direction,
// 		title,
// 		author,
// 	} = pageDetails;

// 	let url = `${apiEndpoint}?page=${current_page}&per_page=${per_page}&sort_by=${sort_by}&sort_direction=${sort_direction}`;

// 	if (title) url += `&title=${title}`;

// 	if (author) url += `&author=${author}`;

// 	return http.get(url);
// }