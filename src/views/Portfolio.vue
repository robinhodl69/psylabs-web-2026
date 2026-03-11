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
  <WindowContainer title="Portfolio">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-4">
      <!-- Project Execution Card -->
      <div 
        v-for="project in projects" 
        :key="project.slug"
        class="liquid-surface p-10 flex flex-col justify-between h-full group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
      >
        <div>
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-xl md:text-2xl font-bold uppercase text-white font-system tracking-tighter group-hover:text-psy-yellow transition-colors leading-[1.1] break-words hyphens-auto pr-2">
              {{ project.title }}
            </h2>
          </div>
        </div>
        
        <div class="mt-auto">
          <div class="mb-5 space-y-2 px-1">
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-code uppercase tracking-[0.2em] text-white/30">Ecosystem:</span>
              <span class="text-[9px] font-code uppercase tracking-[0.2em] font-bold text-psy-violet">
                {{ project.ecosystem }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-code uppercase tracking-[0.2em] text-white/30">Status:</span>
              <span :class="[
                'text-[9px] font-code uppercase tracking-[0.2em] font-bold',
                project.status === 'Live' ? 'text-psy-yellow' : 
                project.status === 'Testnet' ? 'text-psy-picton' : 'text-white/60'
              ]">
                {{ project.status }}
              </span>
            </div>
          </div>
          <router-link :to="`/portfolio/${project.slug}`" class="block w-full btn-liquid-yellow text-center py-4 text-xs font-black tracking-[0.3em]">
            VIEW
          </router-link>
        </div>

        <!-- Subtle Inner Glow -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  </WindowContainer>
</template>
