<template>
  <div class="home">
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="What are you looking for?" v-model="search" />
      <input type="submit" value="Search" />
    </form>

    <div v-if="movie" class="movie-details">
      <div class="feature-card">
        <img :src="movie.Poster" :alt="movie.Title + ' Poster'" class="featured-img" />
        <div class="detail">
          <h3>{{ movie.Title }}</h3>
          <p>{{ movie.Plot }}</p>
          <p><strong>Director:</strong> {{ movie.Director }}</p>
          <p><strong>Actors:</strong> {{ movie.Actors }}</p>
          <p><strong>Genre:</strong> {{ movie.Genre }}</p>
          <p><strong>Released:</strong> {{ movie.Released }}</p>
          <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
          <p><strong>Language:</strong> {{ movie.Language }}</p>
          <p><strong>Country:</strong> {{ movie.Country }}</p>
          <p><strong>Awards:</strong> {{ movie.Awards }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import env from '@/env.js';

const search = ref("");
const movie = ref(null);

const SearchMovies = () => {
  if (search.value !== "") {
    fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&t=${search.value}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Response === "True") {
          movie.value = data;
        } else {
          movie.value = null;
        }
        search.value = "";
      });
  }
};

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
}
</style>
