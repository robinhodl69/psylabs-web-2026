<script setup lang="ts">
/**
 * PsyDock Component
 * 
 * Main navigation interface for the Psy Labs OS.
 * Features a dynamic Start Menu, application launching logic, 
 * and a synchronized UTC system clock.
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentTime = ref('')
const isMenuOpen = ref(false)

/**
 * Toggles the visibility of the primary Start Menu.
 * Prevents event propagation to avoid conflict with document-level close listeners.
 */
function toggleMenu(e: Event) {
  e.stopPropagation()
  isMenuOpen.value = !isMenuOpen.value
}

/**
 * Ensures the Start Menu is closed.
 */
function closeMenu() {
  isMenuOpen.value = false
}

/**
 * Refreshes the system clock state.
 * Syncs to UTC for global team coordination.
 */
function updateTime() {
  const now = new Date()
  currentTime.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  }).format(now) + ' UTC'
}

let timer: number

onMounted(() => {
  // Attach global closure listener for outside clicks
  document.addEventListener('click', closeMenu)
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
  window.clearInterval(timer)
})

/**
 * Handles navigation intent and resets menu state.
 */
function navigateTo(path: string) {
  router.push(path)
  closeMenu()
}
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto">
    
    <!-- Start Menu (Liquid Component) -->
    <Transition name="fade-slide">
      <div 
        v-if="isMenuOpen"
        class="mb-3 w-48 liquid-surface flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        @click.stop
      >
        <!-- Application Links -->
        <div class="p-2 space-y-1">
          <button 
            @click="navigateTo('/games')"
            class="w-full text-left px-4 py-3 hover:bg-psy-violet/30 hover:text-psy-yellow rounded-xl font-bold uppercase transition-all duration-300 flex items-center"
          >
            <span class="text-xs">Games</span>
          </button>

          <button 
            @click="navigateTo('/terminal')"
            class="w-full text-left px-4 py-3 hover:bg-psy-violet/30 hover:text-psy-yellow rounded-xl font-bold uppercase transition-all duration-300 flex items-center"
          >
            <span class="text-xs">Terminal</span>
          </button>

          <button 
            @click="navigateTo('/music')"
            class="w-full text-left px-4 py-3 hover:bg-psy-violet/30 hover:text-psy-yellow rounded-xl font-bold uppercase transition-all duration-300 flex items-center"
          >
            <span class="text-xs">Music</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Main Navigation Dock -->
    <div 
      class="h-14 px-2 flex items-center justify-between liquid-surface w-[320px] md:w-[450px] !rounded-full shadow-[0_8px_32px_0_rgba(132,59,253,0.3)]"
    >
      <div class="flex-none flex justify-start pl-2">
        <!-- Start Button -->
        <button 
          @click="toggleMenu"
          class="w-10 h-10 hover:scale-110 active:scale-95 transition-all flex items-center justify-center overflow-hidden group"
        >
          <img src="/isotipo_violeta.svg" alt="Psy Labs" class="w-8 h-8 object-contain pointer-events-none" />
        </button>
      </div>

      <div class="flex-1"></div>

      <!-- Right Section: System Clock -->
      <div class="flex-1 flex justify-end pr-4">
        <div class="font-mono text-white text-[10px] md:text-xs tracking-widest opacity-60">
          {{ currentTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
