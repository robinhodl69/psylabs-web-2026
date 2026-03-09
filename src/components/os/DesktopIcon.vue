<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  name: string
  iconName: string
  to: string
}>()

const router = useRouter()

// Dragging State
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = { x: 0, y: 0 }
const totalDelta = ref(0) // To check if it's a click or a move

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

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  
  const newX = clientX - dragStart.x
  const newY = clientY - dragStart.y
  
  // Calculate movement distance
  totalDelta.value += Math.abs(newX - position.value.x) + Math.abs(newY - position.value.y)
  
  position.value.x = newX
  position.value.y = newY
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

function handleClick() {
  // If we moved the icon significantly, don't trigger the click navigation
  if (totalDelta.value < 10) {
    router.push(props.to)
  }
}

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
    <img 
      :src="getIconUrl(iconName)" 
      class="w-16 h-16 mb-2 drop-shadow-[0_8px_16px_rgba(132,59,253,0.3)] filter pointer-events-none" 
      :alt="name"
    />
    <span class="text-[10px] text-center font-mono leading-tight bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10 group-hover:bg-psy-violet group-hover:text-white transition-all">{{ name }}</span>
  </div>
</template>

<style scoped>
img {
  transition: transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.desktop-icon-container:hover img {
  transform: translateY(-12px) scale(1.15);
}
</style>
