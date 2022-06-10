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
  .label-inner {
    padding:0;
    font-size:16px;
    font-weight: 600;
    text-align: left;
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
  .chain-type-selection-container {
    padding-top:30px;
  }
  .chain-type-selection-container.hide {
    display: none;
  }
  .chain-type-selection-container .label-inner {
    padding-bottom:0;
  }
  .chain-type-selection-container input {
    margin-top:20px;
    padding:18px;
    border-radius: 10px;
    border:1px solid lightgray;
    width:515px;
    font-size:18px;
    color:black;
    font-weight: 600;
  }
 
  .select-token-type {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#dadada;
    padding:10px;
    border-radius: 10px;
    width:130px;
    position: absolute;
    right:-3px;
    top:28px;
    z-index: 1;
    cursor: pointer;
  }
  .select-token-type:hover {
    background-color:#e7f9ff;
  }
  .err {
    color:rgb(255, 52, 52)!important;
  }
  .select-maximum-type {
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    background-color:tomato;
    padding:7px;
    border-radius: 10px;
    width:60px;
    position: absolute;
    right:150px;
    top:31px;
    z-index: 1;
    cursor: pointer;
  }
  .select-maximum-type:hover {
    opacity: 0.8;
  }
</style>

<div>
  <div class="bridge-form reverse">
    <div class="label label-from">From</div>

    <div class="chain-type-container">
        <Select {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select the origin network..."></Select>
        
        <div class="chain-type-selection-container eth-selection-container hide">
          <div class="label-inner label-asset err">Ethereum network support is coming soon!</div>
          <!--<input type="text" placeholder="0.00">-->
        </div>

        <div class="chain-type-selection-container ava-selection-container hide">
          <div class="label-inner label-asset">Asset</div>
          <div style="position:relative;">
            <input on:input={handle_ava_input} type="text" placeholder="0.00">
            <div class="select-maximum-type select-maximum-type-ava">Max</div>
            <div class="select-token-type select-token-type-ava">Select Token <Chevron /></div>
            
            <div class="asset-estimations">
              <div class="estimations">~$0.00</div>
              <div class="estimations">Available balance: ---</div>
            </div>
          </div>
        </div>

        <div class="chain-type-selection-container sol-selection-container hide">
          <div class="label-inner label-asset err">Solana network support is coming soon!</div>
          <!--<input type="text" placeholder="0.00">-->
        </div>
    </div>

    <div class="label label-reverse-from hide">Destination</div>
    <div class="divider"><img on:click={reverse_direction} class="switcher" alt="Switcher icon" src={switcher}></div>
    <div class="label label-to">Destination</div>
    
    <div class="chain-type-container">
      <Select items={to_items} value={to_selected} showChevron={true} on:select={handleToSelect} inputStyles="cursor:pointer;" placeholder="Select the network to connect to..."></Select>
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
    import ol_icon from '/icon.jpg';
    import eth_logo from '/eth_logo.png';
    import Chevron from './ChevronAsset.svelte';
    import Select from 'svelte-select';

    let from_selected = "";
    let is_reversed = true;

    function q(e) { return document.querySelector(e); };

    let items = [
        {value: 'avalanche', label: '<img src="/ava.png" style="width:20px;padding-right:5px;" alt="AVA Logo"/>Avalanche'},
        {value: 'ethereum', label: '<img src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Ethereum'},
        {value: 'solana', label: '<img src="/sol.png" style="width:20px;padding-right:5px;" alt="Solana Logo"/>Solana'}
    ];

    let to_items = [
        {value: '0l', label: '<img src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>0L Network'}
    ];
    let to_selected = to_items[0];

    function handleToSelect(event) {

    };
    
    function handleSelect(event) {
        console.log('selected item', event.detail.value);
        from_selected = event.detail.value;
        if (event.detail.value == "ethereum") {
          q(".eth-selection-container").classList.remove("hide");
          q(".ava-selection-container").classList.add("hide");
          q(".sol-selection-container").classList.add("hide");
        } else if (event.detail.value == "avalanche") {
          q(".eth-selection-container").classList.add("hide");

          if (is_reversed) {
            q(".ava-selection-container").classList.remove("hide");
          } else {
            q(".ava-selection-container").classList.add("hide");
          }

          q(".sol-selection-container").classList.add("hide");
        }  else if (event.detail.value == "solana") {
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
    if (from_selected == "avalanche") {
        q(".ava-selection-container").classList.add("hide");
      }
      if (from_selected == "ethereum") {
        q(".eth-selection-container").classList.remove("hide");
      }
      if (from_selected == "solana") {
        q(".sol-selection-container").classList.remove("hide");
      }
  };
  function transfer_from_dispaly_switch() {
    if (from_selected == "avalanche") {
        q(".ava-selection-container").classList.remove("hide");
      }
      if (from_selected == "ethereum") {
        q(".eth-selection-container").classList.remove("hide");
      }
      if (from_selected == "solana") {
        q(".sol-selection-container").classList.remove("hide");
      }
  };

  function reverse_direction() {

    let this_bridge_form = q(".bridge-form");
    if (this_bridge_form.classList.contains("reverse")) { // Then it's a transfer to OL
      is_reversed = false;
      this_bridge_form.classList.remove("reverse");
      
      q(".label-from").classList.add("hide");
      q(".label-to").classList.add("hide");


      q(".label-reverse-from").classList.remove("hide");
      q(".label-reverse-to").classList.remove("hide");
      
      console.log(from_selected);
      
      hide_selection_containers();
      transfer_to_display_switch();
    } else { // Then it's a transfer from 0L 
      this_bridge_form.classList.add("reverse");
      is_reversed = true;

      q(".label-from").classList.remove("hide");
      q(".label-to").classList.remove("hide");

      q(".label-reverse-from").classList.add("hide");
      q(".label-reverse-to").classList.add("hide");

      hide_selection_containers();
      transfer_from_dispaly_switch();

    }
  };

  function handle_ava_input(e) {
    if (isNaN(Number(e.target.value))) {
      e.target.classList.add("err");
    } else {
      e.target.classList.remove("err");
    }
  };  
</script>