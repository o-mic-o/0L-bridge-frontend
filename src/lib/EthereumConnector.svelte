<div></div>
<script>
import { eth_network_tokens, connected_account_address } from './stores.js';

let load_balances_locally_once = true;
let gwei_convert = 1000000000000000000;
let web3;

const miniABI = [
    {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
    }
];

export function load_balances_for_ethereum() {
    if (load_balances_locally_once) {
        if (typeof Web3 != 'undefined') { web3 = new Web3(window.ethereum); }
        parse_balances_of_eth();
        parse_dai_balances();
        load_balances_locally_once = false;
    }
};

async function parse_balances_of_eth() {
    let this_local_current_connected_account;
    
    connected_account_address.subscribe(function(value){
        this_local_current_connected_account = value;
    });

    await web3.eth.getBalance(this_local_current_connected_account).then(function(value){
        let eth_balance = web3.utils.fromWei(value, 'ether');
        
        eth_network_tokens.update(function(value){
            return {
                "ol":value.ol,
                "eth":eth_balance,
                "usdc":value.usdc,
                "dai":value.dai
            }
        });
    });
};


async function parse_dai_balances() {
    console.log(web3);
    let this_local_current_connected_account;
    
    connected_account_address.subscribe(function(value){
        this_local_current_connected_account = value;
    });

    let tokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";

    var contract = new web3.eth.Contract(miniABI, tokenAddress, { from: this_local_current_connected_account });
    contract.methods.balanceOf(this_local_current_connected_account).call().then(async function(result){
        let dai_balance = web3.utils.fromWei(result, 'ether');

        eth_network_tokens.update(function(value){
            return {
                "ol":value.ol,
                "eth":value.eth,
                "usdc":value.usdc,
                "dai":dai_balance
            }
        });
        
    })
};

</script>