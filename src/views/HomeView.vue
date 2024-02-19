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
        <form action="@submit.prevent" class="search-box"></form>

        <input type="text" placeholder="what are you looking for?">
        <input type="text" value="search">
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
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
  }
</style>
