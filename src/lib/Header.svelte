<style>
.header-tab{
    font-weight: 500;
    margin-left:10px;
    margin-right:10px;
    border-bottom:2px solid transparent;
    padding:15px 10px 15px 10px;
    cursor:pointer;
}
.header-tab:hover {
    color:tomato;
    border-bottom:2px solid tomato;
    padding:15px 10px 15px 10px;
}
.header-tab-selected{
    color:tomato;
    border-bottom:2px solid tomato;
    padding:15px 10px 15px 10px;
}
.normal-flex {
    display:flex;
    align-items:center;
    justify-content: center;
    color:#bfbebe;
}
.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
    background-color:white;
    border-bottom: 1px solid lightgray;
    padding:10px 0 10px 0;
    position: fixed;
    z-index: 9;
}
img {
    width:40px;
    padding-left:10px;
}
h1 {
    color:tomato;
    padding:0 0 0 5px;
    margin:0;
    font-size:32px;
    font-weight: 600;
}
.cursor {
    cursor: pointer;
}

@media screen and (max-width:700px) {
    .header-title {
        font-size:24px;
    }
    .header-tab {
        margin-left:2px;
        margin-right:2px;
        display:none;
    }
}
@media screen and (max-width:380px) {
    .header-title{
        display:none;
    }
}
</style>


<script>
    import { bridge_tab_selected } from './stores.js';

    import { navigateTo } from 'svelte-router-spa'
    import logo from '/icon.jpg';
    export let current_tab_focus = "/bridge";
    import ConnectWalletButton from './ConnectWalletButton.svelte'
    let main_logo_navigation_directs_to = "/bridge/tokens";
    
    bridge_tab_selected.subscribe(function(value) {
        if (value == "tokens") {
            main_logo_navigation_directs_to = "/bridge/tokens";
        } else if (value == "nfts") {
            main_logo_navigation_directs_to = "/bridge/nfts";

        } else if (value == "redeems") {
            main_logo_navigation_directs_to = "/bridge/redeems";
        }
    });

    function check_header_tabs(e) { 
        let these_tabs = document.querySelectorAll("#header-tabs .header-tab");
        for (var i = 0; i < these_tabs.length; i++) {
            these_tabs[i].classList.remove("header-tab-selected");
        }
        if (e.srcElement.getAttribute("data-typeid") == "bridge") {
            navigateTo(main_logo_navigation_directs_to);
        } else {
            e.srcElement.classList.add("header-tab-selected");
            navigateTo(e.srcElement.getAttribute("data-typeid"));
        }
    }
</script>

<div class="main-header">
    <div class="normal-flex">
        <img on:click = { check_header_tabs } data-typeid="bridge" src={logo} alt="0L Logo" class="cursor"/>
        <h1 on:click = { check_header_tabs } data-typeid="bridge"class="cursor header-title" >0L Bridge</h1>
    </div>
    <div id="header-tabs" class="normal-flex">
        <!--<div on:click = { check_header_tabs } data-typeid="bridge" class="header-tab {current_tab_focus=="/bridge"?"header-tab-selected":""}">Bridge</div>-->
        <div on:click = { check_header_tabs } data-typeid="faq" class="header-tab {current_tab_focus=="/faq"?"header-tab-selected":""}">FAQ</div>
        <div on:click = { check_header_tabs } data-typeid="explorer" class="header-tab {current_tab_focus=="/explorer"?"header-tab-selected":""}">Explorer</div>
        <div on:click = { check_header_tabs } data-typeid="discord" class="header-tab {current_tab_focus=="/discord"?"header-tab-selected":""}">Discord</div>
        <ConnectWalletButton />
    </div>
    
</div>