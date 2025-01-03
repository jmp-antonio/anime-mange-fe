import { PageDetails } from "./PageDetails";

export interface AnimePageDetails extends PageDetails {
    title: string | null,
    author: string | null,
}