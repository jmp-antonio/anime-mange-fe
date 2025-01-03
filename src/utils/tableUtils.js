export function navigatePage(pageDetails, direction) {
	let { current_page, last_page } = pageDetails;
	switch (direction) {
		case "firstPage":
			current_page = 1;
			break;
		case "previousPage":
			current_page = current_page === 1 ? 1 : current_page - 1;
			break;
		case "nextPage":
			current_page =
				current_page === last_page ? last_page : current_page + 1;
			break;
		case "lastPage":
			current_page = last_page;
			break;

		default:
			break;
	}

	pageDetails.current_page = current_page;

	return pageDetails;
}
