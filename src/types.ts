export type MovieType = {
    id: number;
    title: string;
    year: number| null;
    genre: string;
    rating: number | null;
    description: string;
    imageUrl: string;
}

export type MovieStateType = {
    movies: MovieType[];
}