<script setup lang="ts">
import { useMovieStore } from '../stores';  

const movieStore = useMovieStore();

</script>

<template>
    <div class="filters">
        <div class="filter-group">
            <label for="filter">Filter by title:</label>
            <input v-model="movieStore.filter" id="filter" placeholder="Enter title" />
        </div>
        <div class="filter-group">
            <label for="sortBy">Sort by:</label>
            <select v-model="movieStore.sortBy" id="sortBy">
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="sortOrder">Sort order:</label>
            <select v-model="movieStore.sortOrder" id="sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </div>
</template>