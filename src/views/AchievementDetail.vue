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
      <button @click="goBack" class="btn-liquid-gloss !px-6 !py-1.5 !text-[10px] !bg-psy-yellow !text-black border-none shadow-sm tracking-[0.2em]">
        &lt; RETURN_TO_LIST
      </button>
      
      <div class="mt-4">
        <h1 class="text-4xl md:text-5xl text-white font-bold uppercase text-glow-psy font-system leading-tight">
          {{ achievement.title }}
        </h1>
        <div class="flex items-center gap-3 mt-4 px-1">
          <div class="w-1.5 h-1.5 rounded-full bg-psy-picton animate-pulse"></div>
          <p class="text-[10px] font-code text-psy-picton font-bold uppercase tracking-[0.3em]">
            LOG_STAMP // {{ achievement.date }}
          </p>
        </div>
      </div>
      
      <!-- Content Area -->
      <div class="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 text-lg text-white/90 leading-relaxed shadow-2xl font-body font-light italic border-l-psy-violet border-l-4">
        "{{ achievement.description }}"
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
