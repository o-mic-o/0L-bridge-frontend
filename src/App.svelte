<script>
  import Header from './lib/Header.svelte'
  import BridgeContainer from './lib/BridgeContainer.svelte'
  import { routes } from './lib/routes.js'
  import { Router } from 'svelte-router-spa'

  import './assets/fonts.css';

  
</script>

<Router {routes} />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
