export interface Quote {
    content: string;
    anime: {
        id: number;
        name: string;
        altName: string;
    };
    character: {
        id: number;
        name: string;
    };
}