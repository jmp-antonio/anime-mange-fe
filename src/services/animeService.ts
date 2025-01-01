import { Anime } from "../interfaces/Anime";
import http from "./httpService";
// import config from "../config.json";
import { toast } from "react-toastify";

const apiEndpoint = "/animes";

function animeUrl(id : number | undefined) {
	return `${apiEndpoint}/${id}`;
}

export function getAll(pageDetails : any) {
	const {
		current_page,
		per_page,
		sort_by,
		sort_direction,
		title,
		author,
	} = pageDetails;

	let url = `${apiEndpoint}?page=${current_page}&per_page=${per_page}&sort_by=${sort_by}&sort_direction=${sort_direction}`;

	if (title) url += `&title=${title}`;

	if (author) url += `&author=${author}`;

	return http.get(url);
}

export function save(values: Anime) {
	try {
		return http.post("/animes", values);
	} catch (error) {
		toast.error("Failed to save anime");
		throw error;
	}
}

export function getById(id: number | undefined) {
	return http.get(`${apiEndpoint}/${id}`);
}

export function update(id: number | undefined, values: Anime) {
	try {
		return http.put(animeUrl(id), values);
	} catch (error) {
		toast.error("Failed to update anime");
		throw error;
	}
}

export function deleteAnime(id: number | undefined) {
	try {
		return http.delete(animeUrl(id));
	} catch (error) {
		toast.error("Failed to delete anime");
		throw error;
	}
}