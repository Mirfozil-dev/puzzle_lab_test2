<script setup lang="ts">
import { useMovieStore } from '../stores'
import { computed } from 'vue';
import type { MovieType } from '../types';
import Filters from '../components/Filters.vue'
import MovieCard from '../components/MovieCard.vue'

const movieStore = useMovieStore();
const filteredAndSortedMovies = computed<MovieType[]>(() => movieStore.filteredAndSortedMovies);

</script>

<template>
  <div>
    <header>
      <h1>Movies Collection</h1>
      <div>
        <router-link to="/add" class="button button-green">Add New Movie</router-link>
      </div>
    </header>
    
    <Filters />

    <MovieCard 
      v-for="movie in filteredAndSortedMovies" :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
