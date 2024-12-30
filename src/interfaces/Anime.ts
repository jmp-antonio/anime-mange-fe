import { Author } from "./Author";
import { MangaLink } from "./MangaLink";

export interface Anime {
    id: number;
    title: string;
    author_id: number;
    author: Author;
    manga_links: MangaLink[];
}