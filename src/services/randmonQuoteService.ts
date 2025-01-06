import axios from "axios";
import http from "./httpService";

export function getRandomQuote() {
    return fetch(`/api/v1/quotes/random`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		});
}