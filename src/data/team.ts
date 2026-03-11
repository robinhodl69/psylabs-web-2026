/**
 * team.ts
 * 
 * Data source for collective member profiles.
 */
export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    x?: string;
    github?: string;
}

export const team: TeamMember[] = [
    { 
        slug: 'terratek', 
        name: 'Terratek', 
        role: 'Fullstack',
        x: 'https://x.com/IvanTerratek',
        github: 'https://github.com/TerratekMusic'
    },
    { 
        slug: 'robin', 
        name: 'Robin', 
        role: 'Frontend',
        x: 'https://x.com/robinhodl69',
        github: 'https://github.com/robinhodl69'
    },
    { 
        slug: 'rafa', 
        name: 'Rafa', 
        role: 'Backend',
        x: 'https://x.com/Rafael_Acuna',
        github: 'https://github.com/RafaelAcuna'
    },
];
