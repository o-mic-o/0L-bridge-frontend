<style>
.connect-button-container {
    display:relative;
    display:flex;
    justify-content:center;
    align-items: center;
}
.connect-button {
    padding:8px 20px 8px 20px;
    background-color:#ff5958;
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
    background-color: #fe7676;
}
#connect-container {
    border:1px solid lightgray;
    width:405px;
    background-color:white;
    position:absolute;
    top:75px;
    right:5px;
    border-radius: 20px;
    z-index: 99999;
}
.hide {
    display:none;
}
.connect-title {
    color:black;
    font-size:22px;
    padding:20px 0 20px 0px;
    text-align: center;
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
    --inputFontSize: 18px;
    --height:60px;
    --indicatorTop:18px;
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
  @media screen and (max-width:960px) {
    #connect-container {
        width:100%;
        top:85px;
        right:0;
    }
    .chain-type-container {
        width:90%;
    }
  
  }
</style>

<div class="connect-button-container">
    <div on:click={connect_button_process} id="connect-button" data-typeid="connect" class="connect-button connect-button-flex">
        <div id="connect-button-logo" class="hide">
           
        </div>
        <div id="connect-button-text">Connect</div>
    </div>
    <div id="connect-container" class="connect-container hide">
        <div class="connect-title">Connect Wallet</div>
        <div class="divider"></div>
        
        <div class="chain-type-container">
            <Select isSearchable={true} {items} showChevron={true} on:select={handleSelect} inputStyles="cursor:pointer;z-index:9;" placeholder="Select network..."></Select>
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
    <EthereumConnector bind:load_balances_for_ethereum={load_balances_for_ethereum}/>
</div>

<script>
    import { connected_account_address, is_connected_account, connect_account_type } from './stores.js';

    //import eth_logo from '../assets/eth_logo.png';
    import metamask_logo from '/metamask.png';
    import connect_logo from '/walletconnect.png';
    import coinbase_logo from '/coinbase_logo.png';
    import eth_logo from "/eth_logo.png";
    import ava_logo from "/ava.png";
    import sol_logo from "/sol.png";
    import Select from 'svelte-select';
    import EthereumConnector from './EthereumConnector.svelte';

    let load_connection_locally_once = true;
    let WAIT_FOR_LOAD_TIME = 100;

    let load_balances_for_ethereum; //From EthereumConnector

    //Mapping for chainIds, icon_logo, name for connect_account_type in store.
    let chain_id_mapping = [
        ["0x1", "eth_logo.png", "eth", "Ethereum on Metamask detected."],
        ["0xa86a", "ava.png", "ava", "Avalanche on Metamask detected."]
    ];

    let items = [
        {value: 'avalanche', label: '<img src="/ava.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Avalanche'},
        {value: 'ethereum', label: `<img src="/eth_logo.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Ethereum`},
        {value: 'solana', label: '<img src="/sol.png" style="width:20px;padding-right:5px;" alt="Ethereum Logo"/>Solana'},
    ];


    wait_for_ethereum_load();

    function wait_for_ethereum_load() {
        setTimeout(function(){
            let was_found = false;
            if (typeof window.ethereum != 'undefined' && window.ethereum.selectedAddress) {
                if (typeof window.web3.currentProvider != 'undefined') {  
                    parse_local_store();  
                    loading_web3_process();
                    was_found = true;
                }
            }
            if (!was_found) {
                wait_for_ethereum_load();
            }
        },WAIT_FOR_LOAD_TIME);
    };
   
  
    function parse_local_store() {
        is_connected_account.subscribe(function(is_connect){
            if (is_connect) {
                loading_web3_process();
            }
        });
    };

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
    
    async function loading_web3_process() {
        if (typeof window.ethereum != 'undefined' && window.ethereum.selectedAddress) {
            if (typeof window.web3.currentProvider != 'undefined') {    

                for (var i=0; i < chain_id_mapping.length; i++) {
                    if (window.web3.currentProvider.chainId == chain_id_mapping[i][0]) {

                        if (load_connection_locally_once) {
                            load_metmask_as_title(chain_id_mapping[i][1]);
                            connect_account_type.update(function(value) {
                                return chain_id_mapping[i][2];
                            });
                            is_connected_account.update(function(value_is){
                                return true;
                            });

                            load_connection_locally_once = false;
                        }

                    }
                }

            }
        }

    };

    async function connect_button_process() {
        //loading_web3_process();
        hide_show_connect_container();
    }
    
    function hide_show_connect_container() {
        let this_connect_container = q("#connect-container");
        if (this_connect_container.classList.contains("hide")) {
            q("#connect-container").classList.remove("hide");
        } else {
            q("#connect-container").classList.add("hide");
        }
    };

    

    async function load_metmask_as_title(type) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        

        connected_account_address.update(function(value){
            return account;
        });
        
        load_balances_for_ethereum();

        q("#connect-button").classList.add("connect-button-flex");
        q("#connect-button-logo").innerHTML = '<img src="/'+type+'" alt="Metmask Logo" style="width:20px;padding-right:10px;"/>';
        q("#connect-button-logo").classList.remove("hide");
        q("#connect-button-text").classList.add("truncate-address");
        q("#connect-button-text").innerHTML = account;
    };

    async function connect_metamask() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            load_metmask_as_title("eth_logo.png");
            q("#connect-container").classList.add("hide");
        }
    }

    async function connect_ava() {
        const AVALANCHE_MAINNET_PARAMS = {
            chainId: '0xA86A',
            chainName: 'Avalanche Mainnet C-Chain',
            nativeCurrency: {
                name: 'Avalanche',
                symbol: 'AVAX',
                decimals: 18
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io/']
        };
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [AVALANCHE_MAINNET_PARAMS]
            }).then(() => {
                load_metmask_as_title("ava.png");
                q("#connect-button").click();
            });
        }
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