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
    function q(incoming){ return document.querySelector(incoming); };

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

    function handle_displaying_selected_components() {
        if (type_currently_selected == "tokens") {
            q(".bridge-main-container").classList.remove("hide");
            q(".bridge-nfts-main-container").classList.add("hide");
            q(".bridge-redeems-main-container").classList.add("hide");
        } else if (type_currently_selected == "nfts") {
            q(".bridge-main-container").classList.add("hide");
            q(".bridge-redeems-main-container").classList.add("hide");
            q(".bridge-nfts-main-container").classList.remove("hide");
        } else if (type_currently_selected == "redeems") {
            q(".bridge-main-container").classList.add("hide");
            q(".bridge-redeems-main-container").classList.remove("hide");
            q(".bridge-nfts-main-container").classList.add("hide");
        }
    };

    function check_bridge_tabs(e) { 
        // Handles tab switching and assigning current type selected
        // Handles switching between the bridge component visibility

        let these_tabs = document.querySelectorAll("#bridge-tabs .inner-tab");
        
        for (var i = 0; i < these_tabs.length; i++) {
            these_tabs[i].classList.remove("tab-selected");
        }

        type_currently_selected = e.srcElement.getAttribute("data-typeid");
        update_bridge_tab_selected_store("check_tab");
        e.srcElement.classList.add("tab-selected");
        
        handle_displaying_selected_components();


        navigateTo("/bridge/" + e.srcElement.getAttribute("data-typeid"));
    }
</script>