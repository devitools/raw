<template>
  <div id="app">
    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <p class="h5 my-0 me-md-auto fw-normal"></p>
      <nav class="my-2 my-md-0 me-md-3">
        <router-link
          class="p-2 text-dark"
          to="/"
        >
          Home
        </router-link>

        <router-link
          class="p-2 text-dark"
          to="/category"
        >
          Category
        </router-link>

        <router-link
          class="p-2 text-dark"
          to="/customer"
        >
          Customer
        </router-link>
      </nav>
    </header>

    <router-view />

    <footer>
      <div class="container full-width">
        <select
          v-model="$i18n.locale"
          @input="save($event.target.value)"
        >
          <option
            v-for="(locale, i) in locales"
            :key="`locale-${i}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
    </footer>

    <AppLoading />

    <AppNotification />
  </div>
</template>

<script>
import AppLoading from 'src/components/App/AppLoading'
import AppNotification from 'src/components/App/AppNotification'

export default {
  /**
   */
  name: 'App',
  /**
   */
  components: { AppLoading, AppNotification },
  /**
   */
  data () {
    return {
      locales: ['pt-br', 'en']
    }
  },
  /**
   */
  created () {
    this.$i18n.locale = window.localStorage.getItem('locale') ?? 'en'
  },
  /**
   */
  methods: {
    /**
     * @param {string} locale
     */
    save (locale) {
      window.localStorage.setItem('locale', locale)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

a.router-link-exact-active {
  color: #4cb100 !important;
}

footer {
  bottom: 0;
  position: absolute;
  padding: 20px 0;
  width: 100%;
  background-color: #56904c;
}
</style>
