"use client"

import type { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider } from 'wagmi';
import { linea } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const projectId = '329e1a5ee4c1257164938ef55efec576';

const metadata = {
  name: 'Linea Luck',
  description: 'Claim your ATB tokens with Linea Luck!',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [linea] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: false,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#1A237E',
    '--w3m-accent': '#7B1FA2',
  }
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
