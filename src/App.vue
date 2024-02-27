<template>
  <div>
    <div class="header_main">
      <AppHeader @search="handleSearch" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader
  },
  methods: {
    handleSearch(searchTerm) {
      // Naviga alla pagina Pokedex.vue passando il termine di ricerca come parametro
      this.$router.push({ name: 'Pokedex', params: { searchTerm } });
    }
  }
};
</script>

<style lang="scss">
@import url(../src/style/general.scss);

.header_main{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
}
</style>
