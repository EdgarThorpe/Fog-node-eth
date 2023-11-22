import 'bootstrap/dist/css/bootstrap.min.css';
import client_config from '../build/contracts/ClientRegistration.json';
import fog_config from '../build/contracts/FogNodeManagement.json';
import Web3 from 'web3';
import fogConfig from './fognode.json';

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
};

const CLIENT_ADDRESS = client_config.networks['5777'].address;
const CLIENT_ABI = client_config.abi;

const FOG_ADDRESS = fog_config.networks['5777'].address;
const FOG_ABI = fog_config.abi;

let web3;
let client_contact;

const accountEl = document.getElementById('account');
const nodeEl = document.getElementById('nodes');
const nodeEl2 = document.getElementById('fogs');

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

const func = async (rating, fogAddress) => {
    try {
        await client_contact.methods.addRatings().send({
            from: account
        });

        await fog_contact.methods.addRating(fogAddress, rating, 5).send({
            from: account
        });

        await fog_contact.methods.modifyRating(fogAddress).send({
            from: account
        });

        await client_contact.methods.credUpdate(rating, fogAddress).send({
            from: account
        });

        await refreshNodes();

    } catch (error) {
        console.log(error);
    }
}

const refreshNodes = async () => {
    nodeEl.innerHTML = '';
    nodeEl2.innerHTML = '';

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

    for (let i = 1; i <= 4; ++i) {
        const t = i.toString();
        const temp = await fog_contact.methods.givefogNodes(fogConfig[t].public).call();
        const tempel = createElementFromString(
            `<div class="node card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${fogConfig[t].location}</h5>
                <h6 class="card-title">Current Rating: ${fogConfig[t].rating}</h3>
                <div class="form-group">
                    <label for="rating">Rating</label>
                    <input type="email" class="form-control" id="rating${t}" aria-describedby="rating" placeholder="Enter rating">
                </div>
                <button class="btn btn-primary">Submit</button>
            </div>
            </div>`
        );
        tempel.querySelector('button').addEventListener('click', function () {
            const ratingInput = document.getElementById(`rating${t}`);
            func(ratingInput.value, fogConfig[t].public);
        });
        nodeEl2.appendChild(tempel);
    }
    

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
            fog_contact = new web3.eth.Contract(FOG_ABI, FOG_ADDRESS);

            await refreshNodes();
        } catch (error) {
            console.error('Error fetching accounts from MetaMask:', error);
        }
    } else {
        console.error('MetaMask not detected. Please install MetaMask to use this dApp.');
    }
};

main();
