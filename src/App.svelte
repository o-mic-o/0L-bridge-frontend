<script>
  import { connected_account, connect_account_type, bridge_tab_selected} from './lib/stores.js';
  import { routes } from './lib/routes.js'
  import { Router } from 'svelte-router-spa'

  import './assets/fonts.css';

  bridge_tab_selected.subscribe(function(value) {
    console.log(value);
  });
</script>

<Router {routes} />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
