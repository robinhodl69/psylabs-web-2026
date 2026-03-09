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
      <button @click="goBack" class="btn-liquid-gloss !px-6 !py-1.5 !text-[10px] !bg-psy-yellow !text-black border-none shadow-sm tracking-[0.2em]">
        &lt; TERMINATE_SESSION
      </button>
      
      <div class="mt-4">
        <h1 class="text-4xl md:text-5xl text-white font-bold uppercase text-glow-psy font-system leading-tight">
          {{ project.title }}
        </h1>
        <div class="flex items-center gap-3 mt-4 px-1 opacity-50">
          <div class="w-1.5 h-1.5 rounded-full bg-psy-picton"></div>
          <p class="text-[10px] font-code text-white font-bold uppercase tracking-[0.3em]">
            SECURE_ID // {{ project.slug.toUpperCase() }}
          </p>
        </div>
      </div>

      <!-- Execution Environment Container -->
      <div class="bg-black/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-lg text-white/90 leading-relaxed shadow-2xl relative overflow-hidden group">
        <!-- Visual Accent -->
        <div class="absolute top-0 left-0 w-1 h-full bg-psy-violet group-hover:w-2 transition-all duration-500"></div>
        
        <div class="mb-10">
          <span class="text-psy-picton font-code font-bold mr-4">INITIATING_PROMPT></span>
          <span class="font-body font-light text-xl">{{ project.description }}</span>
        </div>
        
        <!-- Action Control Group -->
        <div class="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/5">
           <button class="btn-liquid-gloss !px-12 text-sm tracking-widest">
             DEPLOY_PRODUCT
           </button>
           <button class="btn-liquid-gloss !px-12 !bg-transparent !text-psy-picton border border-psy-picton/30 hover:!bg-psy-picton/10 !shadow-none text-sm tracking-widest">
             SOURCE_CODE
           </button>
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
