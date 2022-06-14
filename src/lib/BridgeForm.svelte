<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: white;
    background-color: #ff5958;
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
    margin-top:15px;
    outline:2px solid #f5f0f0;
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
    width:auto;
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
    --margin:0 25px 0 0;
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

  .estimations {
    color:#888888;
    display:flex;
    align-items:center;
    justify-content: flex-start;
    font-size:14px;
    margin:12px 0 12px 0;
  }
  @media screen and (max-width:700px) {
    .bridges-container{
      width:100%;
      margin:0;
    }
    .chain-type-container {
      padding:25px 10px 60px 10px;
    }
    button {
      width:90%;
    }
    .bridge-form {
      width:100%;
    }
  }

</style>

<div class="bridges-container">
  <div class="{current_tab_focus=="/bridge/tokens" ? "" : "hide"} bridge-main-container">
    <div class="bridge-form reverse">
      <div class="label label-from">From</div>

      <div class="chain-type-container">
          <Select {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select network..."></Select>
          
    
            <BridgeSelectionContainer
              handle_this_type_input={(e) => handle_default_inputs(e)}
              selection_container_type="ava-selection-container"
              select_maximum_type="select-maximum-type-ava"
              selection_container_available_balance="selection-estimate-available-ava"
              select_token_title="select-token-title-ava"
              is_enabled={true}
              incoming_max_button_process={ava_max_button_process}
              handle_this_token_display_select={handle_ava_token_display_select}
            />

            <BridgeSelectionContainer
              handle_this_type_input={(e) => handle_default_inputs(e)}
              selection_container_type="eth-selection-container"
              select_maximum_type="select-maximum-type-eth"
              selection_container_available_balance="selection-estimate-available-eth"
              select_token_title="select-token-title-eth"
              is_enabled={true}
              incoming_max_button_process={eth_max_button_process}
              handle_this_token_display_select={handle_eth_token_display_select}
            />

            <BridgeSelectionContainer
              handle_this_type_input={(e) => null } 
              selection_container_type="sol-selection-container"
              select_maximum_type="select-maximum-type-sol"
              selection_container_available_balance="selection-estimate-available-sol"
              select_token_title="select-token-title-sol"
              is_enabled={false}
              is_false_message="Solana support is coming soon!"
              incoming_max_button_process={function(){}};
              handle_this_token_display_select={function(){}}
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
          select_maximum_type="select-maximum-type-ol"
          select_token_title="select-token-title-ol"
          handle_this_token_display_select={handle_ol_token_display_select}
          is_enabled={true}
          incoming_max_button_process={ol_max_button_process}
        />

      </div>

      <div class="label label-reverse-to hide">From</div>
    </div>
    
    <div class="asset-estimations">
        <div class="estimations">Estimated total including fees</div>
        <div class="estimations">0.00</div>
    </div>
    <button on:click={is_submitting}>Transfer</button>
    
  </div>
  
  <BridgeTokenSelectionDisplayContainer
    incoming_token_type="0L Network"
    incoming_token_type_container="ol-token-select-container"
    incoming_token_select_items={to_select_token_items_ol}
    incoming_token_select_process={handle_ol_select}
  />
  <BridgeTokenSelectionDisplayContainer
    incoming_token_type="Ethereum Network"
    incoming_token_type_container="eth-token-select-container"
    incoming_token_select_items={to_select_token_items_eth}
    incoming_token_select_process={handle_eth_select}
  />
  <BridgeTokenSelectionDisplayContainer
    incoming_token_type="Avalanche Network"
    incoming_token_type_container="ava-token-select-container"
    incoming_token_select_items={to_select_token_items_ava}
    incoming_token_select_process={handle_ava_select}
  />
</div>
<script>
    import switcher from '/switcher.png';
    import Select from 'svelte-select';
    import BridgeSelectionContainer from './BridgeSelectionContainer.svelte';
    import BridgeTokenSelectionDisplayContainer from './BridgeTokenSelectionDisplayContainer.svelte';
    import { bridge_form_state, eth_network_tokens, ava_network_tokens, ol_network_tokens, addToast } from './stores.js';
    import { subscribe } from 'svelte/internal';
    export let current_tab_focus;

    let chevronSvg = '<div class="inner-chevron"><svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="s-322NloBWXWsQ"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" class="s-322NloBWXWsQ"></path></svg></div>';
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

    function handleToSelect(event) {};

    let to_select_token_items_ol = [
        {value: 'ol', symbol:"OL", icon: '<img data-type_id="ol" src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>', label: "0L Token (0L)"},
        {value: 'eth', symbol: "ETH", icon: '<img data-type_id="eth" src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>', label: "Ethereum (ETH)"},
        {value: 'usdc', symbol: "USDC", icon: '<img data-type_id="usdc" src="/usdc.png" style="width:20px;padding-right:5px;" alt="USDC Logo"/>', label: "US Dollar Token (USDC)"},
    ];
      let to_select_token_items_eth = [
      {value: 'ol', symbol:"eOL", icon: '<img data-type_id="ol" src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>', label: "0L Token (e0L)"},
      {value: 'eth', symbol: "ETH", icon: '<img data-type_id="eth" src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="AVA Logo"/>', label: "Ethereum (ETH)"},
      {value: 'usdc', symbol: "USDC", icon: '<img data-type_id="usdc" src="/usdc.png" style="width:20px;padding-right:5px;" alt="USDC Logo"/>', label: "US Dollar Token (USDC)"},
      {value: 'dai', symbol: "DAI", icon: '<img data-type_id="dai" src="/dai.png" style="width:20px;padding-right:5px;" alt="DAI Logo"/>', label: "DAI Token (DAI)"},
    ];

    let to_select_token_items_ava = [
      {value: 'ol', symbol:"aOL", icon: '<img data-type_id="ol" src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>', label: "0L Token (a0L)"},
      {value: 'ava', symbol: "AVA", icon: '<img data-type_id="ava" src="/ava.png" style="width:20px;padding-right:5px;" alt="AVA Logo"/>', label: "Avalanche (AVA)"},
      {value: 'usdc', symbol: "aUSDC", icon: '<img data-type_id="usdc" src="/usdc.png" style="width:20px;padding-right:5px;" alt="USDC Logo"/>', label: "US Dollar Token (aUSDC)"},
    ];

    function handleSelect(event) {
        console.log('selected item', event.detail.value);
        from_selected = event.detail.value;

        bridge_form_state.update(function(current_value) {
          return {
            from: is_reversed ? event.detail.value : "ol",
            to: is_reversed? "ol" : event.detail.value,
            
            from_network_token: current_value.from_network_token,

            from_network_amount: current_value.from_network_amount,
          };
        });

       bridge_form_state.subscribe(function(value) {
          console.log("This selected item state value");
          console.log(value);
        });

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

    bridge_form_state.subscribe(function(value) {
      console.log("This form submission");
      console.log(value);
    });
    addToast({ message:"Starting transfer process...", type: "info", dismissible: true, timeout: 0 })

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
        q(".eth-selection-container").classList.add("hide");
      }
      if (from_selected == "sol") {
        q(".sol-selection-container").classList.remove("hide");
      }
  };
  function transfer_from_display_switch() {
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
    handle_ava_clear();
    handle_ol_clear();
    handle_eth_clear();

    let this_bridge_form = q(".bridge-form");
    if (this_bridge_form.classList.contains("reverse")) { // Then it's a transfer from OL
      
      bridge_form_state.update(function(current_value) {
          return {
            from: "ol",
            to: from_selected,
            
            from_network_token: "",
            from_network_amount: "",
          };
      });

      bridge_form_state.subscribe(function(value) {
          console.log("This form flipped");
          console.log(value);
      });


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
      
      bridge_form_state.update(function(current_value) {
          return {
            from: from_selected,
            to: "ol",
            
            from_network_token: (from_selected == "" ? "" : current_value.from_network_token),
            from_network_amount: "",
          };
      });

      bridge_form_state.subscribe(function(value) {
          console.log("This form flipped");
          console.log(value);
      });
       
      q(".label-from").classList.remove("hide");
      q(".label-to").classList.remove("hide");

      q(".label-reverse-from").classList.add("hide");
      q(".label-reverse-to").classList.add("hide");

      q(".ol-selection-container").classList.add("hide");
      hide_selection_containers();
      transfer_from_display_switch();

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
  let current_eth_token_selection_is = "";

  function eth_max_button_process(e) {
    console.log("eth clicked on max");
    
    eth_network_tokens.subscribe(function(value) {
      let this_eth_input = q(".eth-selection-container input");
      if (current_eth_token_selection_is == "") {}
      else {
        if (this_eth_input.value == value[current_eth_token_selection_is]) {
          q(".eth-selection-container input").value = "";
          bridge_form_state.update(function(current_value) {
                return {
                  from: current_value.from,
                  to:  current_value.to,
                  from_network_token: current_value.from_network_token,
                  from_network_amount:  "",
                };
            });
        } else {
          q(".eth-selection-container input").value = value[current_eth_token_selection_is];

            bridge_form_state.update(function(current_value) {
                return {
                  from: current_value.from,
                  to:  current_value.to,
                  from_network_token: (current_value.from == "eth" ? current_eth_token_selection_is : current_value.from_network_token),
                  from_network_amount:  (current_value.from == "eth" ? this_eth_input.value : ""),
                };
            });
        }

        bridge_form_state.subscribe(function(value) {
            console.log("This eth token was maxxed");
            console.log(value);
        });

      }
    });
  };

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

    function get_this_token_select_item(from_items, value_to_find) {
      for (var i = 0; i < from_items.length; i++) {
        if (value_to_find == from_items[i].value) {
          return from_items[i];
        }
      }
    };
    function handle_ol_token_display_select(e) {
        console.log("Handling token Display select OL");
        q(".bridge-tabs-container").classList.add("hide");
        q(".bridge-main-container").classList.add("hide");
        q(".ava-token-select-container").classList.add("hide");
        q(".eth-token-select-container").classList.add("hide");
        q(".ol-token-select-container").classList.remove("hide");
    };

    function handle_eth_token_display_select(e) {
      console.log("Handling token Display select ETH");
        q(".bridge-tabs-container").classList.add("hide");
        q(".bridge-main-container").classList.add("hide");
        q(".ol-token-select-container").classList.add("hide");
        q(".ava-token-select-container").classList.add("hide");
        q(".eth-token-select-container").classList.remove("hide");
    };

    function handle_ava_token_display_select(e) {
        console.log("Handling token Display select AVA");
        q(".bridge-tabs-container").classList.add("hide");
        q(".bridge-main-container").classList.add("hide");
        q(".ol-token-select-container").classList.add("hide");
        q(".eth-token-select-container").classList.add("hide");
        q(".ava-token-select-container").classList.remove("hide");
    };

    function handle_ol_select(e) {
      q(".ol-selection-container input").value = "";
      let this_selection = e.target.getAttribute("data-type_id");
      current_ol_token_selection_is = this_selection;
      
      q(".bridge-tabs-container").classList.remove("hide");
      q(".bridge-main-container").classList.remove("hide");
      q(".ol-token-select-container").classList.add("hide");

      let this_token_selection = get_this_token_select_item(to_select_token_items_ol, this_selection);
      q(".select-token-title-ol").innerHTML = this_token_selection.icon + this_token_selection.symbol + chevronSvg;

       
      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            
            from_network_token: (current_value.from == "ol" ? this_selection : current_value.from_network_token),

            from_network_amount: current_value.from_network_amount,
          };
      });

      bridge_form_state.subscribe(function(value) {
          console.log("This ol token was selected");
          console.log(value);
      });
       

      ol_network_tokens.subscribe(function(value) {
        q(".selection-estimate-available-ol").innerHTML = "Available balance: " + value[current_ol_token_selection_is];
      });
    };

    function handle_eth_select(e) {
      console.log(e);
      q(".eth-selection-container input").value = "";

      console.log("Input change on inner eth");
      let this_selection = e.target.getAttribute("data-type_id");
      current_eth_token_selection_is = this_selection;

      q(".bridge-tabs-container").classList.remove("hide");
      q(".bridge-main-container").classList.remove("hide");
      q(".eth-token-select-container").classList.add("hide");

      console.log(this_selection);
      let this_token_selection = get_this_token_select_item(to_select_token_items_eth, this_selection);
      q(".select-token-title-eth").innerHTML = this_token_selection.icon + this_token_selection.symbol + chevronSvg;
       

      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            
            from_network_token: (current_value.from == "eth" ? current_eth_token_selection_is : current_value.from_network_token),
            from_network_amount:  (current_value.from == "eth" ? q(".eth-selection-container input").value : ""),
          };
      });

      bridge_form_state.subscribe(function(value) {
          console.log("This eth token was selected");
          console.log(value);
      });
       
      eth_network_tokens.subscribe(function(value) {
        console.log(value);
          q(".selection-estimate-available-eth").innerHTML = "Available balance: " + value[current_eth_token_selection_is];
      });
    };

    function handle_ava_select(e) {
      q(".ava-selection-container input").value = "";

      console.log("Input change on inner ava");
      let this_selection = e.target.getAttribute("data-type_id");
      current_ava_token_selection_is = this_selection;

      q(".bridge-tabs-container").classList.remove("hide");
      q(".bridge-main-container").classList.remove("hide");
      q(".ava-token-select-container").classList.add("hide");

      let this_token_selection = get_this_token_select_item(to_select_token_items_ava, this_selection);
      q(".select-token-title-ava").innerHTML = this_token_selection.icon + this_token_selection.symbol + chevronSvg;
       

      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            
            from_network_token: (current_value.from == "ava" ? current_ava_token_selection_is : current_value.from_network_token),

            from_network_amount: current_value.from_network_amount,
          };
      });

      bridge_form_state.subscribe(function(value) {
          console.log("This ava token was selected");
          console.log(value);
      });
       
      ava_network_tokens.subscribe(function(value) {
        console.log(value);
          q(".selection-estimate-available-ava").innerHTML = "Available balance: " + value[current_ava_token_selection_is];
      });
    };

    function handle_ava_clear() {
      current_ava_token_selection_is = "";
      q(".selection-estimate-available-ava").innerHTML = "Available balance: ---";
      q(".ava-selection-container input").value = "";
      q(".select-token-title-ava").innerHTML = "Select Token";
      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            
            from_network_token: "",
            from_network_amount: "",
          };
      });
    };

    function handle_ol_clear(){ 
      current_ol_token_selection_is = "";
      q(".selection-estimate-available-ol").innerHTML = "Available balance: ---";
      q(".ol-selection-container input").value = "";
      q(".select-token-title-ol").innerHTML = "Select Token";
      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            
            from_network_token: "",
            from_network_amount: "",
          };
      });
    };

    function handle_eth_clear() {
      current_eth_token_selection_is = "";
      q(".selection-estimate-available-eth").innerHTML = "Available balance: ---";
      q(".eth-selection-container input").value = "";
      q(".select-token-title-eth").innerHTML = "Select Token";
      bridge_form_state.update(function(current_value) {
          return {
            from: current_value.from,
            to:  current_value.to,
            from_network_token: "",
            from_network_amount: "",
          };
      });
    }
</script>