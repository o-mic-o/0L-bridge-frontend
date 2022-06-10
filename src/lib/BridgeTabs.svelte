<style>
    .bridge-tabs-container {
        display: flex;
        border-radius: 99px;
        width:400px;
        align-items: center;
        justify-content: space-between;
        background-color:#f5f0f0;
        padding:3px;
    }
    .bridge-tabs-container div {
        padding:10px 30px 10px 30px;
        border-radius: 99px;
        color:tomato;
        font-weight: 500;
    }
    .bridge-tabs-container div.tab-selected {
        background-color:white;
    }
    .inner-tab {
        cursor:pointer;
    }
    .inner-tab:hover {
        background-color:white;
    }
</style>

<div id="bridge-tabs" class="bridge-tabs-container">
    <div on:click={check_bridge_tabs} data-typeid="tokens" class="inner-tab {current_tab_focus=="/bridge/tokens"?"tab-selected":""}">Tokens</div>
    <div on:click={check_bridge_tabs} data-typeid="nfts" class="inner-tab {current_tab_focus=="/bridge/nfts"?"tab-selected":""}">NFTs</div>
    <div on:click={check_bridge_tabs} data-typeid="redeems" class="inner-tab {current_tab_focus=="/bridge/redeems"?"tab-selected":""}">Redeems</div>
</div>

<script>
    import { bridge_tab_selected} from './stores.js';
    import { navigateTo } from 'svelte-router-spa'
    export let type_currently_selected = "tokens";
    export let current_tab_focus;
    
    update_bridge_tab_selected_store("init");

    function update_bridge_tab_selected_store(type) {
        bridge_tab_selected.update(function(current_value) {
            if (type == "init") {
                return current_tab_focus.split("/bridge/")[1];
            } else if (type == "check_tab") {
                return type_currently_selected;
            }
        });
    };
    
    function check_bridge_tabs(e) { 
        // Handles tab switching and assigning current type selected

        let these_tabs = document.querySelectorAll("#bridge-tabs .inner-tab");
        
        for (var i = 0; i < these_tabs.length; i++) {
            these_tabs[i].classList.remove("tab-selected");
        }

        type_currently_selected = e.srcElement.getAttribute("data-typeid");
        update_bridge_tab_selected_store("check_tab");
        e.srcElement.classList.add("tab-selected");
        navigateTo("/bridge/" + e.srcElement.getAttribute("data-typeid"));
    }
</script>