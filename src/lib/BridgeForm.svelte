<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: white;
    background-color: #ed9a9a;
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 600px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }
  button:disabled {
    background-color: rgba(255, 62, 0, 0.2);
    cursor: not-allowed;
  }
  button:focus {
    border: 2px solid #ff3e00;
  }
  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
  .bridge-form.reverse {
    flex-direction: column;
  }
  .bridge-form {
    display: flex;
    flex-direction: column-reverse;
    margin-top:25px;
    border:2px solid #f5f0f0;
    width:600px;
    border-radius:30px;
  }


  .label {
    padding:30px 0 0 30px;
    font-size:16px;
    font-weight: 600;
    text-align: left;
  }
  .divider {
    width:100%;
    background-color:#f5f0f0;
    height:3px;
  }
  .chain-type {
    padding:20px;
    text-align:left;
    font-size:20px;
    font-weight: 600;
  }
  .chain-type-container{
    width:540px;
    padding:25px 0 60px 30px;
    text-align: left;
    font-size:18px;
    color:black;
    --borderRadius: 10px;
    --itemIsActiveBG: #e7f9ff;
    --itemHoverColor: black;
    --itemHoverBG: #e7f9ff;
    --itemIsActiveColor: black;
    --inputFontSize: 18px;
    --height:60px;
    --indicatorTop:18px;
    --zIndex:-1;
  }
  .chain-type-container img {
    width:40px;
  }
  .switcher{
    width:60px;
    position:relative;
    top:-30px;
    cursor:pointer;
  }
  .switcher:hover {
    opacity: 0.8;
  }
  .asset-estimations{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px 0 10px;
  }
  .estimations {
    color:#888888;
    display:flex;
    align-items:center;
    justify-content: flex-start;
    font-size:14px;
    margin:12px 0 12px 0;
  }
</style>

