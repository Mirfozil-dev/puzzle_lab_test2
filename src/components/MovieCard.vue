<script setup lang="ts">
import type { MovieType } from '../types';
import { defineProps } from 'vue';

defineProps({
    movie: {
        type: Object as () => MovieType,
        required: true
    }
})
</script>

<template>
    <div class="movie-card">
        <img :src="movie.imageUrl" :alt="movie.title">
        <div>
            <h2 class="truncate-ellipsis">{{ movie.title }}</h2>
            <p>Year: {{ movie.year }}</p>
            <p>Rating: {{ movie.rating }}</p>
            <router-link :to="`/movie/${movie.id}`" class="button">View Details</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.truncate-ellipsis {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    max-width: 100%;
}
</style>