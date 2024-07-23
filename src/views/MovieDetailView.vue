<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores';
import type { MovieType } from '../types';

const movieStore = useMovieStore();
const route = useRoute();
const router = useRouter();

const movie = computed<MovieType | undefined>(() => movieStore.getMovieById(Number(route.params.id)));

const deleteMovie = (id: number) => {
  if (confirm('Are you sure you want to delete this movie?')) {
    movieStore.deleteMovie(id);
    router.push('/');
  }
};
</script>

<template>
  <div v-if="movie">
    <router-link to="/" class="button button-gray">Go back</router-link>
    <h1>{{ movie.title }}</h1>
    <p>Release year: {{ movie.year }}</p>
    <p>Film genre: {{ movie.genre }}</p>
    <p>Rating: {{ movie.rating }}</p>
    <p>Description: <br />{{ movie.description }}</p>
    <img :src="movie.imageUrl" alt="Movie Image" />
    <div class="actions">
      <router-link :to="`/edit/${movie.id}`" class="button">Edit</router-link>
      <button @click="deleteMovie(movie.id)" class="button button-red">Delete</button>
    </div>  
  </div>
</template>

<style scoped lang="scss">

.actions {
  width: 100%;
  display: flex;
  gap: 10px;
}

img {
  width: 300px;
  height: 300px;
  object-fit: contain;
}
</style>
