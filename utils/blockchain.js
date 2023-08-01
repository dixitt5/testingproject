import {
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react-native';
import { CONTRACT_ABI,CONTRACT_ADDRESS } from '../constants';

 const getContract = async () => {
    try {
        const {contract} = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
        return contract;
    } catch (error) {
        console.error(error);
    }
}

 const getCollections = async (address) => {
  try {
    const contract = getContract();
    const {data} = useContractRead(contract, 'getCollectionIdByOwner', [address]);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
