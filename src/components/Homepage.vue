<script>
import axios from 'axios';


export default {
  data() {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0',
      allPokemons: [],
      pokemonsPerPage: 20,
      currentPage: 1,
      searchTerm: ''
    }
  },
  computed: {
    visiblePokemons() {
      const startIndex = (this.currentPage - 1) * this.pokemonsPerPage;
      const endIndex = startIndex + this.pokemonsPerPage;
      return this.allPokemons.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.allPokemons.length / this.pokemonsPerPage);
    }
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    async fetchData() {
      try {
        const response = await axios.get(this.apiUrl);
        this.allPokemons = response.data.results;
      } catch (error) {
        console.error('Errore nella richiesta:', error);
      }
    },
    getPokemonImage(url) {
      try {
        const pokemonId = url.split('/').slice(-2, -1)[0];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        return imageUrl;
      } catch (error) {
        console.error('Errore nel recupero dell\'immagine:', error);
        return ''; // Restituisce una stringa vuota se non riesce a recuperare l'immagine
      }
    },
    getImageUrl(url) {
      const imageUrl = this.getPokemonImage(url);
      return imageUrl;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
  },
created() {
  this.fetchData();
}
};

</script>

<template>

  <main class="container">
    <div class="pokemon">
      <div class="pokemon-card" v-for="(pokemon, index) in visiblePokemons" :key="index">
        <div class="card_body">
          <img class="img-fluid" :src="getImageUrl(pokemon.url)" alt="">
          <h4>{{ pokemon.name }}</h4>
          <div class="pokemon-number">
            <small>N°{{ pokemon.url.split('/').slice(-2, -1)[0] }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-btn">
        <button class="btn btn-danger" @click="previousPage()" :disabled="currentPage === 1">Pagina Precedente</button>
        <button class="btn btn-danger" @click="nextPage()" :disabled="currentPage === totalPages">Pagina Successiva</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  color: black;
  margin-top: 150px;
  margin-bottom: 50px;
  font-family: "PT Sans", sans-serif;
}

.pokemon {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
}

@keyframes cardAnimation {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  30% {
    transform: matrix(1, 0, 0, 1, 0, -1);
  }
  50% {
    transform: matrix(1, 0, 0, 1, 0, -3);
  }
  75%{
    transform: matrix(1, 0, 0, 1, 0, -2);
  }
  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }

}

.pokemon-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png);
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  &:hover{
    animation: cardAnimation 0.2s linear;
    cursor: pointer;
  }

  h4 {
    text-transform: capitalize;
  }
}


.card_img {
  width: 120px;
  height: 80px;
}


.card_body{
  position: relative;
}

.pokemon-number{
  position: absolute;
  right: -60px;
  top: -7px;
  font-weight: bold;
  color: #919191;
}

.pagination-btn{
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  gap: 20px;
  button{
    padding: 5px 10px;
    border-radius: 10px;
  }
}

</style>
