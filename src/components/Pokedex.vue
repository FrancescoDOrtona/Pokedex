<template>
  <section v-if="pokemon" class="pokedex-container">
    <div class="pokemon-card">
      <div class="card-decoration"></div>
      <div class="card-decoration-2"></div>
      <h2 class="pokemon-name">{{ pokemon.name }} <span class="pokemon-order">N° {{ pokemon.order }}</span></h2>
      <div class="pokemon-image-container">
        <div class="image-wrapper">
          <img :src="pokemon.sprites.front_default" class="pokemon-image" alt="Pokemon Image">
        </div>
        <div class="button-catch">
          <button @click="toggleTeam" class="catch">
            <img :src="isPokemonInTeam ? '../../public/Rare_Candy.webp' : '../../public/poke_ball_icon.png'" alt="">           
          </button>
        </div>
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
                  <p>{{ pokemon.base_experience }}</p>
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
    <!-- Schermo con squadra nella parte destra -->
    <div class="pokemon-team">
      <div class="team-decoration"></div>
      <h4>La mia squadra</h4>
      <ul class="team_container">
        <li class="team-bg" v-for="(pokemon, index) in team" :key="index">
          <!-- Utilizza un'immagine solo se il pokemon è stato aggiunto -->
          <img class="team-pokemon" v-if="pokemon" :src="pokemon.sprites.front_default" alt="Pokemon Image">
        </li>
      </ul>
      <div class="team-decoration-2"></div>
    </div>
  </section>
  <section class="error" v-else>
    <p>Nessun Pokémon trovato</p>
    <img src="../../public/pika-question.png" alt="">
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemon: null,
      team: []
    };
  },
  computed: {
    isPokemonInTeam() {
      return this.team.some(pokemon => pokemon && pokemon.id === this.pokemon.id);
    }
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
    },
    toggleTeam() {
      if (this.isPokemonInTeam) {
        this.removeFromTeam();
      } else {
        this.addToTeam();
      }
    },
    addToTeam() {
      if (this.pokemon) {
        this.team.push(this.pokemon); // Aggiungi il pokemon all'array team
        this.saveTeamToLocalStorage(); // Salva la squadra nel localStorage
      }
    },
    removeFromTeam() {
      if (this.pokemon) {
        const index = this.team.findIndex(pokemon => pokemon && pokemon.id === this.pokemon.id);
        if (index !== -1) {
          this.team.splice(index, 1); // Rimuovi il pokemon dall'array team
          this.saveTeamToLocalStorage(); // Salva la squadra nel localStorage
        }
      }
    },
    saveTeamToLocalStorage() {
      localStorage.setItem('pokemonTeam', JSON.stringify(this.team)); // Salva la squadra nel localStorage
    }
  },
  created() {
    // Recupera la squadra dal localStorage all'avvio del componente
    const storedTeam = localStorage.getItem('pokemonTeam');
    if (storedTeam) {
      this.team = JSON.parse(storedTeam);
    }
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

ul,
ol,
menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error {
  margin: 190px;
  text-align: center;
  font-size: 30px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 90px;
  }
}

.pokedex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "PT Sans", sans-serif;
  position: relative;
}

.pokemon-team {
  position: fixed;
  overflow: hidden;
  top: 125px;
  right: 15%;
  background-color: white;
  border-radius: 10px;
  border: 3px solid #000;
  width: 300px;
  padding: 30px;
  h4{
    margin-bottom: 20px;
    text-align: center;
  }
}

.team-decoration{
  background-color: #E3350D;
  width: 100%;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  &::before {
    content: " ";
    background-color: #E3350D;
    width: 30px;
    height: 23px;
    display: block;
    position: absolute;
    bottom: -22px;
  }

  &::after {
    background: transparent url(../../public/decoration.svg) no-repeat 0 0;
    bottom: -22px;
    content: " ";
    position: absolute;
    height: 24px;
    width: 75px;
    left: 26px;
  }
}

