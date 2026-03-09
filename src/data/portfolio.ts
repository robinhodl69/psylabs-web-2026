/**
 * portfolio.ts
 * 
 * Project directory for Psy Labs executions.
 */
export interface Project {
    slug: string;
    title: string;
    description: string;
}

export const projects: Project[] = [
    { slug: 'vstreet', title: 'vStreet', description: 'Virtual Street Platform' },
    { slug: 'polkattest', title: 'Polkattest', description: 'Polkadot Testing Environment' },
    { slug: 'bondhub', title: 'Bondhub', description: 'The hub for bonds' },
    { slug: 'warpify', title: 'Warpify', description: 'Warp speed for your backend' },
];
