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
}

export const achievements: Achievement[] = [
    { slug: 'mvp-launch', title: 'MVP Launch', date: '2026-03', description: 'Successfully launched Psy Labs Web 2026.' },
    { slug: 'first-partnership', title: 'First Partnership', date: '2026-05', description: 'Partnered with key industry players.' },
];
