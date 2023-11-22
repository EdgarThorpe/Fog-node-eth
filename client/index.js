import 'bootstrap/dist/css/bootstrap.min.css';
import client_config from '../build/contracts/ClientRegistration.json';
import Web3 from 'web3';

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
};

const CLIENT_ADDRESS = client_config.networks['5777'].address;
const CLIENT_ABI = client_config.abi;

let web3;
let client_contact;

const accountEl = document.getElementById('account');
const nodeEl = document.getElementById('nodes');

const clear = async () => {
    try {
        await client_contact.methods.clearRegister().send({
            from: account,
        });
        await refreshNodes();
    } catch (error) {
        console.log(error);
    }
};

const register = async () => {
    try {
        await client_contact.methods.registerClient().send({
            from: account,
            value: web3.utils.toWei('11', 'ether'),
            gas: 1000000,
        });
        // Registration successful, you can add any logic you need here.
        await refreshNodes();
    } catch (error) {
        console.log(error);
        //alert("User already registered!!");
    }
};

const refreshNodes = async () => {
    nodeEl.innerHTML = '';

    const nodetemp = createElementFromString(
        `<div class="node card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Check This Device</h5>
                <button class="btn btn-primary">Register</button>
            </div>
        </div>`
    );

    const temp2 = createElementFromString(
        `<div class="node card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Check This Device</h5>
                <button class="btn btn-primary">Clear</button>
            </div>
        </div>`
    );

    nodetemp.querySelector('button').addEventListener('click', register);
    temp2.querySelector('button').addEventListener('click', clear);
    nodeEl.appendChild(temp2);
    nodeEl.appendChild(nodetemp);

    
};

const main = async () => {
    if (window.ethereum) {
        try {
            // Initialize web3 with the Ethereum provider
            web3 = new Web3(window.ethereum);
            // Requesting accounts using MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            console.log(account);
            accountEl.innerText = account;

            // Initialize the contract using the web3 instance
            client_contact = new web3.eth.Contract(CLIENT_ABI, CLIENT_ADDRESS);

            await refreshNodes();
        } catch (error) {
            console.error('Error fetching accounts from MetaMask:', error);
        }
    } else {
        console.error('MetaMask not detected. Please install MetaMask to use this dApp.');
    }
};

main();
