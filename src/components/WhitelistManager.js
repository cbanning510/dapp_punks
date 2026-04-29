import { useState } from "react";
// import { ethers } from 'ethers';
import { Form, Button, Alert } from "react-bootstrap";

function WhitelistManager({ provider, nft }) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);

  const handleAdd = async () => {
    try {
      const signer = provider.getSigner();
      const nftWithSigner = nft.connect(signer);
      const tx = await nftWithSigner.addToWhitelist(address);
      await tx.wait();
      setStatus(`✅ ${address} added to whitelist`);
      setAddress("");
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleRemove = async () => {
    try {
      const signer = provider.getSigner();
      const nftWithSigner = nft.connect(signer);
      const tx = await nftWithSigner.removeFromWhitelist(address);
      await tx.wait();
      setStatus(`✅ ${address} removed from whitelist`);
      setAddress("");
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleCheck = async () => {
    try {
      const result = await nft.whitelist(address);
      setStatus(`${address} is ${result ? "whitelisted" : "not whitelisted"}`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className='my-4'>
      <h5>Whitelist Manager (Owner Only)</h5>
      <Form.Control
        type='text'
        placeholder='0x address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className='mb-2'
      />
      <Button variant='success' onClick={handleAdd} className='me-2'>
        Add to Whitelist
      </Button>
      <Button variant='danger' onClick={handleRemove}>
        Remove from Whitelist
      </Button>
      <Button variant='outline-secondary' onClick={handleCheck}>
        Check
      </Button>
      {status && <Alert className='mt-3'>{status}</Alert>}
    </div>
  );
}

export default WhitelistManager;
