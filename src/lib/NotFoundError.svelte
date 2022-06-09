<script>
    import Introduction from './Introduction.svelte'
    import Header from './Header.svelte'
    import { Route } from 'svelte-router-spa'

    export let currentRoute;
    console.log(currentRoute);
</script>

<main>
    <Route {currentRoute} />
    <Header current_tab_focus={currentRoute.path} />
    <div>
        <Introduction title="Error 404" paragraph="Unfortunately, this page doesn't exist."/>
    </div>
</main>

<style>
div {
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
  }
</style>