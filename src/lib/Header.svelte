

<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    
    <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-left">
            <a href="/bridge/tokens" class="uk-navbar-item uk-logo"><img data-typeid="bridge" src={logo} alt="0L Logo"/><span class="uk-visible@s">0L Bridge</span></a>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-visible@m" uk-tab="active:0;">
                <li class="hide"><a></a></li>
                <li class="{current_tab_focus=="/faq"?"uk-active":""}"><a href="/faq">FAQ</a></li>
                <li class="{current_tab_focus=="/explorer"?"uk-active":""}"><a href="/explorer">Explorer</a></li>
                <li class="{current_tab_focus=="/discord"?"uk-active":""}"><a href="/discord">Discord</a></li>
            </ul>
            <ConnectWalletButton />
            <a href="" class="uk-navbar-toggle uk-hidden@m" uk-toggle="target: #sidenav" uk-navbar-toggle-icon></a>
        </div>
    </nav>
    <div id="sidenav" uk-offcanvas="flip: true" class="uk-offcanvas">
        <div class="uk-offcanvas-bar">
                <ul class="uk-nav">
                    <li class="uk-text-large {current_tab_focus=="/bridge"?"uk-active":""}"><a href="/bridge/tokens">Bridge</a></li>
                    <li class="uk-text-large {current_tab_focus=="/faq"?"uk-active":""}"><a href="/faq">FAQ</a></li>
                    <li class="uk-text-large {current_tab_focus=="/explorer"?"uk-active":""}"><a href="/explorer">Explorer</a></li>
                    <li class="uk-text-large {current_tab_focus=="/discord"?"uk-active":""}"><a href="/discord">Discord</a></li>
                </ul>
        </div>
    </div>
</div>
<script>
    import 'uikit';
    import "../custom/ol-theme.less";
    import { bridge_tab_selected } from './stores.js';
    import logo from '/icon.jpg';
    export let current_tab_focus = "/bridge";
    import ConnectWalletButton from './ConnectWalletButton.svelte'
</script>
<!--<div class="main-header">
    <div uk-logo class="normal-flex">
        <img on:click = { check_header_tabs } data-typeid="bridge" src={logo} alt="0L Logo" class="cursor"/>
        <h1 on:click = { check_header_tabs } data-typeid="bridge"class="cursor header-title" >0L Bridge</h1>
    </div>

    <div id="header-tabs" class="normal-flex">
        <div on:click = { check_header_tabs } data-typeid="bridge" class="header-tab {current_tab_focus=="/bridge"?"header-tab-selected":""}">Bridge</div>
        <div on:click = { check_header_tabs } data-typeid="faq" class="header-tab {current_tab_focus=="/faq"?"header-tab-selected":""}">FAQ</div>
        <div on:click = { check_header_tabs } data-typeid="explorer" class="header-tab {current_tab_focus=="/explorer"?"header-tab-selected":""}">Explorer</div>
        <div on:click = { check_header_tabs } data-typeid="discord" class="header-tab {current_tab_focus=="/discord"?"header-tab-selected":""}">Discord</div>
        
    </div>
    
</div>-->