
<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>

<div>
  <Toasts />
  <Router {routes} />
</div>


<script>
  import { addToast, connected_account_address, is_connected_account, connect_account_type, bridge_tab_selected} from './lib/stores.js';
  import { routes } from './lib/routes.js'
  import { Router } from 'svelte-router-spa'
  import Toasts from "./lib/Toasts.svelte";

  import './assets/fonts.css';

  bridge_tab_selected.subscribe(function(value) {
    console.log(value);
  });

  is_connected_account.subscribe(function(value) {
    console.log(value);
  });

  connect_account_type.subscribe(function(value) {
    console.log(value);
  });

  connected_account_address.subscribe(function(value){
    console.log(value);
  });
  
  let WAIT_FOR_LOAD_TIME = 1000;

  let chain_id_mapping = [
        ["0x1", "eth_logo.png", "eth", "Ethereum on Metamask detected."],
        ["0xa86a", "ava.png", "ava", "Avalanche on Metamask detected."]
  ];

  wait_for_ethereum_load();

  function wait_for_ethereum_load() {
      setTimeout(function(){
          if (typeof window.ethereum != 'undefined' && window.ethereum.selectedAddress) {
              if (typeof window.web3.currentProvider != 'undefined') {  

                for (var i=0; i < chain_id_mapping.length; i++) {
                    if (window.web3.currentProvider.chainId == chain_id_mapping[i][0]) {
                      addToast({ message:"Ethereum on Metamask detected.", type: "info", dismissible: true, timeout: 0 })
                    }
                }

              }
          }
 
      },WAIT_FOR_LOAD_TIME);
  };

</script>