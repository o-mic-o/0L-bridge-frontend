<script>
    import Introduction from './Introduction.svelte'
    import BridgeTabs from './BridgeTabs.svelte'
    import BridgeForm from './BridgeForm.svelte'
    import Header from './Header.svelte'
    import { Route, navigateTo} from 'svelte-router-spa'

  export let currentRoute;
  navigateTo("/bridge/tokens");
</script>

<main>
    <Route {currentRoute} />
    <Header current_tab_focus={currentRoute.path} />
        <div>
            <Introduction />
            <BridgeTabs current_tab_focus={currentRoute.path}/>
            <BridgeForm />
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