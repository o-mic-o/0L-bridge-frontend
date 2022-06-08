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
    <div on:mouseover={check_bridge_tabs} on:focus={type_focusing} data-typeid="tokens" class="inner-tab tab-selected">Tokens</div>
    <div on:mouseover={check_bridge_tabs} on:focus={type_focusing} data-typeid="nfts" class="inner-tab">NFTs</div>
    <div on:mouseover={check_bridge_tabs} on:focus={type_focusing} data-typeid="redeems" class="inner-tab">Redeems</div>
</div>

<script>
    let type_currently_selected = "tokens";

    function type_focusing() {}

    function check_bridge_tabs(e) { 
        // Handles tab switching and assigning current type selected

        if (!e.srcElement.classList.contains("tab-selected")) {
            let these_tabs = document.querySelectorAll("#bridge-tabs .inner-tab");
            
            for (var i = 0; i < these_tabs.length; i++) {
                these_tabs[i].classList.remove("tab-selected");
            }

            type_currently_selected = e.srcElement.getAttribute("data-typeid");
            e.srcElement.classList.add("tab-selected");
            console.log(type_currently_selected);
        }
    }
</script>