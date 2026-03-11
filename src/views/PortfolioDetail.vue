<script setup lang="ts">
/**
 * PortfolioDetail Component
 * 
 * Provides an in-depth look into a collective project.
 * Features:
 * - Dynamic data binding with slug.
 * - Branded "Command Prompt" styling.
 * - Integrated action buttons (Deploy/Source).
 */
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import WindowContainer from '../components/os/WindowContainer.vue'
import { projects } from '../data/portfolio'

const route = useRoute()
const router = useRouter()
const slug = route.params.id as string

const project = computed(() => projects.find(p => p.slug === slug))

/**
 * Returns to the main portfolio directory.
 */
function goBack() {
  router.push('/portfolio')
}
</script>

<template>
  <WindowContainer :title="project ? `Project: ${project.title}` : 'Not Found'">
    <div v-if="project" class="space-y-8 max-w-4xl mx-auto py-2">
      <!-- Navigator -->
      <button @click="goBack" class="btn-liquid-yellow !px-6 !py-1.5 !text-[10px]">
        &lt; BACK
      </button>
      
      <div class="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-3xl md:text-4xl text-white font-bold uppercase font-system leading-none tracking-tighter">
            {{ project.title }}
          </h1>
          <div class="flex flex-wrap gap-6 mt-6">
            <div class="flex flex-col">
              <span class="text-[9px] font-code text-white/30 uppercase tracking-[0.2em] mb-1">Ecosystem</span>
              <span class="text-sm font-code text-psy-violet font-bold">{{ project.ecosystem }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[9px] font-code text-white/30 uppercase tracking-[0.2em] mb-1">Current Status</span>
              <span :class="[
                'text-sm font-code font-bold uppercase',
                project.status === 'Live' ? 'text-psy-yellow' : 
                project.status === 'Testnet' ? 'text-psy-picton' : 'text-white/60'
              ]">{{ project.status }}</span>
            </div>
          </div>
        </div>

        <div v-if="project.website" class="flex flex-col items-start md:items-end">
          <span class="text-[9px] font-code text-white/30 uppercase tracking-[0.2em] mb-1">Official Website</span>
          <a :href="project.website" target="_blank" class="text-sm font-code text-white hover:text-psy-yellow transition-colors flex items-center gap-2">
            {{ project.website.replace('https://', '') }} 
            <span class="opacity-50 text-[10px]">↗</span>
          </a>
        </div>
      </div>

      <!-- Content Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Description Column -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 shadow-xl">
            <p class="font-body font-light text-lg text-white/80 leading-relaxed italic">
              "{{ project.description }}"
            </p>
          </div>
        </div>

        <!-- Repositories Column -->
        <div class="space-y-4">
          <h3 class="text-[10px] font-code text-white/40 uppercase tracking-[0.4em] px-2 mb-4">Source Repositories</h3>
          <div v-if="project.repositories.length > 0" class="space-y-3">
             <a 
               v-for="repo in project.repositories" 
               :key="repo.url"
               :href="repo.url" 
               target="_blank"
               class="liquid-surface block p-5 group hover:border-psy-yellow/30 transition-all duration-300"
             >
               <div class="flex justify-between items-center">
                 <span class="text-[10px] font-code text-white/60 group-hover:text-psy-yellow transition-colors">{{ repo.name }}</span>
                 <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
               </div>
             </a>
          </div>
          <div v-else class="space-y-3">
             <div class="liquid-surface block p-5 opacity-50 cursor-not-allowed">
               <div class="flex justify-between items-center">
                 <span class="text-[10px] font-code text-white/60 uppercase tracking-widest">Private</span>
                 <span class="text-xs opacity-50">🔒</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else class="flex items-center justify-center h-full">
      <p class="bg-red-500/20 text-red-500 font-bold text-xl uppercase px-10 py-5 rounded-2xl border border-red-500/30 font-code tracking-widest">
        system_err: project_offline_or_redacted
      </p>
    </div>
  </WindowContainer>
</template>
