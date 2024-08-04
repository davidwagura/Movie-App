<template>
  <div class="home">
    <div class="search-box">
      <form @submit.prevent="SearchMovies">
        <input
          type="text"
          v-model="search"
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="movies.length > 0" class="movies-list">
      <div v-for="movie in movies" :key="movie.imdbid" class="movie-card">
        <img :src="movie.imageurl[0]" alt="Movie Poster" class="movie-poster" v-if="movie.imageurl && movie.imageurl.length"/>
        <div class="movie-details">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-genres">{{ movie.genre.join(', ') }}</p>
          <p class="movie-release">Released: {{ movie.released }}</p>
          <p class="movie-synopsis">{{ movie.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const search = ref("");
const movies = ref([]);
const error = ref(null);
const loading = ref(false);

const SearchMovies = async () => {
  loading.value = true;
  error.value = null;
  movies.value = [];

  try {
    const response = await fetch(`https://ott-details.p.rapidapi.com/search?title=${search.value}&page=1`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e7494e734amshde50a14f5967d05p13138ejsn93c07c5317f8',
        'x-rapidapi-host': 'ott-details.p.rapidapi.com'
      }
    });

    const data = await response.json();
    if (data.results) {
      movies.value = data.results;
    } else {
      error.value = "No movies found.";
    }
  } catch (err) {
    error.value = "An error occurred while fetching the movie details.";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.home {
  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      width: 100%;
      max-width: 300px;
      padding: 10px 16px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 20px;

      &::placeholder {
        color: #7a7a7a;
      }

      &:focus {
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
      }
    }

    button {
      width: 100%;
      max-width: 300px;
      background-color: #42B883;
      padding: 16px;
      border-radius: 8px;
      color: #FFF;
      font-size: 20px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;

      &:active {
        background-color: #3B8070;
      }
    }
  }

  .loading,
  .error {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
  }

  .error {
    color: red;
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .movie-card {
    width: 300px;
    margin: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

    .movie-poster {
      width: 100%;
      height: auto;
    }

    .movie-details {
      padding: 16px;

      .movie-title {
        font-size: 24px;
        margin-bottom: 8px;
      }

      .movie-genres,
      .movie-release,
      .movie-synopsis {
        font-size: 16px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
