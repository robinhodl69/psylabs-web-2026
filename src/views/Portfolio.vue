<script setup lang="ts">
/**
 * Portfolio Component
 * 
 * Showcases the project directory of Psy Labs.
 * Features:
 * - Responsive grid layout for project cards.
 * - Interactive link to project execution (details).
 */
import WindowContainer from '../components/os/WindowContainer.vue'
import { projects } from '../data/portfolio'
</script>

<template>
  <WindowContainer title="Portfolio Directory">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
      <!-- Project Execution Card -->
      <div 
        v-for="project in projects" 
        :key="project.slug"
        class="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full group hover:border-psy-violet/40 transition-all duration-500"
      >
        <div>
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold uppercase text-white font-system group-hover:text-psy-yellow transition-colors leading-tight">
              {{ project.title }}
            </h2>
            <span class="text-[10px] font-code text-white/20 uppercase tracking-widest px-2 py-1 border border-white/10 rounded">
              v1.0
            </span>
          </div>
          <p class="mb-8 text-white/60 font-body font-light text-sm leading-relaxed italic">
            "{{ project.description }}"
          </p>
        </div>
        
        <div class="mt-auto">
          <router-link :to="`/portfolio/${project.slug}`" class="block w-full btn-liquid-gloss text-center py-3 text-sm tracking-[0.2em]">
            EXECUTE_PROGRAM
          </router-link>
        </div>
      </div>
    </div>
  </WindowContainer>
</template>
