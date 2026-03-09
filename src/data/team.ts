/**
 * team.ts
 * 
 * Directory of core collective identities.
 */
export interface TeamMember {
    slug: string;
    name: string;
    role: string;
}

export const team: TeamMember[] = [
    { slug: 'ivan', name: 'Ivan', role: 'Founder' },
    { slug: 'luchex', name: 'Luchex', role: 'Developer' },
    { slug: 'robin', name: 'Robin', role: 'Frontend Engineer' },
    { slug: 'rafa', name: 'Rafa', role: 'Designer' },
];
