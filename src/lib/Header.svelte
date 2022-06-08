<style>
.header-tab{
    font-weight: 500;
    margin-left:20px;
    margin-right:20px;
    border-bottom:2px solid transparent;
    padding:15px 10px 15px 10px;
    cursor:pointer;
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
    /*padding:10px 0 10px 0;*/
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
</style>


<div>
    <div class="main-header">
        <div class="normal-flex">
            <img src={logo} alt="0L Logo" />
            <h1>Bridge</h1>
        </div>
        <div id="header-tabs" class="normal-flex">
            <div on:mouseover={check_header_tabs} on:focus={header_focus} data-typeid="bridge" class="header-tab header-tab-selected">Bridge</div>
            <div on:mouseover={check_header_tabs} on:focus={header_focus} data-typeid="faq" class="header-tab">FAQ</div>
            <div on:mouseover={check_header_tabs} on:focus={header_focus} data-typeid="stats" class="header-tab">Stats</div>
            <div on:mouseover={check_header_tabs} on:focus={header_focus} data-typeid="wormhole" class="header-tab">Wormhole</div>
        </div>
        
    </div>
</div>

<script>
    import logo from '../assets/icon.jpg';
    let header_tab_currently_selected = "bridge"
    function header_focus() { }
    
    function check_header_tabs(e) { 
        // Handles tab switching and assigning current type selected

        if (!e.srcElement.classList.contains("header-tab-selected")) {
            let these_tabs = document.querySelectorAll("#header-tabs .header-tab");

            for (var i = 0; i < these_tabs.length; i++) {
                these_tabs[i].classList.remove("header-tab-selected");
            }

            header_tab_currently_selected = e.srcElement.getAttribute("data-typeid");
            e.srcElement.classList.add("header-tab-selected");
            console.log(header_tab_currently_selected);
        }
    }
</script>