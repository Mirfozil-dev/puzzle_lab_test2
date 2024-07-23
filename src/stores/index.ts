import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { MovieType } from '../types';

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<MovieType[]>([
    {
        id: 1,
        title: 'Inception',
        year: 2010,
        genre: 'Sci-Fi',
        rating: 8.8,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:500/1*WqEQPJE5BUGRvDMuL4OWtw.jpeg'
      },
      {
        id: 2,
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'Drama',
        rating: 9.3,
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        imageUrl: 'https://magarticles.magzter.com/articles/4560/550237/5fa54c3258f6a/The-Shawshank-Redemption.jpg'
      },
      {
        id: 3,
        title: 'The Godfather',
        year: 1972,
        genre: 'Crime',
        rating: 9.2,
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        imageUrl: 'https://www.wonderwall.com/wp-content/uploads/sites/2/2022/03/shutterstock_editorial_4421089a.jpg?h=800'
      },
      {
        id: 4,
        title: 'The Dark Knight',
        year: 2008,
        genre: 'Action',
        rating: 9.0,
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Darkknight_cd.jpg/220px-Darkknight_cd.jpg'
      },
      {
        id: 5,
        title: 'Pulp Fiction',
        year: 1994,
        genre: 'Crime',
        rating: 8.9,
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        imageUrl: 'https://feeet2.sakura.ne.jp/upload/upload/2022-0229-453.jpg'
      }
]);

  const addMovie = (movie: MovieType) => {
    movies.value.push(movie);
  };

  const updateMovie = (updatedMovie: MovieType) => {
    const index = movies.value.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies.value[index] = updatedMovie;
    }
  };

  const deleteMovie = (id: number) => {
    movies.value = movies.value.filter(movie => movie.id !== id);
  };

  const getMovieById = (id: number) => {
    return movies.value.find(movie => movie.id === id);
  };

  const filter = ref<string>('');
  const sortBy = ref<'title' | 'year' | 'rating'>('title');
  const sortOrder = ref<'asc' | 'desc'>('asc');

  const filteredAndSortedMovies = computed(() => {
    let result = movies.value.filter(movie =>
      movie.title?.toLowerCase().includes(filter.value.toLowerCase())
    );
  
    result = result.sort((a, b) => {
      const aValue = a[sortBy.value] ?? '';
      const bValue = b[sortBy.value] ?? '';
  
      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  
    return result;
  });

  return {
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    filter,
    sortBy,
    sortOrder,
    filteredAndSortedMovies,
  };
});
