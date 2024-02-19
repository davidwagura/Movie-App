<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img src="https://imgs.search.brave.com/Fu1VJE00vliAmhVZj3soe1bCML2AQwaVb7OnMTWcLmA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFmSnZTRXNlc0wu/anBn" 
        alt="Naruto Poster" class="featured-img" />
        <div class="detail">
          <h3>Naruto</h3>
          <p>Naruto Uzumaki is the main character of the beloved Naruto series and he is a resident of the Hidden Leaf Village in the Land of Fire. </p>
        </div>
      </router-link>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box" name="search-form">
      <input type="text" placeholder="what are you looking for?" v-model="search"/>
      <input type="submit" value="Search">
    </form>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">
              {{ movie.type }}
            </div>
            <div class="detail">
              <p class="y">{{ movie.year }}</p>
              <h3>{{ movie.title }}</h3>
            </div>
          </div>
      </router-link> 
      </div>
    </div>
  </div>
</template>

<script>
  import  {ref} from 'vue';
  import env from '@/env.js'

  export default{
    setup () {
      const search = ref("");
      const movies = ref([]);

      const SearchMovies = () => {
        if (search.value != "") {

          fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=$(search.value)`)
            .then(response => response.json())
            .then(data => {
              movies.value = data.Search;
              search.value = "";

            });
        }
      }
      return {
        search,
        movies,
        SearchMovies
      }
    }
  }

</script>
 <style lang="scss">
  .home {

    .feature-card {
      position: relative;

      .featured-img {
        display: block;
        width: 100%;
        height: 300px;
        object-fit: cover;

        position: relative;
        z-index: 0;
      }

      .detail {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 16px;
        z-index: 1;

        h3 {
          color: #FFF;
          margin-bottom: 16px;
        }

        p {
          color: #FFF;
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
        color: #FFF;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3
        }
        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }
      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: rgb(57, 117, 57);
        padding: 16px;
        border-radius: 8px;
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  } 
}
</style>
