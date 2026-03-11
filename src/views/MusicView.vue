<script setup lang="ts">
/**
 * MusicView Component
 * 
 * Integrated SoundCloud player for the Psy Labs ecosystem.
 * Features:
 * - Ultra-minimalist interface (No buying, sharing, or playcounts).
 * - "Ghost" integration using mix-blend-mode to merge with window surface.
 */
import WindowContainer from '../components/os/WindowContainer.vue'
</script>

<template>
  <WindowContainer title="Psy Music Player">
    <div class="w-full h-full flex items-center justify-center p-0 md:p-6 bg-transparent">
      <div class="w-full h-full max-h-[500px] overflow-hidden relative group">
        <!-- 
          SoundCloud Ultra-Minimalist URL:
          - visual=false: Mode list
          - show_artwork=false: No thumbnails
          - buying/sharing/download=false: Clean UI
        -->
        <iframe 
          width="100%" 
          height="100%" 
          scrolling="no" 
          frameborder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mandarina-703417767/sets/v&color=%23843BFD&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false&show_playcount=false&show_artwork=false"
          class="soundcloud-ghost-filter opacity-80 group-hover:opacity-100 transition-all duration-700"
          title="Psy Labs Official Playlist"
        ></iframe>
      </div>
    </div>
  </WindowContainer>
</template>

<style scoped>
/* 
  Ghost Effect: 
  Applying mix-blend-mode: screen to eliminate the widget's black background,
  allowing it to seamlessly blend with the window's violet gradient.
*/
.soundcloud-ghost-filter {
  mix-blend-mode: screen;
  filter: brightness(1.2) contrast(1.1);
}

/* Ensure the container expands to the window height */
:deep(.flex-1) {
  display: flex;
  flex-direction: column;
}
</style>
