import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";
import WhitelistManager from "./WhitelistManager";
import { ethers } from "ethers";

// IMG
import preview from "../preview.png";

// Components
import Navigation from "./Navigation";
import Data from "./Data";
import Mint from "./Mint";
import Loading from "./Loading";

// ABIs: Import your contract ABIs here
import NFT_ABI from "../abis/NFT.json";

// Config: Import your network config here
import config from "../config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [nft, setNFT] = useState(null);

  const [account, setAccount] = useState(null);

  const [revealTime, setRevealTime] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [cost, setCost] = useState(0);
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState(null);
  const [wallet, setWallet] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // Initiate contract
    const nft = new ethers.Contract(
      config[31337].nft.address,
      NFT_ABI,
      provider,
    );
    setNFT(nft);

    // Fetch accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    const owner = await nft.owner();
    setOwner(owner);

    const wallet = await nft.walletOfOwner(account);
    setWallet(wallet);

    console.log("owner:", owner);
    console.log("wallet is ", wallet);
    console.log("account:", account);
    console.log("match:", account.toLowerCase() === owner.toLowerCase());
    console.log("balance is ", balance.toString());
    console.log(
      "wallet[wallet.length - 1]",
      wallet[wallet.length - 1].toString(),
    );

    // Fetch Countdown
    const allowMintingOn = await nft.allowMintingOn();
    setRevealTime(allowMintingOn.toString() + "000");

    // Fetch maxSupply
    setMaxSupply(await nft.maxSupply());

    // Fetch totalSupply
    setTotalSupply(await nft.totalSupply());

    // Fetch cost
    setCost(await nft.cost());

    // Fetch account balance
    setBalance(await nft.balanceOf(account));

    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData();
    }
  }, [isLoading]);

  return (
    <Container>
      <Navigation account={account} />

      <h1 className='my-4 text-center'>Dapp Punks</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col>
              {wallet.length > 0 ? (
                <div className='text-center'>
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/QmQPEMsfd1tJnqYPbnTQCjoa8vczfsV1FmqZWgRdNQ7z3g/${wallet[
                      wallet.length - 1
                    ].toString()}.png`}
                    alt='Open Punk'
                    width='400px'
                    height='400px'
                  />
                </div>
              ) : (
                <img src={preview} alt='' />
              )}
            </Col>
            {account && account.toLowerCase() === owner?.toLowerCase() && (
              <WhitelistManager provider={provider} nft={nft} />
            )}

            <Col>
              <div className='my-4 text-center'>
                <Countdown date={parseInt(revealTime)} className='h2' />
              </div>

              <Data
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                cost={cost}
                balance={balance}
              />

              <Mint
                provider={provider}
                nft={nft}
                cost={cost}
                setIsLoading={setIsLoading}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {wallet.map((tokenId, index) => (
                <img
                  key={tokenId.toString()}
                  src={`https://gateway.pinata.cloud/ipfs/QmQPEMsfd1tJnqYPbnTQCjoa8vczfsV1FmqZWgRdNQ7z3g/${tokenId.toString()}.png`}
                  alt={`Punk #${tokenId.toString()}`}
                  width='150px'
                  height='150px'
                />
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
