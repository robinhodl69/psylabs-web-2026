<script setup lang="ts">
/**
 * WhoWeAre Component
 * 
 * Provides an overview of the Psy Labs philosophy and mission.
 * Features:
 * - High-contrast brutalist layout.
 * - Branded typography and iconography.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Who We Are">
    <div class="max-w-3xl mx-auto space-y-8 py-4">
      <!-- Mission Component -->
      <div class="bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-white/5 shadow-2xl">
        <h1 class="text-4xl md:text-5xl font-bold uppercase mb-6 text-white text-glow-psy font-system">
          Psy Labs Collective
        </h1>
        
        <div class="font-body font-light text-xl text-white/90 leading-relaxed space-y-6">
          <p class="flex gap-4">
            <span class="text-psy-picton font-code font-bold min-w-[20px]">></span>
            <span>We are an underground digital collective building the next generation of Web3 products.</span>
          </p>
          <p class="flex gap-4">
            <span class="text-psy-picton font-code font-bold min-w-[20px]">></span>
            <span>Our focus is on <span class="text-psy-yellow font-bold uppercase tracking-widest">Extreme Performance</span>, brutalist aesthetics, and decentralization.</span>
          </p>
          <p class="flex gap-4">
            <span class="text-psy-picton font-code font-bold min-w-[20px]">></span>
            <span>Passion is our fuel. Code is our weapon.</span>
          </p>
        </div>
      </div>
    </div>
  </WindowContainer>
</template>
