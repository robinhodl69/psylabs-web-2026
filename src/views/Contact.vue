<script setup lang="ts">
/**
 * Contact Component
 * 
 * Standard communication gateway for Psy Labs.
 * Refined for a professional and integrated look.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Contact">
    <div class="max-w-md mx-auto py-12 px-4">
      <h1 class="text-3xl font-bold uppercase mb-10 text-white text-center font-system tracking-widest">
        Get in Touch
      </h1>
      
      <form class="space-y-8" @submit.prevent>
        <div class="flex flex-col">
          <label class="text-[10px] font-mono uppercase tracking-[0.2em] text-psy-picton mb-2 pl-1 font-bold">Email Address</label>
          <input 
            type="email" 
            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:border-psy-yellow focus:ring-1 focus:ring-psy-yellow transition-all outline-none" 
            placeholder="your@email.com" 
          />
        </div>
        
        <div class="flex flex-col">
          <label class="text-[10px] font-mono uppercase tracking-[0.2em] text-psy-picton mb-2 pl-1 font-bold">Message</label>
          <textarea 
            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body h-40 resize-none focus:border-psy-yellow focus:ring-1 focus:ring-psy-yellow transition-all outline-none" 
            placeholder="Tell us about your project..."
          ></textarea>
        </div>
        
        <button class="w-full btn-liquid-gloss text-sm py-4 tracking-[0.2em] mt-2">
          Send Message
        </button>
      </form>
    </div>
  </WindowContainer>
</template>
