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
    <div class="max-w-3xl mx-auto space-y-8 py-10 px-6">
      <!-- Mission Content -->
      <div class="space-y-8">
        <h1 class="text-4xl md:text-6xl font-bold uppercase mb-8 text-liquid-graffiti !leading-[0.9] -rotate-1" style="font-family: var(--font-graffiti);">
          Psy Labs Collective
        </h1>
        
        <div class="font-body font-light text-xl text-white/90 leading-relaxed">
          <p>
            We are a collective of passionate builders, united by a shared vision to elevate the Web3 ecosystem to the heights it deserves. We believe in the transformative power of technology that is being driven by a deep commitment to <span class="text-psy-yellow font-bold uppercase tracking-widest">security</span>, <span class="text-psy-picton font-bold uppercase tracking-widest">scalability</span>, and <span class="text-psy-picton font-bold uppercase tracking-widest">decentralization</span>.
          </p>
        </div>
      </div>
    </div>
  </WindowContainer>
</template>
