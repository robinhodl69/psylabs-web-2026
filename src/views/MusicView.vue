<script setup lang="ts">
/**
 * MusicView Component
 * 
 * Integrated SoundCloud player for the Psy Labs ecosystem.
 * Features:
 * - Direct iframe integration with a specific brand playlist.
 * - Custom "Liquid Glass" container styling.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Psy Music Player">
    <div class="p-8 flex flex-col items-center justify-center min-h-[300px]">
      <!-- 
        SoundCloud Iframe Container
        Uses a high-contrast dark style to match the OS aesthetic.
      -->
      <div class="w-full h-[450px] bg-black/40 rounded-xl border border-white/10 overflow-hidden relative shadow-2xl backdrop-blur-md">
        <iframe 
          width="100%" 
          height="100%" 
          scrolling="no" 
          frameborder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mandarina-703417767/sets/v&color=%23843BFD&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          class="opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
          title="Psy Labs Official Playlist"
        ></iframe>
      </div>
    </div>
  </WindowContainer>
</template>
