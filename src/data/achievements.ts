/**
 * achievements.ts
 * 
 * Data source for collective milestones.
 */
export interface Achievement {
    slug: string;
    title: string;
    date: string;
    description: string;
    url?: string;
}

export const achievements: Achievement[] = [
    {
        slug: 'ethbrussels-2024-winner',
        title: 'ETHBrussels 2024 - Vara Network Winners Track',
        date: '2024',
        description: 'Awarded for developing a decentralized bond marketplace on the Vara Network.',
        url: 'https://ethglobal.com/showcase/spbonding-pcs09'
    },
    {
        slug: 'cooki-defai-2024-winner',
        title: 'Cookie DeFAi Hackathon 2024 - Mode Winners Track',
        date: '2024',
        description: 'First place with Guerrero Maya, a GameFi project powered by AI agents on Mode Network.',
        url: 'https://x.com/cookiedotfun/status/1890777613490397581'
    },
    {
        slug: 'vara-network-grant-vstreet',
        title: 'Vara Network Grant – vStreet',
        date: '2024',
        description: 'Received official funding to build vStreet, a decentralized lending and borrowing protocol.',
        url: 'https://vstreet.io/'
    },
    {
        slug: 'elizaos-plugin-celo',
        title: 'ElizaOS Plugin for Celo',
        date: '2024',
        description: 'Contributed a plugin to ElizaOS for the Celo network, officially merged into the organization’s main repository.',
        url: 'https://github.com/celo-org/eliza-plugin-celo'
    },
    {
        slug: 'erc1155-plugin-goat',
        title: 'ERC-1155 Plugin for GOAT',
        date: '2024',
        description: 'Developed and contributed an NFT plugin supporting the ERC-1155 standard, officially accepted into the GOAT main repo.',
        url: 'https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/erc1155'
    },
    {
        slug: 'solana-matrix-hackathon-winner',
        title: 'Solana Matrix Hackathon - Tier 2 Winners',
        date: '2024',
        description: 'Cyber Arena by Embedded.Games selected to be launched on PSG1.',
        url: 'https://x.com/playsolana/status/2029693582651625712'
    }
];
