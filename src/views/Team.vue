<script setup lang="ts">
/**
 * Team Component
 * 
 * Showcases the core members of the Psy Labs collective.
 * Features:
 * - Liquid glass identity cards.
 * - Original multi-color SVG icons.
 * - Branded color identity for social links.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
import { team } from '../data/team'

const getImageUrl = (slug: string) => new URL(`../assets/${slug}.svg`, import.meta.url).href

/**
 * Maps member slugs to their specific brand color identity for social links.
 */
const getMemberColorClass = (slug: string) => {
  const colors: Record<string, string> = {
    'terratek': 'text-psy-picton',
    'robin': 'text-psy-yellow',
    'rafa': 'text-psy-violet'
  }
  return colors[slug] || 'text-white'
}
</script>

<template>
  <WindowContainer title="Collective Team">
    <div class="h-full flex flex-col justify-center py-4 px-4 md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <!-- Member Identity Card -->
        <div 
          v-for="member in team" 
          :key="member.slug"
          class="liquid-surface p-8 md:p-10 flex flex-col items-center justify-center group hover:scale-[1.03] hover:border-psy-violet/40 transition-all duration-500 shadow-xl relative"
        >
          <!-- Original Multi-color SVG Icon -->
          <div class="relative mb-6 group-hover:-translate-y-2 transition-transform duration-500">
            <img 
              :src="getImageUrl(member.slug)" 
              :alt="member.name"
              class="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(132,59,253,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(132,59,253,0.4)] transition-all duration-500"
            />
          </div>
          
          <div class="text-center space-y-2 mb-4">
            <h2 class="font-bold uppercase text-xl text-white tracking-tighter font-system">
              {{ member.name }}
            </h2>
            
            <p class="text-[9px] font-code uppercase tracking-[0.2em] text-white/60 font-bold">
              {{ member.role }}
            </p>
          </div>

          <!-- Vintage Social Links -->
          <div class="flex gap-4 mt-2">
            <a href="#" :class="['text-[10px] font-code transition-all font-black tracking-widest hover:-translate-y-1', getMemberColorClass(member.slug)]">
              [X]
            </a>
            <a href="#" :class="['text-[10px] font-code transition-all font-black tracking-widest hover:-translate-y-1', getMemberColorClass(member.slug)]">
              [GITHUB]
            </a>
          </div>

          <!-- Subtle Inner Glow -->
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
        </div>
      </div>
    </div>
  </WindowContainer>
</template>

<style scoped>
.liquid-surface {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.1) 100%);
}
</style>
