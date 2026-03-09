<script setup lang="ts">
/**
 * Achievements Component
 * 
 * Displays a list of milestones and successes for Psy Labs.
 * Features:
 * - Dynamic list rendering from achievement data.
 * - Branded list item styling with glassmorphism.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
import { achievements } from '../data/achievements'
</script>

<template>
  <WindowContainer title="Achievements">
    <div class="space-y-4">
      <!-- Achievement Record Card -->
      <div 
        v-for="achiev in achievements" 
        :key="achiev.slug"
        class="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-psy-violet/30 transition-colors group"
      >
        <div class="mb-2 md:mb-0">
          <h2 class="text-xl font-bold uppercase text-white group-hover:text-psy-yellow transition-colors duration-300">
            {{ achiev.title }}
          </h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="w-1 h-1 rounded-full bg-psy-picton animate-pulse"></span>
            <p class="font-code text-psy-picton font-bold text-[10px] tracking-widest uppercase">
              RECOGNIZED: {{ achiev.date }}
            </p>
          </div>
        </div>
        
        <router-link :to="`/achievements/${achiev.slug}`" class="btn-liquid-gloss text-center min-w-[140px] text-sm py-2.5">
          VIEW_DEBRIEF
        </router-link>
      </div>
    </div>
  </WindowContainer>
</template>
