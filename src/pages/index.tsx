import MainLayout from '@/Layout/Main.layout';
import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';
import { LogoIcon } from '@/components/Sunrise/LogoIcon';
import { SunriseDetails } from '@/components/Sunrise/SunriseDetails';
import { WhatNextBox } from '@/components/Sunrise/WhatNextBox';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { SunriseDeposit } from '@/components/Sunrise/SunriseDeposit';

const WalletMultiButton = dynamic(
  () =>
    import('@solana/wallet-adapter-react-ui').then(
      mod => mod.WalletMultiButton,
    ),
  { ssr: false },
);

const Home = () => {
  const { connected } = useWallet();
  return (
    <MainLayout>
      <VStack h="100vh" spacing={4}>
        <Heading alignItems="center" as="p" display="flex" size={['xl', '4xl']}>
          Create a{' '}
          <Link href="https://sunrisestake.com" isExternal>
            <Image
              alt="GSOL icon"
              height={[16, 64]}
              src="/assets/logo.svg"
              style={{ marginLeft: '1rem', marginRight: '1rem' }}
              width={[16, 64]}
            />{' '}
          </Link>
          Project
        </Heading>
        {connected ? (
          <Box boxShadow="base" p={4} rounded="md" w={['full', '50%']}>
            <SunriseDetails />
            <SunriseDeposit />
            <WhatNextBox />
          </Box>
        ) : (
          <WalletMultiButton />
        )}
        <Spacer />
        <Box display="flex">
          <Link
            _hover={{ textDecor: 'none' }}
            href="https://app.sunrisestake.com"
            isExternal
          >
            <Button
              _active={{
                bg: 'blackAlpha.800',
                transform: 'scale(0.95)',
              }}
              _hover={{ bg: 'blackAlpha.600' }}
              bg="blackAlpha.700"
              color="white"
              mt={4}
              rounded="full"
              shadow="lg"
              size="lg"
            >
              <Icon as={LogoIcon} mr={2} />
              Open Sunrise App
            </Button>
          </Link>
          <Link
            _hover={{ textDecor: 'none' }}
            href="https://github.com/sunrise-stake/next-sunrise-starter"
            isExternal
          >
            <Button
              _active={{
                bg: 'blackAlpha.800',
                transform: 'scale(0.95)',
              }}
              _hover={{ bg: 'blackAlpha.600' }}
              bg="blackAlpha.700"
              color="white"
              mt={4}
              rounded="full"
              shadow="lg"
              size="lg"
            >
              <Icon as={FiGithub} mr={2} />
              View on GitHub
            </Button>
          </Link>
        </Box>
      </VStack>
    </MainLayout>
  );
};

export default Home;
