<script setup lang="ts">
/**
 * TerminalView Component
 * 
 * An interactive, pseudo-terminal application.
 * Features:
 * - Automated typing sequence ("sudo rm -rf")
 * - Interactive Enter-key sequence
 * - Realistic system processing delays
 * - Visual CRT post-processing effects (glow, scanlines)
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import WindowContainer from '../components/os/WindowContainer.vue'

// Configuration Constants
const PROMPT = 'ADMIN@PSYLABS:~$ '
const INITIAL_COMMAND = 'sudo rm -rf / --no-preserve-root'

// State Management
const typedCommand = ref('')
const systemLines = ref<string[]>([])
const terminalState = ref<'TYPING' | 'WAITING' | 'PROCESSING' | 'FINISHED'>('TYPING')
const terminalContent = ref<HTMLElement | null>(null)

/**
 * Ensures the terminal view automatically scrolls to the latest output line.
 */
const scrollToBottom = async () => {
  await nextTick()
  if (terminalContent.value) {
    terminalContent.value.scrollTop = terminalContent.value.scrollHeight
  }
}

/**
 * Simulates a natural typing effect for the initial command.
 */
const runAutoTyping = async () => {
  for (let i = 0; i < INITIAL_COMMAND.length; i++) {
    typedCommand.value += INITIAL_COMMAND[i]
    await new Promise(resolve => setTimeout(resolve, 50))
    scrollToBottom()
  }
  terminalState.value = 'WAITING'
}

/**
 * Handles terminal interaction (execution upon Enter).
 */
const handleInteraction = async (e: KeyboardEvent) => {
  if (e.key === 'Enter' && terminalState.value === 'WAITING') {
    terminalState.value = 'PROCESSING'
    
    // Artificial latency for "processing" immersion
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const outputSequence = [
      '[SYSTEM]: ANALYSIS COMPLETE.',
      '[SYSTEM]: ERROR: CANNOT DELETE LIQUID_CORE.SURFACE_TENSION_TOO_HIGH.',
      '[SYSTEM]: TASK FAILED SUCCESSFULLY. HAVE A STOIC DAY.'
    ]
    
    // Display each line with a slight delay
    for (const line of outputSequence) {
      systemLines.value.push(line)
      await new Promise(resolve => setTimeout(resolve, 600))
      scrollToBottom()
    }
    
    terminalState.value = 'FINISHED'
  }
}

onMounted(() => {
  // Start the typing sequence after a brief OS boot delay
  setTimeout(runAutoTyping, 800)
  window.addEventListener('keydown', handleInteraction)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleInteraction)
})
</script>

<template>
  <WindowContainer title="Terminal" hideTitlebar isTerminal>
    <div class="h-full flex flex-col font-code text-white bg-black/95 backdrop-blur-3xl crt-glow relative p-6 min-h-[450px]">
      <div ref="terminalContent" class="flex-1 overflow-y-auto space-y-2 custom-scrollbar relative z-10 pr-2">
        <!-- System Banner -->
        <div class="text-white/40 mb-4 opacity-50 text-[10px] uppercase tracking-widest">
          Psy Labs V1.0 - Secure Kernel Terminal v4.0.2
        </div>
        
        <!-- Command Line Input -->
        <div class="flex flex-wrap items-center gap-x-2 text-sm md:text-base">
          <span class="text-psy-picton font-bold">{{ PROMPT }}</span>
          <span class="text-white break-all tracking-tight">{{ typedCommand }}</span>
          <span v-if="terminalState === 'WAITING' || terminalState === 'TYPING'" class="cursor-block">_</span>
        </div>

        <!-- Processing Indicator -->
        <div v-if="terminalState === 'PROCESSING'" class="text-psy-picton opacity-70 animate-pulse text-sm">
          [RUNNING DESTRUCTION_CYCLE...]
        </div>

        <!-- System Response Area -->
        <div v-for="(line, index) in systemLines" :key="index" class="text-white text-sm md:text-base animate-slide-in">
          {{ line }}
        </div>

        <!-- Finalized Interactive Prompt (After sequence) -->
        <div v-if="terminalState === 'FINISHED'" class="flex items-center gap-x-3 mt-4 text-sm md:text-base">
          <span class="text-psy-picton font-bold">{{ PROMPT }}</span>
          <span class="cursor-block">_</span>
        </div>
      </div>

      <!-- 
        CRT Visual Post-Processing
        Simulates phosphor scanlines and soft glow.
      -->
      <div class="crt-overlay pointer-events-none absolute inset-0 rounded-xl overflow-hidden"></div>
    </div>
  </WindowContainer>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(132, 59, 253, 0.2);
  border-radius: 2px;
}

.crt-glow {
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.cursor-block {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  background: white;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-slide-in {
  animation: slideIn 0.2s ease-out forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.crt-overlay {
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.05) 50%
  ), linear-gradient(
    90deg, 
    rgba(255, 0, 0, 0.02), 
    rgba(0, 255, 0, 0.01), 
    rgba(0, 0, 255, 0.02)
  );
  background-size: 100% 3px, 3px 100%;
  mix-blend-mode: overlay;
  opacity: 0.3;
}
</style>
