<script setup lang="ts">
/**
 * GamesView Component
 * 
 * Host for Psy Labs internal games.
 * Implementation: Neon Snake
 * Features:
 * - Canvas-based rendering with glow effects
 * - Responsive keyboard controls
 * - Score tracking and game loop management
 */
import { ref, onMounted, onUnmounted } from 'vue'
import WindowContainer from '../components/os/WindowContainer.vue'

// Game Configuration
const COLORS = {
  snake: '#3BB4FD', // Psy Picton Blue
  food: '#FDE53B',  // Psy Yellow
  bg: 'transparent'
}

const GRID_SIZE = 20
const TILE_COUNT = 20

// Reactive State
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isPlaying = ref(false)
const score = ref(0)
let gameLoop: number | null = null

// Internal Game State
type Point = { x: number, y: number }
let snake: Point[] = [{ x: 10, y: 10 }]
let food: Point = { x: 15, y: 15 }
let dx = 1
let dy = 0

/**
 * Initializes and starts the game loop.
 */
function startGame() {
  if (isPlaying.value) return
  isPlaying.value = true
  score.value = 0
  snake = [{ x: 10, y: 10 }]
  dx = 1
  dy = 0
  generateFoodPosition()
  if (gameLoop) clearInterval(gameLoop)
  gameLoop = window.setInterval(drawFrame, 100)
}

/**
 * Generates a random position for the food tile.
 */
function generateFoodPosition() {
  food = {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT)
  }
}

/**
 * Global input handler for snake navigation.
 */
function handleNavigation(e: KeyboardEvent) {
  if (!isPlaying.value) return
  const key = e.key
  if (key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1 }
  if (key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1 }
  if (key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0 }
  if (key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0 }
}

/**
 * Main render and logic update function (Called by loop).
 */
function drawFrame() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Update position
  if (!snake[0]) return
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

  // Collision detection (Walls and Self)
  if (!snake[0] || head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT || 
      snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    endGame()
    return
  }

  snake.unshift(head)

  // Consumption logic
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    generateFoodPosition()
  } else {
    snake.pop()
  }

  // Visual Rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Render Food with Glow
  ctx.fillStyle = COLORS.food
  ctx.shadowBlur = 10
  ctx.shadowColor = COLORS.food
  ctx.beginPath()
  ctx.arc(food.x * GRID_SIZE + GRID_SIZE/2, food.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, Math.PI * 2)
  ctx.fill()

  // Render Snake with Tail Fading
  ctx.shadowBlur = 15
  ctx.shadowColor = COLORS.snake
  ctx.fillStyle = COLORS.snake
  snake.forEach((segment, index) => {
    const alpha = 1 - (index / snake.length) * 0.5
    ctx.globalAlpha = alpha
    ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2)
  })
  ctx.globalAlpha = 1
  ctx.shadowBlur = 0
}

/**
 * Terminates the game loop and displays score.
 */
function endGame() {
  isPlaying.value = false
  if (gameLoop) clearInterval(gameLoop)
  // Simple system alert 
  console.log(`Final Score: ${score.value}`)
}

onMounted(() => {
  window.addEventListener('keydown', handleNavigation)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleNavigation)
  if (gameLoop) clearInterval(gameLoop)
})
</script>

<template>
  <WindowContainer title="Neon Snake Game">
    <div class="flex flex-col items-center p-6 space-y-6">
      <!-- Game Info Header -->
      <div class="flex justify-between w-full items-center px-4 font-code">
        <div class="text-psy-yellow text-lg tracking-widest font-bold">SCORE: {{ score }}</div>
        <div class="text-psy-picton font-bold tracking-widest uppercase hidden md:block">
          SYSTEM_LABS // NEON_SNAKE_V1
        </div>
      </div>
      
      <!-- Canvas Container -->
      <div class="relative bg-black/60 rounded-xl border border-white/10 p-1 shadow-2xl backdrop-blur-md">
        <canvas 
          ref="canvasRef" 
          width="400" 
          height="400"
          class="rounded-lg"
        ></canvas>
        
        <!-- Game Overlay (Start/Pause) -->
        <div v-if="!isPlaying" class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg border border-psy-violet/20">
          <div class="mb-4 text-white/40 font-code text-[10px] animate-pulse">CONNECTING TO NEURAL_NET...</div>
          <button @click="startGame" class="btn-violet text-2xl">
            INITIALIZE_OS
          </button>
        </div>
      </div>
      
      <!-- Navigation Legend -->
      <div class="text-[10px] text-white/40 font-code uppercase tracking-[0.2em] text-center max-w-xs">
        Use Directional Keys to Navigate the Vector Matrix
      </div>
    </div>
  </WindowContainer>
</template>

<style scoped>
canvas {
  image-rendering: pixelated;
}

/* Override global button with violet theme for Terminal/Games */
.btn-violet {
  position: relative;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: var(--color-psy-violet);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(132, 59, 253, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
}

.btn-violet:hover {
  transform: scale(1.05);
}

.btn-violet:active {
  transform: scale(0.95);
}
</style>
