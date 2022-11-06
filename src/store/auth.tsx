import { createContext, ReactNode, useState, useEffect } from "react";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

interface IAuthContext {
  address: string | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  provider: Web3Provider | undefined;
  // setAddress: (address: string) => void;
  // setProvider: (provider: Web3Provider) => void;
  // setSigner: (signer: ethers.providers.JsonRpcSigner) => void;
  connectWallet: () => Promise<Web3Provider>;
}

export const AuthContext = createContext<IAuthContext>({
  address: undefined,
  signer: undefined,
  provider: undefined,
  // setProvider: () => {},
  // setSigner: () => {},
  connectWallet: async () => {
    return "" as any;
  }
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined);
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined);

  useEffect(() => {
    /* Check if the user connected with wallet */
    if (!(provider && address)) return;

    provider.on("accountsChanged", (address: string) => {
      console.log(address);
    });
    try {
      /* Function to check if the network is the correct one */
      // checkNetwork(provider);
    } catch (error) {
      /* Display error message */
      // alert(error.message);
    }
  }, [provider, address]);

  const connectWallet = async () => {
    try {
      /* Function to detect most providers injected at window.ethereum */
      const detectedProvider = (await detectEthereumProvider()) as ExternalProvider;

      /* Check if the Ethereum provider exists */
      if (!detectedProvider) {
        throw new Error("Please install MetaMask!");
      }

      /* Ethers Web3Provider wraps the standard Web3 provider injected by MetaMask */
      const web3Provider = new ethers.providers.Web3Provider(detectedProvider);

      web3Provider.on("accountsChanged", (address: string) => {
        console.log(address);
      });

      /* Connect to Ethereum. MetaMask will ask permission to connect user accounts */
      await web3Provider.send("eth_requestAccounts", []);

      /* Get the signer from the provider */
      const signer = web3Provider.getSigner();

      /* Get the address of the connected wallet */
      const address = await signer.getAddress();

      /* Set the providers in the state variables */
      setProvider(web3Provider);

      /* Set the address in the state variable */
      setAddress(address);
      setSigner(signer);

      return web3Provider;
    } catch (error) {
      /* Throw the error */
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        address,
        signer,
        provider,
        connectWallet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
