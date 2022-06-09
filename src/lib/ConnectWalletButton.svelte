<style>
.connect-button {
    padding:10px 20px 10px 20px;
    background-color:tomato;
    color:white;
    border-radius: 30px;
    margin-right:15px;
    cursor: pointer;
}
.connect-button:hover {
    background-color: rgb(252, 127, 105);
}
.connect-container {
    border:1px solid lightgray  ;
    width:400px;
    background:white;
    z-index: 1;
    position:absolute;
    top:60px;
    right:15px;
    border-radius: 20px;
}
.hide {
    display:none;
}
.connect-title {
    color:black;
    font-size:22px;
    padding:20px 0 20px 0px;
}
.divider {
    width:100%;
    background-color:#f5f0f0;
    height:2px;
  }
  .chain-type {
    padding:20px;
    text-align:left;
    font-size:18px;
    font-weight: 600;
    color:black;
  }
  .chain-wallet-container {
    margin:10px 20px 10px 20px;
    display:flex;
    align-items:center;
    justify-content: center;
    border:1px solid #f5f0f0;
    border-radius: 20px;
    cursor:pointer;
  }
  .chain-wallet-container:hover {
      background-color:#e7f9ff;
  }
  .chain-wallet-container img {
      width:25px;
  }
  .chain-type-container{
    padding:10px 0 10px 30px;
    display:flex;
    align-items:center;
    justify-content: flex-start;
  }
  .chain-type-container img {
    width:40px;
  }
  .wallet-type {
    padding:20px 10px 20px 10px;
    font-size:18px;
    font-weight: 300;
    color:black;
  }

</style>

<div style="display:relative;">
    <div on:click={connect_button_process} id="connect-button" data-typeid="connect" class="connect-button">Connect Wallet</div>
    <div id="connect-container" class="connect-container hide">
        <div class="connect-title">Connect Wallet</div>
        <div class="divider"></div>
        
        <div class="chain-type-container">
            <img src={eth_logo} alt="Ethereum Logo" />
            <div class="chain-type">Ethereum network</div>
        </div>
        
        <div class="divider"></div>

        <div class="selections-eth">
            <div on:click={connect_metamask} class="chain-wallet-container">
                <img src={metamask_logo} alt="Metmask Logo" />
                <div class="wallet-type">Metamask</div>
            </div>
            <div on:click={wallet_connect_connection} class="chain-wallet-container">
                <img src={connect_logo} alt="Wallet Connect Logo" />
                <div class="wallet-type">Wallet Connect</div>
            </div>
            <div on:click={coinbase_connection}  class="chain-wallet-container">
                <img src={coinbase_logo} alt="Coinbase Wallet Logo" />
                <div class="wallet-type">Coinbase Wallet</div>
            </div>
        </div>
    </div>
</div>

<script>
    import eth_logo from '../assets/eth_logo.png';
    import metamask_logo from '../assets/metamask.png';
    import connect_logo from '../assets/walletconnect.png';
    import coinbase_logo from '../assets/coinbase_logo.png';

    function connect_button_process() {
        let this_connect_container = document.querySelector("#connect-container");
        if (this_connect_container.classList.contains("hide")) {
            document.querySelector("#connect-container").classList.remove("hide");
        } else {
            document.querySelector("#connect-container").classList.add("hide");
        }
    }

    function connect_metamask() {
        alert("Metmask connection.");
    }

    function wallet_connect_connection() {
        alert("Wallet connect connection.");
    }
    function coinbase_connection() {
        alert("Coinbase wallet connection.");
    }
</script>