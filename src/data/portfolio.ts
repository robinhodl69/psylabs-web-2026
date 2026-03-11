export interface Repository {
    name: string;
    url: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    ecosystem: string;
    status: 'Live' | 'Testnet' | 'BUILDING';
    website?: string;
    repositories: Repository[];
}

export const projects: Project[] = [
    {
        slug: 'embedded',
        title: 'Embedded Platform',
        ecosystem: 'Solana',
        status: 'Live',
        website: 'https://embedded.games',
        repositories: [],
        description: 'A comprehensive multiplayer gaming ecosystem combining frontend interface, REST API backend with Express and Prisma, and Unity 3D engine. Features real-time multiplayer gameplay, physics-based mechanics, and on-chain settlement of game results.'
    },
    {
        slug: 'celo-crossword',
        title: 'Celo Crossword',
        ecosystem: 'Celo',
        status: 'Live',
        website: 'https://farcaster.xyz/miniapps/4AyYbCYKwOb0/onchain-crossword',
        repositories: [
            { name: 'GitHub', url: 'https://github.com/PsyLabsWeb3/celo-crossword' }
        ],
        description: 'An interactive crossword puzzle miniapp on the Farcaster platform integrated with Celo blockchain. A casual on-chain game that can be shared socially, bringing word puzzle entertainment to Web3 users.'
    },
    {
        slug: 'vstreet',
        title: 'vStreet',
        ecosystem: 'Vara',
        status: 'Testnet',
        website: 'https://www.vstreet.io/',
        repositories: [
            { name: 'GitHub', url: 'https://github.com/vstreet-defi/vstreet' }
        ],
        description: 'A DeFi platform featuring smart contracts deployed on Vara testnet and liquidity injection mechanisms. Features liquidity pool management, WASM binaries, and off-chain client integration.'
    },
    {
        slug: 'guerrero-maya',
        title: 'Guerrero Maya',
        ecosystem: 'Arbitrum',
        status: 'BUILDING',
        website: 'https://www.guerreromaya.xyz/',
        repositories: [
            { name: 'Repository', url: 'https://github.com/PsyLabsWeb3/guerreromaya' },
            { name: 'dApp', url: 'https://github.com/PsyLabsWeb3/gm_dapp' }
        ],
        description: 'A comprehensive Web3 ecosystem for Guerrero Maya that enables users to interact with blockchain-based services and community features. Includes a main platform with full Web3 integration and a dedicated dApp.'
    },
    {
        slug: 'flip10',
        title: 'Flip10',
        ecosystem: 'Base',
        status: 'BUILDING',
        repositories: [
            { name: 'GitHub', url: 'https://github.com/PsyLabsWeb3/Flip10' }
        ],
        description: 'A real-time, multiplayer coin flip roguelike where players compete in daily sessions to reach a 10 heads streak and claim the pooled prize.'
    }
];
