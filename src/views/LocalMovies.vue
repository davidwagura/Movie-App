<template>

{{  movies }} 

</template>


<script>
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    import axios from 'axios'


    export default {
        setup() {

            const movies = ref([]);

            onMounted (() => {

                axios.get(`http://127.0.0.1:8000/api/movie`)
                    .then(response => {
                        movies.value = response.data;
                    });
                    
            })


            return { movies }
        }
    }

</script>
