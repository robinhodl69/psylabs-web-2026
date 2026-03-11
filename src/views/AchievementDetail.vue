<script setup lang="ts">
/**
 * AchievementDetail Component
 * 
 * Provides detailed insight into a specific milestone.
 * Features:
 * - Dynamic data fetching via route params.
 * - Branded typography and deep glass containers.
 */
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import WindowContainer from '../components/os/WindowContainer.vue'
import { achievements } from '../data/achievements'

const route = useRoute()
const router = useRouter()
const slug = route.params.id as string

const achievement = computed(() => achievements.find(a => a.slug === slug))

/**
 * Returns to the main achievements directory.
 */
function goBack() {
  router.push('/achievements')
}
</script>

<template>
  <WindowContainer :title="achievement ? `Achievement: ${achievement.title}` : 'Not Found'">
    <div v-if="achievement" class="space-y-6 max-w-4xl mx-auto py-2">
      <!-- Navigator -->
      <button @click="goBack" class="btn-liquid-yellow !px-6 !py-1.5 !text-[10px]">
        &lt; BACK
      </button>
      
      <div class="mt-4">
        <h1 class="text-2xl md:text-3xl text-white font-bold uppercase text-glow-psy font-system leading-tight">
          {{ achievement.title }}
        </h1>
      </div>
      
      <!-- Content Area -->
      <div class="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 text-lg text-white/90 leading-relaxed shadow-2xl font-body font-light italic border-l-psy-violet border-l-4">
        "{{ achievement.description }}"
        
        <div v-if="achievement.url" class="mt-10 flex justify-end">
          <a 
            :href="achievement.url" 
            target="_blank" 
            class="text-psy-yellow/80 hover:text-psy-yellow font-code text-[11px] tracking-[0.3em] uppercase transition-all duration-300 flex items-center group"
          >
            <span class="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">//</span>
            view more
          </a>
        </div>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else class="flex items-center justify-center h-full">
      <p class="bg-red-500/20 text-red-500 font-bold text-xl uppercase px-10 py-5 rounded-2xl border border-red-500/30 font-code tracking-widest">
        system_err: record_not_found_on_grid
      </p>
    </div>
  </WindowContainer>
</template>
