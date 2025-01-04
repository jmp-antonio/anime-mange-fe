import { PageDetails } from "./PageDetails";

export interface AuthorPageDetails extends PageDetails {
    first_name: string | null,
    last_name: string | null,
}