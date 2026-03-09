<script setup lang="ts">
/**
 * Team Component
 * 
 * Showcases the core members of the Psy Labs collective.
 * Features:
 * - Dynamic rendering from team data.
 * - Interactive hover effects for member avatars.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
import { team } from '../data/team'
</script>

<template>
  <WindowContainer title="Collective Team">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 mt-2">
      <!-- Member Identity Card -->
      <div 
        v-for="member in team" 
        :key="member.slug"
        class="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center group hover:-translate-y-2 hover:border-psy-violet/40 transition-all duration-500 shadow-xl"
      >
        <!-- Identity Symbol (Avatar Placeholder) -->
        <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-4 flex items-center justify-center font-bold text-4xl text-psy-yellow group-hover:scale-110 group-hover:bg-psy-violet/20 group-hover:text-white transition-all shadow-xl font-system text-glow-psy">
          {{ member.name.charAt(0) }}
        </div>
        
        <h2 class="font-bold uppercase text-lg text-white mb-1 drop-shadow-md text-center font-system leading-tight">
          {{ member.name }}
        </h2>
        <p class="text-[9px] font-code uppercase tracking-[0.25em] text-psy-picton opacity-70 text-center font-bold">
          {{ member.role }}
        </p>
      </div>
    </div>
  </WindowContainer>
</template>
