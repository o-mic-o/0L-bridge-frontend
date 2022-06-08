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
  button:focus {
    border: 2px solid #ff3e00;
  }
  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
  .bridge-form {
    position: relative;
    margin-top:25px;
    border:2px solid #f5f0f0;
    width:600px;
    height:325px;
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
    padding:10px 0 30px 30px;
    display:flex;
    align-items:center;
    justify-content: flex-start;
  }
  .chain-type-container img {
    width:40px;
  }
  .switcher{
    width:60px;
    position:relative;
    top:-30px;
  }
</style>

<div>
  <div class="bridge-form">
    <div class="label">From</div>
    
    <div class="chain-type-container">
      <img src={eth_logo} alt="Ethereum Logo" />
      <div class="chain-type" style="padding:20px;text-align:left;">Ethereum</div>
    </div>

    <div class="divider"><img class="switcher" alt="Switcher icon" src={switcher}></div>

    <div class="label">To</div>
    <div class="chain-type-container">
      <img src={ol_icon} alt="0L Logo" />
      <div class="chain-type" style="padding:20px;text-align:left;">0L Network</div>
    </div>
  </div>
  
  <div class="estimations">
      <div>Estimated transfer fee</div>
      <div>Estimated transfer fee</div>
  </div>
  <button on:click={is_submitting}>Transfer</button>
</div>

<script>
    import switcher from '../assets/switcher.png';
    import ol_icon from '../assets/icon.jpg';
    import eth_logo from '../assets/eth_logo.png';

  function is_submitting() {
    alert("Submitted!");
  }
</script>