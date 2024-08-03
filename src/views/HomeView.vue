<template>
  <div class="home">
    <div class="search-box">
      <input
        type="text"
        v-model="search"
        placeholder="Search for a movie..."
        @click="SearchMovies"
      />
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="movie" class="movie-card">
      <img :src="movie.imageurl[0]" alt="Movie Poster" class="movie-poster"/>
      <div class="movie-details">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-genres">{{ movie.genre.join(', ') }}</p>
        <p class="movie-release">Released: {{ movie.released }}</p>
        <p class="movie-rating">IMDB Rating: {{ movie.imdbrating }}</p>
        <p class="movie-synopsis">{{ movie.synopsis }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
// import env from '@/env.js';

const search = ref("");
const movie = ref(null);
const error = ref(null);
const loading = ref(false);

// Function to debounce the search input
// const debounce = (func, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };

const SearchMovies = async () => {
  if (search.value.trim() === "") return;

  loading.value = true;
  error.value = null;
  movie.value = null;

  try {
    const response = await fetch(`https://ott-details.p.rapidapi.com/${search.value.trim()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-ua': 'RapidAPI-Playground',
        'x-rapidapi-key': 'e7494e734amshde50a14f5967d05p13138ejsn93c07c5317f8',
        'x-rapidapi-host': 'ott-details.p.rapidapi.com'
      }
    });

    console.log(response);
    
    const data = await response.json();
    if (data.Response === "True") {
      movie.value = data;
    } else {
      error.value = data.Error;
    }
  } catch (err) {
    error.value = "An error occurred while fetching the movie details.";
  } finally {
    loading.value = false;
    search.value = "";
  }
};

// Debounce the search function to avoid too many API calls
// const debounceSearch = debounce(SearchMovies, 300);

// Watch for changes in the search input and trigger debounced search
watch(search);
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;
    margin-top: 20px;

    .featured-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .detail {
      padding: 16px;

      h3 {
        color: #000;
        margin-bottom: 16px;
      }

      p {
        color: #090909;
      }

      strong {
        color: #000;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #000;
        background-color: #d3d3d3;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #7a7a7a;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42B883;
        padding: 16px;
        border-radius: 8px;
        color: #FFF;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3B8070;
        }
      }
    }
  }

  .loading {
    text-align: center;
    font-size: 20px;
    color: #42B883;
    margin-top: 20px;
  }

  .error {
    text-align: center;
    font-size: 20px;
    color: red;
    margin-top: 20px;
  }
}
</style>