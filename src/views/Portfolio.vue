<script setup lang="ts">
/**
 * Portfolio Component
 * 
 * Showcases the project directory of Psy Labs.
 * Features:
 * - Liquid glass cards.
 * - Professional project execution flow.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
import { projects } from '../data/portfolio'
</script>

<template>
  <WindowContainer title="Portfolio Directory">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-4">
      <!-- Project Execution Card -->
      <div 
        v-for="project in projects" 
        :key="project.slug"
        class="liquid-surface p-10 flex flex-col justify-between h-full group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
      >
        <div>
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold uppercase text-white font-system tracking-tighter group-hover:text-psy-yellow transition-colors leading-[0.9]">
              {{ project.title }}
            </h2>
            <span class="text-[9px] font-code text-white/30 uppercase tracking-[0.3em] px-3 py-1 border border-white/10 rounded-full">
              REV_2026
            </span>
          </div>
          <p class="mb-10 text-white/60 font-body font-light text-base leading-relaxed">
            {{ project.description }}
          </p>
        </div>
        
        <div class="mt-auto">
          <router-link :to="`/portfolio/${project.slug}`" class="block w-full btn-liquid-gloss text-center py-4 text-xs font-black tracking-[0.3em]">
            OPEN_PROJECT
          </router-link>
        </div>

        <!-- Subtle Inner Glow -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  </WindowContainer>
</template>