.team-decoration-2{
  background-color: #E3350D;
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  &::before {
    content: " ";
    background-color: #E3350D;
    width: 30px;
    height: 23px;
    display: block;
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  &::after {
    background: transparent url(../../public/decoration.svg) no-repeat 0 0;
    bottom: 19px;
    content: " ";
    position: absolute;
    height: 24px;
    width: 75px;
    right: 26px;
    transform: rotate(180deg);
  }
}

.team-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60px;
  height: 60px;
}

.team-bg::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../public/pokeball-design.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  /* Opacità desiderata */
}

.team_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 30px 0px;
}

.pokemon-card {
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 20px;
  width: 600px;
  overflow: hidden;
  position: relative;
}

.card-decoration {
  /* background-image: url(../../public/decoration.svg); */
  background-color: #E3350D;
  width: 100%;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  &::before {
    content: " ";
    background-color: #E3350D;
    width: 85px;
    height: 23px;
    display: block;
    position: absolute;
    bottom: -22px;
  }

  &::after {
    background: transparent url(../../public/decoration.svg) no-repeat 0 0;
    bottom: -22px;
    content: " ";
    position: absolute;
    height: 24px;
    width: 75px;
    left: 81px;
  }

}

.card-decoration-2 {
  width: 100%;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  &::after {
    content: " ";
    background-color: #E3350D;
    width: 85px;
    height: 23px;
    display: block;
    position: absolute;
    bottom: -22px;
    right: 0;
  }

  &::before {
    background: transparent url(../../public/decoration.svg) no-repeat 0 0;
    bottom: -22px;
    content: " ";
    position: absolute;
    height: 24px;
    width: 75px;
    right: 81px;
    transform: scaleX(-1);
  }

}

.pokemon-name {
  text-align: center;
  text-transform: capitalize;
}

.pokemon-image-container {
  display: flex;
  align-items: center;
  position: relative;
}

.image-wrapper {
  flex: 1;
  /* L'immagine occupa lo spazio disponibile */
  text-align: center;
  /* Centra orizzontalmente */
}

@keyframes pokeballAnimation {
  0% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(-20deg);
  }

  40% {
    transform: rotate(12deg);
  }

  60% {
    transform: rotate(-10deg);
  }

  80% {
    transform: rotate(4deg);
  }

  100% {
    transform: rotate(0deg);
  }

}

.button-catch {
  position: absolute;
  right: 10px;
  top: 10px;

  .catch {
    border: none;
    background-color: transparent;
    width: 50px;
    height: 50px;
    img{
      width: 50px;
      height: 50px;
    }
  }

  &:hover {
    animation: pokeballAnimation 0.8s linear;
  }

}

@keyframes pokemonTeamAnimation {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }

  20% {
    transform: matrix(1, 0, 0, 1, 0, -1);
  }

  40% {
    transform: matrix(1, 0, 0, 1, 0, 1);
  }

  60% {
    transform: matrix(1, 0, 0, 1, 0, -1);
  }

  80% {
    transform: matrix(1, 0, 0, 1, 0, 1);
  }

  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}

.team-pokemon{
  animation: pokemonTeamAnimation 1s infinite ease-in-out ;
}



.pokemon-image {
  width: 150px;
  height: 150px;
}

.pokemon-details {
  margin-top: 5px;
}

.pokemon-details_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  &::before {
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

.pokemon-info {
  margin-bottom: 10px;
  text-transform: capitalize;
  padding: 20px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png);
  border-radius: 10px;
  color: white;
  position: relative;

  &::before {
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

.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.pokemon-stats {
  margin-top: 10px;
  text-transform: capitalize;
  padding: 20px;
  background-image: url(https://assets.pokemon.com/static2/_ui/img/chrome/body_gray_bg.png);
  border-radius: 5px;
  position: relative;

  &::before {
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

.pokemon-order {
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

.stats {
  color: white;
}

.stat-bar-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
}

.gender-f {
  color: pink;
  font-size: 25px;
}

.gender-m {
  color: #30A7D7;
  font-size: 25px;
}
</style>
  