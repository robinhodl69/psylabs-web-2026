<script setup lang="ts">
/**
 * DesktopIcon Component
 * 
 * Individual application launcher with integrated spatial dragging logic.
 * Differentiates between dragging and single-click navigation via delta tracking.
 * Supports an optional 'color' prop for holographic brand styling.
 */
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  name: string
  iconName: string
  to: string
  color?: string
}>()

const router = useRouter()

// Motion State
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = { x: 0, y: 0 }
const totalDelta = ref(0) // Movement accumulator for intent detection

/**
 * Initiates the dragging lifecycle for both mouse and touch interfaces.
 */
function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  totalDelta.value = 0
  
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  
  dragStart.x = clientX - position.value.x
  dragStart.y = clientY - position.value.y
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

/**
 * Synchronizes component coordinates with user pointer movement.
 */
function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  
  const newX = clientX - dragStart.x
  const newY = clientY - dragStart.y
  
  // Update intent accumulator
  totalDelta.value += Math.abs(newX - position.value.x) + Math.abs(newY - position.value.y)
  
  position.value.x = newX
  position.value.y = newY
}

/**
 * Terminates motion interaction and cleans up global listeners.
 */
function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

/**
 * Evaluates navigation intent based on total movement delta.
 */
function handleClick() {
  if (totalDelta.value < 10) {
    router.push(props.to)
  }
}

/**
 * Dynamic asset resolution using Vite's URL helper.
 */
const getIconUrl = (name: string) => new URL(`../../assets/${name}`, import.meta.url).href

onUnmounted(() => {
  stopDrag()
})
</script>

<template>
  <div 
    class="desktop-icon-container flex flex-col items-center justify-start w-24 h-auto p-2 bg-transparent transition-all rounded-2xl focus:outline-none group z-10 cursor-grab active:cursor-grabbing select-none"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)`, transition: isDragging ? 'none' : 'transform 0.2s ease-out' }"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @click="handleClick"
  >
    <!-- Dynamic Holographic Icon -->
    <div class="relative w-16 h-16 mb-2 flex items-center justify-center icon-wrapper transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
      <div 
        v-if="color"
        class="w-full h-full transition-all duration-500 opacity-90 group-hover:opacity-100"
        :style="{
          backgroundColor: color,
          maskImage: `url(${getIconUrl(iconName)})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center'
        }"
      ></div>
      <img 
        v-else
        :src="getIconUrl(iconName)" 
        class="w-full h-full drop-shadow-[0_8px_16px_rgba(132,59,253,0.3)] filter pointer-events-none" 
        :alt="name"
      />
      <!-- Dynamic Glow for colored icons -->
      <div v-if="color" 
           class="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
           :style="{
             backgroundColor: color,
             maskImage: `url(${getIconUrl(iconName)})`,
             maskSize: 'contain',
             maskRepeat: 'no-repeat',
             maskPosition: 'center'
           }"
      ></div>
    </div>
    <span class="text-[10px] text-center font-mono leading-tight liquid-surface !rounded-full px-3 py-1 border border-white/10 group-hover:bg-psy-violet group-hover:text-white transition-all shadow-lg whitespace-nowrap">{{ name }}</span>
  </div>
</template>

<style scoped>
.icon-wrapper {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
