<script lang="ts">
/**
 * WindowContainer Component
 * 
 * A high-level wrapper for OS windows.
 * Features:
 * - Draggable interface (Desktop only)
 * - Maximization and Closing logic
 * - Integrated Z-Index management
 * - Responsive layout for Mobile/Desktop
 */
let globalZIndex = 40
</script>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  hideTitlebar?: boolean
  isTerminal?: boolean
}>()

const router = useRouter()

// Reactive application context
const isMaximized = ref(false)
const zIndex = ref(globalZIndex)
const isMobile = ref(false)

// Spatial and interaction state
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragOffset = { x: 0, y: 0 }

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Default spatial initialization (Desktop)
  if (!isMobile.value) {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight * 0.8
    position.value.x = (window.innerWidth - width) / 2
    position.value.y = (window.innerHeight - height) / 2
  }
})

/**
 * Promotes the window to the top of the viewport stack.
 */
function bringToFront() {
  globalZIndex++
  zIndex.value = globalZIndex
}

/**
 * Orchestrates the drag interaction sequence.
 * Disabled for mobile and maximized states to preserve UX constraints.
 */
function startDrag(e: MouseEvent | TouchEvent) {
  if (isMaximized.value || isMobile.value) return
  
  isDragging.value = true
  bringToFront()
  
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  
  dragOffset.x = clientX - position.value.x
  dragOffset.y = clientY - position.value.y
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

/**
 * Updates spatial coordinates relative to the initial offset.
 */
function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  
  position.value.x = clientX - dragOffset.x
  position.value.y = clientY - dragOffset.y
}

/**
 * Concludes the drag lifecycle and deallocates global event listeners.
 */
function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

/**
 * Synchronizes window boundaries with the full viewport.
 */
function toggleMaximize() {
  isMaximized.value = !isMaximized.value
  bringToFront()
}

/**
 * Executes cleanup and restores the primary desktop route.
 */
function closeWindow() {
  router.push('/')
}

/**
 * Reactive style computation for spatial positioning and layering.
 */
const containerStyle = computed(() => {
  if (isMaximized.value || isMobile.value) {
    return { zIndex: zIndex.value }
  }
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    zIndex: zIndex.value
  }
})

onUnmounted(() => {
  stopDrag()
})
</script>

<template>
  <Transition name="liquid-window" appear>
    <div 
      class="absolute flex flex-col text-white transition-all duration-300 overflow-hidden"
      :class="[
        isMaximized 
          ? 'inset-0 w-screen h-screen border-none !z-[100] !rounded-none shadow-none' 
          : 'w-screen h-[100dvh] top-0 left-0 border-none md:w-[70vw] md:h-[80vh] md:border md:border-white/10',
        'liquid-surface rounded-2xl'
      ]"
      :style="containerStyle"
      @mousedown="bringToFront"
      @touchstart="bringToFront"
    >
      <!-- 
        Window Titlebar
        Handles the dragging logic and window controls.
        Hidden in Terminal mode for a cleaner look.
      -->
      <div 
        v-if="!hideTitlebar"
        class="flex items-center justify-between bg-white/5 border-b border-white/10 px-4 py-3 shrink-0 select-none"
        :class="{ 'cursor-grab': !isMaximized && !isMobile, 'cursor-grabbing': isDragging }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <div class="font-extrabold text-white flex items-center">
          <span class="uppercase font-system tracking-[0.3em] text-xs truncate">{{ title }}</span>
        </div>
        
        <div class="flex items-center space-x-3 shrink-0" @mousedown.stop @touchstart.stop>
          <!-- Fullscreen Toggle -->
          <button 
            @click="toggleMaximize" 
            class="w-8 h-8 liquid-surface !rounded-full flex items-center justify-center hover:!bg-psy-yellow hover:!text-black transition-all cursor-pointer group border border-white/10"
            title="Toggle Fullscreen"
          >
            <div v-if="!isMaximized" class="w-2.5 h-2.5 border border-current rounded-sm"></div>
            <div v-else class="relative w-2.5 h-2.5">
              <div class="absolute top-0 right-0 w-1.5 h-1.5 border border-current rounded-sm"></div>
              <div class="absolute bottom-0 left-0 w-1.5 h-1.5 border border-current rounded-sm bg-white/20"></div>
            </div>
          </button>

          <!-- Exit Button -->
          <button 
            @click="closeWindow" 
            class="w-8 h-8 liquid-surface !rounded-full flex items-center justify-center hover:!bg-red-500 hover:!text-white transition-all cursor-pointer border border-white/10 shrink-0"
            title="Exit Application"
          >
            <span class="text-xs font-system font-bold leading-none mt-[1px]">✕</span>
          </button>
        </div>
      </div>

      <!-- 
        Terminal Drag Handle
        Discreet dragging area for minimal-mode windows.
      -->
      <div 
        v-else
        class="absolute top-0 left-0 right-0 h-8 z-50 px-2 flex items-center justify-end"
        :class="{ 'cursor-grab': !isMaximized && !isMobile, 'cursor-grabbing': isDragging }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <button 
          @click="closeWindow" 
          class="w-6 h-6 liquid-surface hover:!bg-red-500 hover:!text-white rounded-full flex items-center justify-center text-[10px] transition-all z-[60] border border-white/10"
          @mousedown.stop
          title="Close Terminal"
        >✕</button>
      </div>

      <!-- Global Application Content Area -->
      <div 
        class="flex-1 overflow-y-auto custom-scrollbar"
        :class="[isTerminal ? 'p-0 pb-28 md:pb-0 bg-transparent' : 'p-6 pb-28 md:pb-6 bg-transparent']"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Liquid Window Entrance Animation */
.liquid-window-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-window-leave-active {
  transition: all 0.3s cubic-bezier(0.7, 0, 0.84, 0);
}

.liquid-window-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
  filter: blur(20px);
}
.liquid-window-leave-to {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: rgba(0, 0, 0, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(132, 59, 253, 0.3);
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(132, 59, 253, 0.6);
}
</style>
