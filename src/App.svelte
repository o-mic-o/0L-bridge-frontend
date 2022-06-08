<script>
  import Header from './lib/Header.svelte'
  import Introduction from './lib/Introduction.svelte'
  import BridgeTabs from './lib/BridgeTabs.svelte'
  import BridgeForm from './lib/BridgeForm.svelte'
</script>

<main>
  <Header />
  <div>
    <Introduction />
    <BridgeTabs />
    <BridgeForm />
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  main {
    text-align: center;
    padding: 0;
    margin:0 auto;
    padding-bottom:100px;
  }
  div {
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
  }
</style>
