<style>
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
.label-inner {
    padding:0;
    font-size:16px;
    font-weight: 600;
    text-align: left;
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
  .chain-type-selection-container .err {
    color:rgb(255, 52, 52);
  }
  .chain-type-selection-container {
    --borderRadius: 10px;
    --itemIsActiveBG: #e7f9ff;
    --itemHoverColor: black;
    --itemHoverBG: #e7f9ff;
    --itemIsActiveColor: black;
    --background:#dadada;
    --inputFontSize: 18px;
    --height:44px;
    --hover:red;
    --border:1px solid transparent;
    --indicatorTop:13px;
    --indicatorRight:8px;
    --border:none;
    --placeholderColor:black;
    --indicatorColor:black;
  }

</style>
<div class="chain-type-selection-container hide {selection_container_type}">

    {#if is_enabled}

        <div class="label-inner">Asset</div>
        <div style="position:relative;">
        <input on:input={handle_this_type_input} type="text" placeholder="0.00">
        <MaxButton this_max_button_process={(e) => incoming_max_button_process(e)} current_type={select_maximum_type}/>

        <Select containerClasses="select-token-type {select_token_type}" items={to_select_token_items_ol} showChevron={true} on:select={handle_this_token_select} on:clear={handle_this_token_clear} inputStyles="cursor:pointer;" placeholder="Select Token"></Select>

        <div class="asset-estimations">
            <div class="estimations">~$0.00</div>
            <div class="estimations {selection_container_available_balance}">Available balance: ---</div>
        </div>
        </div>

    {:else}

        <div class="label-inner label-asset err">{is_false_message}</div>
        
    {/if}
  </div>

<script>
    export let selection_container_type;
    export let select_token_type;
    export let select_maximum_type;
    export let is_enabled;
    export let incoming_max_button_process;
    export let handle_this_type_input;
    export let selection_container_available_balance;
    export let handle_this_token_select;
    export let handle_this_token_clear;

    export let is_false_message = "This network support is coming soon!";
    import MaxButton from './MaxButton.svelte';
    import Select from 'svelte-select';
    

    let to_select_token_items_ol = [
        {value: 'ol', label: '<img src="/icon.jpg" style="width:20px;padding-right:5px;" alt="0L Logo"/>0L'},
        {value: 'eth', label: '<img src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="0L Logo"/>ETH'}
    ];


</script>