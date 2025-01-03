import { Anime } from "../interfaces/Anime";
import http from "./httpService";
// import config from "../config.json";
import { toast } from "react-toastify";

const apiEndpoint = "/manga-links";

function mangaLinkUrl(id : number | undefined) {
	return `${apiEndpoint}/${id}`;
}

export function save(values: Anime) {
	try {
		return http.post("/manga-links", values);
	} catch (error) {
		toast.error("Failed to save manga link");
		throw error;
	}
}

export function getMangaLinkById(id: number | undefined) {
	return http.get(`${apiEndpoint}/${id}`);
}

export function updateMangaLink(id: number | undefined, values: Anime) {
	try {
		return http.put(mangaLinkUrl(id), values);
	} catch (error) {
		toast.error("Failed to update manga link");
		throw error;
	}
}

export function deleteMangaLink(id: number | undefined) {
	try {
		return http.delete(mangaLinkUrl(id));
	} catch (error) {
		toast.error("Failed to delete manga link");
		throw error;
	}
}