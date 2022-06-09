<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: white;
    background-color: tomato;
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
  .estimations {
    color:#888888;
    display:flex;
    align-items:center;
    justify-content: center;

    margin:12px 0 12px 0;
  }
  .estimations div {
    padding:0 30px 0 30px;
    font-size:14px;
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
</style>

<div>
  <div class="bridge-form reverse">
    <div class="label label-from">From</div>

    <div class="chain-type-container">
      <Select {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select the network to connect to..."></Select>
    </div>

    <div class="label label-reverse-from hide">From</div>
    <!--<div class="chain-type-container">
      <img src={eth_logo} alt="Ethereum Logo" />
      <div class="chain-type" style="padding:20px;text-align:left;">Ethereum</div>
    </div>-->

    <div class="divider"><img on:click={reverse_direction} class="switcher" alt="Switcher icon" src={switcher}></div>

    <div class="label label-to">To</div>
    <!--<div class="chain-type-container">
      <img src={ol_icon} alt="0L Logo" />
      <div class="chain-type" style="padding:20px;text-align:left;">0L Network</div>
    </div>-->
    <div class="chain-type-container">
      <Select items={to_items} value={to_selected} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select the network to connect to..."></Select>
    </div>

    <div class="label label-reverse-to hide">From</div>
    
  </div>
  
  <div class="estimations">
      <div>Estimated transfer fee</div>
      <div>Estimated transfer fee</div>
  </div>
  <button disabled on:click={is_submitting}>Transfer</button>
</div>

<script>
    import switcher from '/switcher.png';
    import ol_icon from '/icon.jpg';
    import eth_logo from '/eth_logo.png';

    import Select from 'svelte-select';
    function q(e) { return document.querySelector(e); };

    let items = [
        {value: 'ethereum', label: '<img src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Ethereum'},
        {value: 'avalanche', label: '<img src="/ava.png" style="width:20px;padding-right:5px;" alt="AVA Logo"/>Avalanche'},
        {value: 'solana', label: '<img src="/sol.png" style="width:20px;padding-right:5px;" alt="Solana Logo"/>Solana'},
    ];

    let to_items = [
        {value: '0l', label: '<img src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>0L Network'}
    ];
    let to_selected = to_items[0];

    function handleToSelect(event) {

    };
    
    function handleSelect(event) {
        console.log('selected item', event.detail.value);
        if (event.detail.value == "ethereum") {
          console.log("Eth selected");
        } else if (event.detail.value == "avalanche") {
          console.log("ava selected");
        }  else if (event.detail.value == "solana") {
          console.log("sol selected");
        } else {
          console.log("n/a selected");
        }
    }

  function is_submitting() {
    alert("Submitted!");
  }
  function reverse_direction() {
    console.log("Reverseing");
    let this_bridge_form = q(".bridge-form");
    if (this_bridge_form.classList.contains("reverse")) {
      this_bridge_form.classList.remove("reverse");
      
      q(".label-from").classList.add("hide");
      q(".label-to").classList.add("hide");


      q(".label-reverse-from").classList.remove("hide");
      q(".label-reverse-to").classList.remove("hide");

    } else {
      this_bridge_form.classList.add("reverse");

      q(".label-from").classList.remove("hide");
      q(".label-to").classList.remove("hide");

      q(".label-reverse-from").classList.add("hide");
      q(".label-reverse-to").classList.add("hide");
    }
  };
</script>