import { useContext, useState } from "react";
import { ethers } from "ethers";

import { AuthContext } from "./store/auth";

export default function Books() {
  const { address, connectWallet, provider, signer } = useContext(AuthContext);
  const [total, setTotal] = useState<string | undefined>(undefined);

  // const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  // const connect = async () => {
  //   const accounts = await provider.send("eth_requestAccounts", []);
  //   console.log(accounts);
  //   var signer = await provider.getSigner();
  //   setAddress(await signer.getAddress());
  // };

  const getBalance = async () => {
    if (provider) {
      const number = await provider?.getBalance(address as string);
      setTotal(ethers.utils.formatEther(number));
      console.log(ethers.utils.formatEther(number));
    }
  };

  const sign = async () => {
    // var signer = await provider?.getSigner();
    const signerStr = await signer?.signMessage("test");
    console.log("signer", signerStr);
  };

  const disconnect = function () {
    connectWallet();
  };

  return (
    <div>
      <p>你的地址:{address}</p>
      <button onClick={connectWallet}>连接钱包</button>
      <button onClick={disconnect}>disconnect</button>
      <button onClick={getBalance}>余额：{total}</button>
      <button onClick={sign}>签名</button>
    </div>
  );
}
