import React from 'react';
import { Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useThemeAwareObject } from '../../hooks/useThemeAwareObject';
import { navigate } from '../../navigation';
import { routes } from '../../navigation/Routes';
import createStyles from './styles';
import BackgroundTimer from 'react-native-background-timer';
import MetaMaskSDK from '@metamask/sdk';
import { Linking } from 'react-native';
import { ethers } from 'ethers';
import { Buffer } from "buffer";
import ipfsClient from "ipfs-http-client"
const infuraProjectId = "2NRGYfEEjeqdyXPMplSHP3ZMTPM";
const infuraProjectSecret = "c7897bc682fa34bc6a6a598033ebda43";
const auth =
    'Basic ' + Buffer.from(infuraProjectId + ':' + infuraProjectSecret).toString('base64');
const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});
client.add('Hello World').then((res) => {
    console.log(res);
});

const MMSDK = new MetaMaskSDK({
  openDeeplink: (link) => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'My App', // The name of your application
    url: 'https://myapp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();
const provider = new ethers.providers.Web3Provider(ethereum);

export const ConnectWallet = () => {
  const styles = useThemeAwareObject(createStyles);

  const connectMetamask = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    const contractAddress = '0x0c7d84Fd850D2b0F419040cB6EBD4F8d0490c578';
    const jsonAbi = `
    [
      {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
              },
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              },
              {
                  "indexed": false,
                  "internalType": "string[]",
                  "name": "",
                  "type": "string[]"
              },
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              },
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "name": "CreateNftEvent",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "SetManEvent",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "SetNftEvent",
          "type": "event"
      },
      {
          "inputs": [],
          "name": "M",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "N",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address[]",
                  "name": "x",
                  "type": "address[]"
              },
              {
                  "internalType": "string",
                  "name": "_ipfs",
                  "type": "string"
              },
              {
                  "internalType": "string[]",
                  "name": "_keys",
                  "type": "string[]"
              },
              {
                  "internalType": "string",
                  "name": "_Name",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_meta",
                  "type": "string"
              }
          ],
          "name": "createNft",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address[]",
                  "name": "x",
                  "type": "address[]"
              },
              {
                  "internalType": "string",
                  "name": "_ipfs",
                  "type": "string"
              },
              {
                  "internalType": "string[]",
                  "name": "_keys",
                  "type": "string[]"
              },
              {
                  "internalType": "string",
                  "name": "_Name",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_meta",
                  "type": "string"
              }
          ],
          "name": "createNft0",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "i",
                  "type": "uint256"
              }
          ],
          "name": "getNft",
          "outputs": [
              {
                  "internalType": "contract Nft",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "man",
          "outputs": [
              {
                  "internalType": "contract Man",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "man0",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "nft0",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "nfts",
          "outputs": [
              {
                  "internalType": "contract Nft",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
              }
          ],
          "name": "setMan",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
              }
          ],
          "name": "setNft",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "users",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ]
    `
    const contract = new ethers.Contract(contractAddress, jsonAbi, provider.getSigner());
    
    console.log('======================')
    console.log('getting number of NFTs')
    var result = await contract.N();
    console.log(result)
    console.log('getting NFTs')
    result = await contract.nfts(0);
    console.log(result)
    // var addresses = ["0x2508e420c6B1206417d83C49Fc91cbA10F3Baa64","0x4Dd716CB0A2d77A93077cDAE2D7da7288222cA39"]
    // var ipfs = 'Qmem7WvxmLBPLCzKDzwpahEQyvEzsVs3w4GKkA3NtDWmT1+aes256+93bc814576a3f8a67363771870c948de'
    // var keys = ['']
    // var name = 'Test from mobile app'
    // var meta = 'testing'
    // result = await contract.createNft(1);
    // console.log(result)
    // result = await contract.nfts(addresses, ipfs, keys, name, meta)

    // console.log('=====================')
    // console.log(result)
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // navigate(routes.home);
  }


  return (
    <View style={styles.connectContainer}>
      <Text style={styles.connectTitle}>Connect Your Wallet</Text>
      <PrimaryButton startIcon={<Icons.metamask color={''} />} height={80} onPress={connectMetamask}>Connect MetaMask Wallet</PrimaryButton>
    </View>
  );
};
