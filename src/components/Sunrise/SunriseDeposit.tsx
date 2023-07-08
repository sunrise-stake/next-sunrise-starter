import { FC, useEffect, useState } from 'react';
import { useSunrise } from '@/context/SunriseClientContext';
import { Card, CardBody, Stack, Button, Input } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BN from 'bn.js';
import { printExplorerLink } from '@/utils/explorer';

export const SunriseDeposit: FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { client } = useSunrise();
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(amount > 0 && amount <= maxAmount);
  }, [maxAmount, amount]);

  // calculate the max by looking up the user's SOL balance
  useEffect(() => {
    const getBalance = async () => {
      if (!wallet.publicKey) {
        return;
      }

      const balance = await connection.getBalance(wallet.publicKey);
      setMaxAmount(balance / LAMPORTS_PER_SOL);
    };

    getBalance();
  }, [wallet.publicKey?.toBase58()]);

  const handleDeposit = async () => {
    if (!client) {
      alert('Sunrise client not found');
      return;
    }
    if (!wallet.connected) {
      alert('Connect wallet first');
      return;
    }

    const amountLamports = new BN(amount * LAMPORTS_PER_SOL);

    if (amountLamports.gt(new BN(maxAmount * LAMPORTS_PER_SOL))) {
      alert('You do not have enough SOL to deposit this amount');
      return;
    }

    try {
      const tx = await client.deposit(amountLamports);
      const sig = await wallet.sendTransaction(tx, connection);
      printExplorerLink('Deposit sent', sig, connection);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card backgroundColor="rgba(255, 255, 255, 0.05)">
      <CardBody>
        <Stack>
          <Input
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="Enter deposit SOL amount"
          />
          <Button
            colorScheme="teal"
            isDisabled={!valid}
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
