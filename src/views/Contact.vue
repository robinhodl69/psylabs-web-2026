<script setup lang="ts">
/**
 * Contact Component
 * 
 * Communication gateway for the collective.
 * Features:
 * - Themed input fields with focus effects.
 * - Branded "Transmission" button.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Global Comms">
    <div class="max-w-md mx-auto bg-black/40 backdrop-blur-md p-8 mt-8 mb-8 rounded-2xl border border-white/10 shadow-2xl">
      <h1 class="text-3xl font-bold uppercase mb-8 text-white text-glow-psy text-center font-system">
        Send Transmission
      </h1>
      
      <form class="space-y-6" @submit.prevent>
        <div class="flex flex-col">
          <label class="text-[10px] font-code uppercase tracking-[0.3em] text-psy-picton mb-2 pl-1 opacity-60">Source Identify (Email)</label>
          <input 
            type="email" 
            class="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:border-psy-yellow focus:ring-1 focus:ring-psy-yellow transition-all outline-none" 
            placeholder="USER@PSYLABS.IO" 
          />
        </div>
        
        <div class="flex flex-col">
          <label class="text-[10px] font-code uppercase tracking-[0.3em] text-psy-picton mb-2 pl-1 opacity-60">Encrypted Payload</label>
          <textarea 
            class="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono h-32 resize-none focus:border-psy-yellow focus:ring-1 focus:ring-psy-yellow transition-all outline-none" 
            placeholder="INITIALIZING SEQUENCE..."
          ></textarea>
        </div>
        
        <button class="w-full btn-liquid-gloss text-sm md:text-base py-3 tracking-[0.3em] mt-4">
          TRANSMIT_SIGNAL
        </button>
      </form>
    </div>
  </WindowContainer>
</template>
