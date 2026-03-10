/**
 * team.ts
 * 
 * Data source for collective member profiles.
 */
export interface TeamMember {
    slug: string;
    name: string;
    role: string;
}

export const team: TeamMember[] = [
    { slug: 'terratek', name: 'Terratek', role: 'Fullstack' },
    { slug: 'robin', name: 'Robin', role: 'Frontend' },
    { slug: 'rafa', name: 'Rafa', role: 'Backend' },
];
