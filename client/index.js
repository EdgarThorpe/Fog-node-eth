import 'bootstrap/dist/css/bootstrap.min.css';
import client_config from '../build/contracts/ClientRegistration.json';
import fog_config from '../build/contracts/FogNodeManagement.json';
import Web3 from 'web3';
import fogConfig from './fognode.json';
import blch from './resources/blch.jpg';
import userpic from './resources/user.jpeg';
import sad from './resources/sad.jpeg'

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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
const head = document.getElementById('container');

const clear = async () => {
    try {
        await client_contact.methods.clearRegister().send({
            from: account,
            gas: 2000000, // Adjust the gas limit based on your contract's requirements
  gasPrice: '20000000000',
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
            value: web3.utils.toWei('0.1', 'ether'),
            gas: 1000000,
        });
        // Registration successful, you can add any logic you need here.
        await refreshNodes();
    } catch (error) {
        console.log(error);
        //alert("User already registered!!");
    }
};

const func = async (rating, fogAddress, cred) => {
    try {
        
        const user = await client_contact.methods.giveClient(account).call();
        if(user?.owner === ZERO_ADDRESS) {
            alert("Register first");
            return;
        }
        await client_contact.methods.addRatings().send({
            from: account,
            gas: 2000000, // Adjust the gas limit based on your contract's requirements
            gasPrice: '20000000000',
        });

        await fog_contact.methods.addRating(fogAddress, rating, cred).send({
            from: account,
            gas: 2000000, // Adjust the gas limit based on your contract's requirements
            gasPrice: '20000000000',
        });

        await fog_contact.methods.modifyRating(fogAddress).send({
            from: account,
            gas: 2000000, // Adjust the gas limit based on your contract's requirements
            gasPrice: '20000000000',
        });

        await client_contact.methods.credUpdate(rating, fogAddress).send({
            from: account,
            gas: 2000000, // Adjust the gas limit based on your contract's requirements
            gasPrice: '20000000000',
        });

        await refreshNodes();

    } catch (error) {
        console.log(error);
    }
}

const refreshNodes = async () => {
    nodeEl.innerHTML = '';
    nodeEl2.innerHTML = '';

    const user = await client_contact.methods.giveClient(account).call();
    console.log(user);

    const nodetemp = createElementFromString(
        `<div class="node card" style="width: 18rem;">
            <img src=${user?.owner===ZERO_ADDRESS?sad:userpic} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Your credibility: ${user?.owner===ZERO_ADDRESS?"Not registered":user?.credibility} times</h5>
                <h6 class="card-title">You have rated: ${user?.owner===ZERO_ADDRESS?"Not registered":user?.ratings + " times"}</h6>
                <button class="btn btn-primary">Register</button>
            </div>
        </div>`
    );

    // const temp2 = createElementFromString(
    //     `<div class="node card" style="width: 18rem;">
    //         <img src="" class="card-img-top" alt="...">
    //         <div class="card-body">
    //             <h5 class="card-title">Check This Device</h5>
    //             <button class="btn btn-primary">Clear</button>
    //         </div>
    //     </div>`
    // );

    const temp3 = createElementFromString(
        `<div class="node card" style="width: 54rem;">
            <div class="card-body">
                <h4 class="card-title"> USER INFO </h4>
                <h5 class="card-title">My Address = ${user?.owner}</h5>
                <h5 class="card-title">My Credibility = ${user?.credibility}</h5>
                <h5 class="card-title">I have rated = ${user?.ratings}</h5>
            </div>
        </div>`
    );
    
    for (let i = 1; i <= 4; ++i) {
        const t = i.toString();
        const temp = await fog_contact.methods.givefogNodes(fogConfig[t].public).call();
        console.log(temp);
        const r1 = temp?.credsum==0?"No reviews":temp?.rating/temp?.credsum;
        const tempel = createElementFromString(
            `<div class="node card" style="width: 18rem;">
            <img src=${blch} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${temp?.location}</h5>
                <h6 class="card-title">Current Rating: ${r1}</h3>
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
            func(ratingInput.value, fogConfig[t].public, user?.credibility);
        });
        nodeEl2.appendChild(tempel);
    }
    

    nodetemp.querySelector('button').addEventListener('click', register);
    // temp2.querySelector('button').addEventListener('click', clear);
    // nodeEl.appendChild(temp2);
    nodeEl.appendChild(nodetemp);
    nodeEl.appendChild(temp3);

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

            // fog_contact.methods.registerFogNode(fogConfig[1].location, fogConfig[1].pc, fogConfig[1].rating).send({
            //     from: fogConfig[1].public,
            // });
            // fog_contact.methods.registerFogNode(fogConfig[2].location, fogConfig[2].pc, fogConfig[2].rating).send({
            //     from: fogConfig[2].public,
            // });
            // fog_contact.methods.registerFogNode(fogConfig[3].location, fogConfig[3].pc, fogConfig[3].rating).send({
            //     from: fogConfig[3].public,
            // });
            // fog_contact.methods.registerFogNode(fogConfig[4].location, fogConfig[4].pc, fogConfig[4].rating).send({
            //     from: fogConfig[4].public,
            // });

            await refreshNodes();
        } catch (error) {
            console.error('Error fetching accounts from MetaMask:', error);
        }
    } else {
        //head.innerHTML = '';
        //console.log(head);
        alert('MetaMask not detected. Please install MetaMask to use this dApp.');
            // const mes = createElementFromString(
            //     `<div class="alert alert-danger" role="alert">
            //         <h5>Please connect to MetaMask.</h5>
            //     </div>`
            // );
            // head.appendChild(mes);
    }
};

main();
