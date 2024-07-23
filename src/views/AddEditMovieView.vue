<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores';
import type { MovieType } from '../types';

const movieStore = useMovieStore();
const route = useRoute();
const router = useRouter();
const isEditMode = computed<boolean>(() => !!route.params.id);
const errorMessage = ref<string | null>(null);

const movie = ref<MovieType>({
    id: 0,
    title: '',
    year: null,
    genre: '',
    rating: null,
    description: '',
    imageUrl: ''
});

const handleSubmit = () => {
  if (validateMovie()) {
    if (isEditMode.value) {
      movieStore.updateMovie(movie.value);
    } else {
      movie.value.id = Date.now();
      movieStore.addMovie(movie.value);
    }
    router.push('/');
  }
};

const loadMovie = () => {
    if (isEditMode.value) {
    const existingMovie = movieStore.getMovieById(Number(route.params.id));
    if (existingMovie) {
        movie.value = { ...existingMovie };
    }
    }
};
const validateMovie = () => {
    if (!movie.value.title || !movie.value.genre || !movie.value.description || !movie.value.imageUrl) {
      errorMessage.value = 'All fields are required';
      return false;
    }
    if (movie.value.year && (movie.value.year < 1900 || movie.value.year > new Date().getFullYear())) {
      errorMessage.value = 'Year must be between 1900 and the current year';
      return false;
    }
    if (movie.value.rating && (movie.value.rating < 1 || movie.value.rating > 10)) {
      errorMessage.value = 'Rating must be between 1 and 10';
      return false;
    }
    errorMessage.value = null;
    return true;
};

onMounted(loadMovie);
</script>

<template>
  <div>
    <router-link to="/" class="button button-gray">Go back</router-link>
    <h1>{{ isEditMode ? 'Edit' : 'Add' }} Movie</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="movie.title" id="title" placeholder="Title" required />
      <input v-model="movie.year" id="year" type="number" placeholder="Year" required />
      <input v-model="movie.genre" id="genre" placeholder="Genre" required />
      <input v-model="movie.rating" id="rating" type="number" min="1" max="10" step="0.1" placeholder="Rating" required />
      <textarea v-model="movie.description" id="description" placeholder="Description"></textarea>
      <input v-model="movie.imageUrl" id="image" placeholder="Image URL" />
      <button class="button" type="submit">{{ isEditMode ? 'Update' : 'Add' }} Movie</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.error {
  color: red;
  margin-top: 10px;
}
</style>
