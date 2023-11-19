import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import client_config from '../build/contracts/ClientRegistration.json';

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
};

const CLIENT_ADDRESS = client_config.networks['5777'].address;
const CLIENT_ABI = client_config.abi;

const web3 = new Web3('http://127.0.0.1:7545');
const client_contact = new web3.eth.Contract(CLIENT_ABI, CLIENT_ADDRESS);

let account;

const accountEl = document.getElementById('account');
const nodeEl = document.getElementById('nodes');

const register = async () => {
    try {
        await client_contact.methods.registerClient().send({ from: account });
        // Registration successful, you can add any logic you need here.
        await refreshNodes();
    } catch (error) {
        alert("User already registered!!");
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

    nodetemp.querySelector('button').addEventListener('click', register);
    nodeEl.appendChild(nodetemp);
};

const main = async () => {
    if (window.ethereum) {
        try {
            // Requesting accounts using MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            console.log(account);
            accountEl.innerText = account;
            await refreshNodes();
        } catch (error) {
            console.error('Error fetching accounts from MetaMask:', error);
        }
    } else {
        console.error('MetaMask not detected. Please install MetaMask to use this dApp.');
    }
};

main();
