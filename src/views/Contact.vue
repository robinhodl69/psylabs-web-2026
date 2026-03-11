<script setup lang="ts">
/**
 * Contact Component - Minimalist Social Identity Node
 * 
 * Re-designed as a premium OS identity gateway.
 * Merges patterns from DesktopIcon and Team Identity cards.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Contact">
    <div class="h-full flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in relative overflow-hidden">
      
      <!-- Refined Header -->
      <div class="mb-14">
        <h1 class="text-xl md:text-2xl font-black uppercase text-white font-system tracking-[0.6em] leading-tight opacity-80">
          GET IN TOUCH
        </h1>
        <div class="h-px w-12 bg-psy-yellow mx-auto mt-4 opacity-20"></div>
      </div>

      <!-- Identity Node: X.COM -->
      <a 
        href="https://x.com/psylabs_io" 
        target="_blank" 
        class="liquid-surface p-14 md:p-16 flex flex-col items-center group hover:scale-[1.05] transition-all duration-500 hover:border-psy-yellow/40 relative max-w-xs w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <!-- Holographic 𝕏 Icon -->
        <div class="relative group-hover:-translate-y-3 transition-transform duration-500 ease-out">
          <div class="text-psy-yellow font-code text-7xl md:text-8xl drop-shadow-[0_0_25px_rgba(253,229,59,0.4)] group-hover:drop-shadow-[0_0_40px_rgba(253,229,59,0.6)] transition-all duration-500">
            𝕏
          </div>
          
          <!-- Liquid Ambient Glow -->
          <div class="absolute inset-x-0 -bottom-4 h-8 bg-psy-yellow/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>

        <!-- Identity Background Shimmer -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[2rem]"></div>
      </a>

      <!-- Visual System Decor (Background Ambient Nodes) -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-psy-violet rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute top-1/3 left-3/4 w-40 h-40 bg-psy-yellow rounded-full blur-[120px] animate-pulse [animation-delay:1s]"></div>
      </div>

    </div>
  </WindowContainer>
</template>

<style scoped>
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
