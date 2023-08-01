import React, {useState, useEffect} from 'react';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../constants';
import {ConnectWallet} from '@thirdweb-dev/react-native';
import {
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react-native';
import {Web3Button} from '@thirdweb-dev/react-native';
import {useAddress} from '@thirdweb-dev/react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import db from '../utils/firebase';

function AppInner() {
  const {contract} = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const [nftData, setNftData] = useState([]);
  const [add, setAddress] = useState('');
  const [userCollections, setUserCollections] = useState([]);
  const address = useAddress();
  const {data} = useContractRead(contract, 'getCollectionIdByOwner', [add]);
  const {mutateAsync, isLoading, error} = useContractWrite(
    contract,
    'createCollection',
  );

  // useEffect(() => {
  const getNFTCollections = async () => {
    try {
      const collections = [];
      // console.log(address);
      const q = query(
        collection(db, 'Collection'),
        where('owner', '==', '0xDf201019A4abd8A5386e443C051DD9eF35d37AA1'),
      );
      onSnapshot(q, querySnapshot => {
        querySnapshot.forEach(doc => {
          collections.push(doc.data());
        });
        setUserCollections(collections);
        console.log('Updated userCollections:', collections);
      });
    } catch (error) {
      console.error('Error fetching NFT collections:', error);
    }
  };

  //   getNFTCollections();
  // }, []);

  const getCollections = async () => {
    try {
      console.log(add);
      if (data != []) {
        setNftData(data.toString());
      } else {
        setNftData(['empty']);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setAddress(address);
  }, []);

  return (
    <SafeAreaView>
      <ConnectWallet />
      <Text>Hello</Text>
      {/* <Web3Button
          contractAddress={CONTRACT_ADDRESS}
          action={() => mutateAsync({args: ['My Name']})}
          >
          Send Transaction
        </Web3Button> */}
      <Button
        title="get"
        onPress={() => {
          getCollections();
        }}>
        Get
      </Button>
      <Button
        title="Create"
        onPress={() => {
          getCollections();
        }}></Button>
      {/* <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        contractAbi={CONTRACT_ABI}
        action={() =>
          mutateAsync({
            args: ['dixit', ['asjddfaf'], '345'],
            overrides: {
              from: add,
            },
          })
        }>
        Send Transaction
      </Web3Button> */}
      <Text>{nftData ? nftData.toString() : 'null'}</Text>
    </SafeAreaView>
  );
}

export default AppInner;
