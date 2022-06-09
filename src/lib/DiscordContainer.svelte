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
        <Introduction title="Discord" paragraph="Find 0L on Discord..."/>
    </div>
</main>

<style>
   div {
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
  }
  main {
    font-family: 'CircularStd-Medium';
    text-align: center;
    padding: 0;
    margin:0 auto;
    padding-bottom:100px;
  }
</style>