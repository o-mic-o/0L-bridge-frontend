<style>
.connect-button {
    padding:10px 20px 10px 20px;
    background-color:tomato;
    color:white;
    border-radius: 30px;
    margin-right:15px;
    cursor: pointer;
    min-width:100px;
}
.connect-button.connect-button-flex {
    display:flex;
    align-items: center;
    justify-content: center;
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
    width:340px;
    padding:25px 0 25px 30px;
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
  .wallet-type {
    padding:20px 10px 20px 10px;
    font-size:18px;
    font-weight: 300;
    color:black;
  }
  #connect-button-logo.hide {
      display:none;
  }
  #connect-button-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
 #connect-button-logo img {
    width:20px;
    padding-right:10px;
 }

</style>

<div style="display:relative;">
    <div on:click={connect_button_process} id="connect-button" data-typeid="connect" class="connect-button connect-button-flex">
        <div id="connect-button-logo" class="hide">
            <img src={metamask_logo} alt="Metmask Logo" />
        </div>
        <div id="connect-button-text">Connect Wallet</div>
    </div>
    <div id="connect-container" class="connect-container hide">
        <div class="connect-title">Connect Wallet</div>
        <div class="divider"></div>
        
        <div class="chain-type-container">
            <Select {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;" placeholder="Select the network to connect to..."></Select>
        </div>
        
        <div class="chain-divider divider hide"></div>

        <div class="selections-eth hide">
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

        <div class="selections-ava hide">
            <div on:click={connect_ava} class="chain-wallet-container">
                <img src={ava_logo} alt="Ava Logo" />
                <div class="wallet-type">AVA Connect</div>
            </div>
        </div>     

        <div class="selections-sol hide">
            <div on:click={connect_sol} class="chain-wallet-container">
                <img src={sol_logo} alt="Solana Logo" />
                <div class="wallet-type">Solana Connect</div>
            </div>
        </div>    

    </div>
</div>

<script>
    
    //import eth_logo from '../assets/eth_logo.png';
    import metamask_logo from '../assets/metamask.png';
    import connect_logo from '../assets/walletconnect.png';
    import coinbase_logo from '../assets/coinbase_logo.png';
    import ava_logo from "../assets/ava.png";
    import sol_logo from "../assets/sol.png";
    import Select from 'svelte-select';

    let items = [
        {value: 'ethereum', label: '<img src="/src/assets/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Ethereum'},
        {value: 'avalanche', label: '<img src="/src/assets/ava.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Avalanche'},
        {value: 'solana', label: '<img src="/src/assets/sol.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Solana'},
    ];


    function handleSelect(event) {
        console.log('selected item', event.detail.value);
        if (event.detail.value == "ethereum") {
            q(".selections-eth").classList.remove("hide");
            q(".chain-divider").classList.remove("hide");
            q(".selections-sol").classList.add("hide");
            q(".selections-ava").classList.add("hide");
        } else if (event.detail.value == "avalanche") {
            q(".selections-ava").classList.remove("hide");
            q(".selections-eth").classList.add("hide");
            q(".selections-sol").classList.add("hide");
            q(".chain-divider").classList.remove("hide");
        }  else if (event.detail.value == "solana") {
            q(".selections-ava").classList.add("hide");
            q(".selections-sol").classList.remove("hide");
            q(".selections-eth").classList.add("hide");
            q(".chain-divider").classList.remove("hide");
        } else {
            q(".selections-eth").classList.add("hide");
            q(".selections-sol").classList.add("hide");
            q(".selections-ava").classList.add("hide");
            q(".chain-divider").classList.add("hide");
        }
    }

    function q(incoming) { return document.querySelector(incoming); };


   //check_for_web3(); // Enable for metamask

    async function check_for_web3() {
        if (typeof window.ethereum != 'undefined') {
            let this_selected_address = await window.ethereum.selectedAddress;
            if (this_selected_address == null) {
                console.log("Disconnected");
            } else {
                connect_metamask();
            }
        }
    };
    
    async function connect_button_process() {
        if (typeof window.ethereum != 'undefined' && window.ethereum.selectedAddress) {
            load_metmask_as_title();
        } 

        let this_connect_container = q("#connect-container");
        if (this_connect_container.classList.contains("hide")) {
            q("#connect-container").classList.remove("hide");
        } else {
            q("#connect-container").classList.add("hide");
        }
    }
    

    async function load_metmask_as_title() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        q("#connect-button").classList.add("connect-button-flex");
        q("#connect-button-logo").classList.remove("hide");
        q("#connect-button-text").classList.add("truncate-address");
        q("#connect-button-text").innerHTML = account;
    };

    async function connect_metamask() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            load_metmask_as_title();
            q("#connect-container").classList.add("hide");
        }
    }

    async function connect_ava() {
        alert("connecting to ava.");
    };

    async function connect_sol() {
        alert("Connecting to sol.");
    };

    function wallet_connect_connection() {
        alert("Wallet connect connection.");
    }
    function coinbase_connection() {
        alert("Coinbase wallet connection.");
    }
</script>