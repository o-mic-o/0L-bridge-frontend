<script>
    import Introduction from './Introduction.svelte'
    import BridgeTabs from './BridgeTabs.svelte'
    import BridgeForm from './BridgeForm.svelte'
    import BridgeNftsForm from './BridgeNftsForm.svelte';
    import BridgeRedeemsForm from './BridgeRedeemsForm.svelte';
    import Header from './Header.svelte'

  export let currentRoute;
  //navigateTo("/bridge/tokens");
</script>

<main>
    <Header current_tab_focus={currentRoute.path} />
    <div class="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center" uk-grid>
      <Introduction />
    </div>
    <div class="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center" uk-grid>
      <BridgeTabs current_tab_focus={currentRoute.path}/>
    </div>
    <div class="uk-grid-small uk-flex-center uk-text-center" uk-grid>
      <BridgeForm current_tab_focus={currentRoute.path} />
    </div>
    <div class="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center" uk-grid>
      <BridgeNftsForm current_tab_focus={currentRoute.path} />
    </div>
    <div class="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center" uk-grid>
      <BridgeRedeemsForm current_tab_focus={currentRoute.path} />
    </div>
</main>