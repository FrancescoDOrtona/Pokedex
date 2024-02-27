<template>
    <header>
      <div class="container-fluid py-3">
        <nav class="nav-bar">
          <div class="col-4">
            <img class="nav-logo-2" src="../../public/International_Pokémon_logo.svg.png" alt="">
          </div>
          <form class="d-flex col-4" role="search" @submit.prevent="handleSubmit">
            <input class="form-control me-2 search" type="search" placeholder="Cerca Pokemon" aria-label="Search" v-model="searchTerm">
            <button class="btn btn-danger" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div class="right-nav col-4">
            <img class="nav-logo" src="../../public/poke_ball_icon.png" alt="">
            <router-link :to="{ name: 'Homepage'}">Home</router-link>
          </div>
        </nav>
      </div>
    </header>
    <div class="header-decoration"></div>
  </template>
  
  <script>
  export default {
    emits: ['search'],
    data() {
      return {
        searchTerm: '' // Inizializzo il termine di ricerca come stringa vuota
      };
    },
    methods: {
      handleSubmit() {
        // Emetti un evento di ricerca al componente genitore
        this.$emit('search', this.searchTerm.toLowerCase());
      }
    }
  };
  </script>

<style lang="scss" scoped>
header {
    background-color: #616161;
    padding: 0px 20px;
    position: relative;
    box-shadow: 2px 2px 20px #000000ab;
}

.header-decoration {
    background: #616161;
    height: 16px;
    position: absolute;
    width: 600px;
    right: 50%;
    transform: translateX(50%);

    &::before {
        content: " ";
        left: -38px;
        right: auto;
        background: transparent url(https://assets.pokemon.com/static2/_ui/img/chrome/notches/large-notch-darkgray.png) no-repeat;
        height: 18px;
        position: absolute;
        width: 38px;
        top: -2px;
        transform: scaleY(-1);
    }

    &::after {
        content: " ";
        left: auto;
        right: -38px;
        background: transparent url(https://assets.pokemon.com/static2/_ui/img/chrome/notches/large-notch-darkgray.png) no-repeat;
        height: 18px;
        position: absolute;
        width: 38px;
        transform: rotate(180deg);
        top: -2px;
    }
}

.nav-logo {
    width: 30px;
}

.nav-logo-2 {
    width: 150px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-nav {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;

    a {
        text-decoration: none;
        color: white;

        &:hover {
            color: #FFDC00;
        }
    }
}

.search {
    border: 2px solid rgba(253, 13, 13, 0.25);

    &:focus {
        border-color: currentColor;
        box-shadow: 0 0 0 0.25rem rgba(253, 13, 13, 0.25);
    }
}</style>