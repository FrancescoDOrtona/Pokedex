<template>
  <section v-if="pokemon" class="pokedex-container">
    <div class="pokemon-card">
      <h2 class="pokemon-name">{{ pokemon.name }} <span class="pokemon-order">N° {{ pokemon.order }}</span></h2>
      <div class="pokemon-image-container">
        <img :src="pokemon.sprites.front_default" class="pokemon-image" alt="Pokemon Image">
      </div>
      <div class="pokemon-details">
        <div class="pokemon-details_container">
          <div class="pokemon-type">
            <h6 class="fw-bold">Tipo</h6>
              <div v-for="(type, index) in pokemon.types" :key="index">
                <p>{{ type.type.name }}</p>
              </div>
          </div>
          <div class="pokemon-info">
            <ul>
              <li class="info">
                <div>
                  <h6 class="fw-bold">Peso</h6>
                  <p>{{ pokemon.weight }}</p>
                </div>
                <div>
                  <h6 class="fw-bold">Altezza</h6>
                  <p>{{ pokemon.height }}</p>
                </div>
                <div>
                  <h6 class="fw-bold">Exp. base</h6>
                  <p>{{ pokemon.base_experience}}</p>
                </div>
                <div>
                  <h6 class="fw-bold">Sesso</h6>
                  <span class="me-3 gender-f"><i class="fa-solid fa-venus"></i></span>
                  <span class="gender-m"><i class="fa-solid fa-mars"></i></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="pokemon-stats">
          <h6 class="text-white fw-bold">Statistiche</h6>
          <ul>
            <li class="stats p-1" v-for="(stat, index) in pokemon.stats" :key="index">
              {{ stat.stat.name }}: {{ stat.base_stat }}
              <div class="stat-bar">
                <div class="stat-bar-fill" :style="{ width: stat.base_stat > 100 ? '100%' : stat.base_stat + '%' }"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="error" v-else>
    <p >Nessun Pokémon trovato</p>
    <img src="../../public/pika-question.png" alt="">
    {{ searchTerm }}
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemon: null,
    };
  },
  methods: {
    async fetchData(searchTerm) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        this.pokemon = response.data;
      } catch (error) {
        console.error('Errore nella richiesta:', error);
      }
    },
    searchPokemon() {
      // Controlla se è stato inserito un termine di ricerca valido
      if (this.$route.params.searchTerm) {
        // Esegue la funzione fetchData con il termine di ricerca attuale
        this.fetchData(this.$route.params.searchTerm);
      }
    }
  },
  created() {
    // Esegue la ricerca iniziale al caricamento del componente
    this.searchPokemon();
  },
  // Aggiungiamo il watch per il cambiamento del parametro di ricerca nell'URL
  watch: {
    '$route.params.searchTerm'(newSearchTerm) {
      // Esegui la ricerca quando il termine di ricerca cambia
      this.searchPokemon();
    }
  }
};
</script>

  
<style lang="scss" scoped>
section {
  color: currentColor;
  margin-top: 125px;
}

ul, ol, menu{
  list-style: none;
  padding: 0;
  margin: 0;
}

.error{
  margin: 190px;
  text-align: center;
  font-size: 30px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  img{
    width: 90px;
  }
}

.pokedex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "PT Sans", sans-serif;
}

.pokemon-card {
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 20px;
  width: 600px;
}

.pokemon-name {
  text-align: center;
  text-transform: capitalize;
}

.pokemon-image-container {
  display: flex;
  justify-content: center;
}

.pokemon-image {
  width: 150px;
  height: 150px;
}

.pokemon-details {
  margin-top: 5px;
}

.pokemon-details_container{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
}

.pokemon-type {
  margin-bottom: 10px;
  text-transform: capitalize;
  padding: 20px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png);
  border-radius: 10px;
  color: white;
  position: relative;
  &::before{
    content: ' ';
    background: url(https://assets.pokemon.com/static2/_ui/img/chrome/dog-ears/default-dog-ear.png) no-repeat 0 0;
    height: 2em;
    position: absolute;
    width: 2em;
    z-index: 3;
    left: -1px;
    bottom: -1px;
    transform: rotate(-90deg);
    backface-visibility: hidden;
  }
}

.pokemon-info{
  margin-bottom: 10px;
  text-transform: capitalize;
  padding: 20px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png);
  border-radius: 10px;
  color: white;
  position: relative;
  &::before{
    content: ' ';
    background: url(https://assets.pokemon.com/static2/_ui/img/chrome/dog-ears/default-dog-ear.png) no-repeat 0 0;
    height: 2em;
    position: absolute;
    width: 2em;
    z-index: 3;
    left: -1px;
    bottom: -1px;
    transform: rotate(-90deg);
    backface-visibility: hidden;
  }
}

.info{
  display: grid;
  grid-template-columns: repeat(2,1fr);
}

.pokemon-stats {
  margin-top: 10px;
  text-transform: capitalize;
  padding: 20px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png);
  border-radius: 5px;
  position: relative;
  &::before{
    content: ' ';
    background: url(https://assets.pokemon.com/static2/_ui/img/chrome/dog-ears/default-dog-ear.png) no-repeat 0 0;
    height: 2em;
    position: absolute;
    width: 2em;
    z-index: 3;
    left: -1px;
    bottom: -1px;
    transform: rotate(-90deg);
    backface-visibility: hidden;
  }
}

.pokemon-order{
  font-weight: bold;
  color: #919191;
}

.stat-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 5px;
}

.stats{
  color: white;
}

.stat-bar-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
}

.gender-f{
  color: pink;
  font-size: 25px;
}

.gender-m{
  color: #30A7D7;
  font-size: 25px;
}
</style>
  