<div>
  <div class="bridge-form reverse">
    <div class="label label-from">From</div>

    <div class="chain-type-container">
        <Select {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select network..."></Select>
        
   
          <BridgeSelectionContainer
            handle_this_type_input={(e) => handle_default_inputs(e)}
            selection_container_type="ava-selection-container"
            select_token_type="select-token-type-ava"
            select_maximum_type="select-maximum-type-ava"
            selection_container_available_balance="selection-estimate-available-ava"
            is_enabled={true}
            incoming_max_button_process={ava_max_button_process}
            handle_this_token_select={handle_ava_select}
            handle_this_token_clear={handle_ava_clear}
          />

          <BridgeSelectionContainer
            handle_this_type_input={(e) => null } 
            selection_container_type="eth-selection-container" 
            select_token_type="select-token-type-sol" 
            select_maximum_type="select-maximum-type-eth" 
            selection_container_available_balance="selection-estimate-available-eth"
            is_enabled={false} 
            is_false_message="Ethereum support is coming soon!"
            incoming_max_button_process={function(){}};
            handle_this_token_select={function(){}}
            handle_this_token_clear={function(){}}
          />

          <BridgeSelectionContainer
            handle_this_type_input={(e) => null } 
            selection_container_type="sol-selection-container"
            select_token_type="select-token-type-sol"
            select_maximum_type="select-maximum-type-sol"
            selection_container_available_balance="selection-estimate-available-sol"
            is_enabled={false}
            is_false_message="Solana support is coming soon!"
            incoming_max_button_process={function(){}};
            handle_this_token_select={function(){}}
            handle_this_token_clear={function(){}}
          />

    </div>

    <div class="label label-reverse-from hide">Destination</div>
    <div class="divider"><img on:click={reverse_direction} class="switcher" alt="Switcher icon" src={switcher}></div>
    <div class="label label-to">Destination</div>
          
    <div class="chain-type-container">


      <Select items={to_items} value={to_selected} showChevron={true} on:select={handleToSelect} inputStyles="cursor:pointer;" placeholder="Select the network to connect to..."></Select>

      <BridgeSelectionContainer
        handle_this_type_input={(e) => handle_default_inputs(e)}
        selection_container_type="ol-selection-container"
        selection_container_available_balance="selection-estimate-available-ol"
        select_token_type="select-token-type-ol"
        select_maximum_type="select-maximum-type-ol"
        handle_this_token_select={handle_ol_select}
        is_enabled={true}
        incoming_max_button_process={ol_max_button_process}
        handle_this_token_clear={handle_ol_clear}
      />

    </div>

    <div class="label label-reverse-to hide">From</div>
  </div>
  
  <div class="asset-estimations">
      <div class="estimations">Estimated total including fees</div>
      <div class="estimations">0.00</div>
  </div>
  <button disabled on:click={is_submitting}>Transfer</button>
</div>

<script>
    import switcher from '/switcher.png';
    import Select from 'svelte-select';
    import BridgeSelectionContainer from './BridgeSelectionContainer.svelte';
    import { ava_network_tokens, ol_network_tokens } from './stores.js';

    let from_selected = "";
    let is_reversed = true;

    function q(e) { return document.querySelector(e); };

    let items = [
        {value: 'ava', label: '<img src="/ava.png" style="width:20px;padding-right:5px;" alt="AVA Logo"/>Avalanche'},
        {value: 'eth', label: '<img src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Ethereum'},
        {value: 'sol', label: '<img src="/sol.png" style="width:20px;padding-right:5px;" alt="Solana Logo"/>Solana'}
    ];

    let to_items = [
        {value: 'ol', label: '<img src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>0L Network'}
    ];
    let to_selected = to_items[0];

    function handleToSelect(event) {

    };
    
    function handleSelect(event) {
        console.log('selected item', event.detail.value);
        from_selected = event.detail.value;
        if (event.detail.value == "eth") {
          q(".eth-selection-container").classList.remove("hide");
          q(".ava-selection-container").classList.add("hide");
          q(".sol-selection-container").classList.add("hide");
        } else if (event.detail.value == "ava") {
          q(".eth-selection-container").classList.add("hide");

          if (is_reversed) {
            q(".ava-selection-container").classList.remove("hide");
          } else {
            q(".ava-selection-container").classList.add("hide");
          }

          q(".sol-selection-container").classList.add("hide");
        }  else if (event.detail.value == "sol") {
          q(".eth-selection-container").classList.add("hide");
          q(".ava-selection-container").classList.add("hide");
          q(".sol-selection-container").classList.remove("hide");
        } else {
          q(".eth-selection-container").classList.add("hide");
          q(".ava-selection-container").classList.add("hide");
          q(".sol-selection-container").classList.add("hide");
        }
    }

  function is_submitting() {
    alert("Submitted!");
  }

  function hide_selection_containers() {
      q(".eth-selection-container").classList.add("hide");
      q(".sol-selection-container").classList.add("hide");
      q(".ava-selection-container").classList.add("hide");
  };
  function transfer_to_display_switch() {
    if (from_selected == "ava") {
        q(".ava-selection-container").classList.add("hide");
      }
      if (from_selected == "eth") {
        q(".eth-selection-container").classList.remove("hide");
      }
      if (from_selected == "sol") {
        q(".sol-selection-container").classList.remove("hide");
      }
  };
  function transfer_from_dispaly_switch() {
    if (from_selected == "ava") {
        q(".ava-selection-container").classList.remove("hide");
      }
      if (from_selected == "eth") {
        q(".eth-selection-container").classList.remove("hide");
      }
      if (from_selected == "sol") {
        q(".sol-selection-container").classList.remove("hide");
      }
  };

  function reverse_direction() {

    let this_bridge_form = q(".bridge-form");
    if (this_bridge_form.classList.contains("reverse")) { // Then it's a transfer from OL
      is_reversed = false;
      this_bridge_form.classList.remove("reverse");
      
      q(".label-from").classList.add("hide");
      q(".label-to").classList.add("hide");


      q(".label-reverse-from").classList.remove("hide");
      q(".label-reverse-to").classList.remove("hide");
      
      console.log(from_selected);

      q(".ol-selection-container").classList.remove("hide");
      hide_selection_containers();
      transfer_to_display_switch();
    } else { // Then it's a transfer to 0L 
      this_bridge_form.classList.add("reverse");
      is_reversed = true;

      q(".label-from").classList.remove("hide");
      q(".label-to").classList.remove("hide");

      q(".label-reverse-from").classList.add("hide");
      q(".label-reverse-to").classList.add("hide");

      q(".ol-selection-container").classList.add("hide");
      hide_selection_containers();
      transfer_from_dispaly_switch();

    }
  };

  function handle_default_inputs(e) {
    if (isNaN(Number(e.target.value))) {
      e.target.classList.add("err");
    } else {
      e.target.classList.remove("err");
    }
  };
  

  let current_ol_token_selection_is = "";
  let current_ava_token_selection_is = "";


  function ava_max_button_process(e){
    console.log("ava clicked on max");
    
    ava_network_tokens.subscribe(function(value) {
      let this_ava_input = q(".ava-selection-container input");
      if (current_ava_token_selection_is == "") {}
      else {
        if (this_ava_input.value == value[current_ava_token_selection_is]) {
          q(".ava-selection-container input").value = "";
        } else {
          q(".ava-selection-container input").value = value[current_ava_token_selection_is];
        }
      }
    });

  };

  function ol_max_button_process(e) {
    console.log("ol clicked on max");

    ol_network_tokens.subscribe(function(value) {
      let this_ol_input = q(".ol-selection-container input");
      if (current_ol_token_selection_is == "") {}
      else {
        if (this_ol_input.value == value[current_ol_token_selection_is]) {
          q(".ol-selection-container input").value = "";
        } else {
          console.log(current_ol_token_selection_is);
          q(".ol-selection-container input").value = value[current_ol_token_selection_is];
        }
      }
    });
  };

    function handle_ol_select(e) {
        console.log("Input change on inner OL");
        current_ol_token_selection_is = e.detail.value;
        
        ol_network_tokens.subscribe(function(value) {
          q(".selection-estimate-available-ol").innerHTML = "Available balance: " + value[current_ol_token_selection_is];
        });
    };
    
    function handle_ava_select(e) {
      console.log("Input change on inner ava");
      current_ava_token_selection_is = e.detail.value;

      ava_network_tokens.subscribe(function(value) {
        console.log(value);
          q(".selection-estimate-available-ava").innerHTML = "Available balance: " + value[current_ava_token_selection_is];
      });
    };

    function handle_ava_clear(event) {
      current_ava_token_selection_is = "";
      q(".selection-estimate-available-ava").innerHTML = "Available balance: ---";
      q(".ava-selection-container input").value = "";
    };

    function handle_ol_clear(event){ 
      current_ol_token_selection_is = "";
      q(".selection-estimate-available-ol").innerHTML = "Available balance: ---";
      q(".ol-selection-container input").value = "";
    };
</script>