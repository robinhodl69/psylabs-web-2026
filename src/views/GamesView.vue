<script setup lang="ts">
/**
 * GamesView Component - PSY ARCADE HUB
 * 
 * Central hub for the collective's internal gaming applications.
 * Implements arcade-style logic for Neon Snake and Cyber Mines.
 */
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import WindowContainer from '../components/os/WindowContainer.vue'

// --- SYSTEM STATE ---
type GameMode = 'HUB' | 'SNAKE' | 'MINES'
const activeGame = ref<GameMode>('HUB')
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isPlaying = ref(false)

/**
 * Updates the active application mode.
 */
function setGame(mode: GameMode) {
  activeGame.value = mode
}

// --- NEON SNAKE ENGINE ---
const snakeState = reactive({
  score: 0,
  highScore: Number(localStorage.getItem('psy-snake-hi')) || 0,
  COLORS: { snake: '#00FF41', food: '#FF00FF' }
})

let snake: {x: number, y: number}[] = []
let food = {x: 15, y: 15}
let dx = 1, dy = 0
let gameLoop: number | null = null

/**
 * Initializes the Snake game loop and state.
 */
function initSnake() {
  isPlaying.value = true
  snakeState.score = 0
  snake = [{ x: 10, y: 10 }]
  dx = 1; dy = 0
  spawnFood()
  if (gameLoop) clearInterval(gameLoop)
  gameLoop = window.setInterval(drawSnakeFrame, 100)
}

/**
 * Spawns food at a random coordinate within the 20x20 grid.
 */
function spawnFood() {
  food = { 
    x: Math.floor(Math.random() * 20), 
    y: Math.floor(Math.random() * 20) 
  }
}

/**
 * Core game loop for Snake; handles collision, movement, and rendering.
 */
function drawSnakeFrame() {
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx || snake.length === 0) return
  
  const head = { x: snake[0]!.x + dx, y: snake[0]!.y + dy }
  
  // Boundary and self-collision detection
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
    isPlaying.value = false
    if (gameLoop) clearInterval(gameLoop)
    return
  }

  snake.unshift(head)
  
  // Food consumption logic
  if (head.x === food.x && head.y === food.y) {
    snakeState.score += 10
    if (snakeState.score > snakeState.highScore) {
      snakeState.highScore = snakeState.score
      localStorage.setItem('psy-snake-hi', snakeState.highScore.toString())
    }
    spawnFood()
  } else {
    snake.pop()
  }

  // Visual rendering
  ctx.clearRect(0, 0, 400, 400)
  ctx.fillStyle = snakeState.COLORS.food
  ctx.shadowBlur = 15; ctx.shadowColor = snakeState.COLORS.food
  ctx.fillRect(food.x * 20 + 4, food.y * 20 + 4, 12, 12)

  ctx.fillStyle = snakeState.COLORS.snake
  ctx.shadowBlur = 10; ctx.shadowColor = snakeState.COLORS.snake
  snake.forEach(s => ctx.fillRect(s.x * 20 + 1, s.y * 20 + 1, 18, 18))
}

// --- CYBER MINES ENGINE ---
interface MineCell {
  mine: boolean
  revealed: boolean
  flagged: boolean
  count: number
  exploded: boolean
}

const minesState = reactive({
  grid: [] as MineCell[][],
  gameOver: false,
  win: false,
  minesCount: 15,
  size: 10,
  score: 0,
  highScore: Number(localStorage.getItem('psy-mines-hi')) || 0,
  showOverlay: false
})

/**
 * Initializes the Minesweeper grid and plants hidden mines.
 */
function initMines() {
  minesState.gameOver = false
  minesState.win = false
  minesState.score = 0
  minesState.grid = []
  minesState.showOverlay = false
  
  // Grid generation
  for (let y = 0; y < minesState.size; y++) {
    const row: MineCell[] = []
    for (let x = 0; x < minesState.size; x++) {
      row.push({ mine: false, revealed: false, flagged: false, count: 0, exploded: false })
    }
    minesState.grid.push(row)
  }

  // Mine placement
  let planted = 0
  while (planted < minesState.minesCount) {
    const rx = Math.floor(Math.random() * minesState.size)
    const ry = Math.floor(Math.random() * minesState.size)
    if (minesState.grid[ry]?.[rx] && !minesState.grid[ry]![rx]!.mine) {
      minesState.grid[ry]![rx]!.mine = true
      planted++
    }
  }

  // Proximity count calculation
  for (let y = 0; y < minesState.size; y++) {
    for (let x = 0; x < minesState.size; x++) {
      const cell = minesState.grid[y]![x]!
      if (cell.mine) continue
      let count = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy, nx = x + dx
          if (ny >= 0 && ny < minesState.size && nx >= 0 && nx < minesState.size) {
            if (minesState.grid[ny]![nx]!.mine) count++
          }
        }
      }
      cell.count = count
    }
  }
  isPlaying.value = true
}

/**
 * Recursively reveals cells; handles game over and win conditions.
 */
function revealCell(x: number, y: number) {
  if (minesState.gameOver || minesState.win) return
  const cell = minesState.grid[y]?.[x]
  if (!cell || cell.revealed || cell.flagged) return
  
  cell.revealed = true
  
  if (cell.mine) {
    cell.exploded = true
    minesState.gameOver = true
    isPlaying.value = false
    setTimeout(() => { minesState.showOverlay = true }, 2000)
    return
  }

  minesState.score += cell.count
  if (minesState.score > minesState.highScore) {
    minesState.highScore = minesState.score
    localStorage.setItem('psy-mines-hi', minesState.highScore.toString())
  }

  // Recursive reveal for zero-count cells
  if (cell.count === 0) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy, nx = x + dx
        if (ny >= 0 && ny < minesState.size && nx >= 0 && nx < minesState.size) revealCell(nx, ny)
      }
    }
  }

  // Win condition validation
  const unrevealed = minesState.grid.flat().filter(c => !c.revealed).length
  if (unrevealed === minesState.minesCount) {
    minesState.win = true
    minesState.score += 100
    if (minesState.score > minesState.highScore) {
      minesState.highScore = minesState.score
      localStorage.setItem('psy-mines-hi', minesState.highScore.toString())
    }
    minesState.showOverlay = true
    isPlaying.value = false
  }
}

/**
 * Toggles the 'flagged' state on unrevealed cells.
 */
function toggleFlag(e: Event, x: number, y: number) {
  e.preventDefault()
  if (minesState.gameOver || minesState.win) return
  const cell = minesState.grid[y]?.[x]
  if (cell && !cell.revealed) {
    cell.flagged = !cell.flagged
  }
}

/**
 * Global keyboard listener for Snake direction controls.
 */
function handleKeys(e: KeyboardEvent) {
  if (activeGame.value === 'SNAKE') {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1 }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1 }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0 }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0 }
  }
}

// --- MOBILE TOUCH CONTROLS ---
function handleTouchDir(newDx: number, newDy: number) {
  if (activeGame.value === 'SNAKE' && isPlaying.value) {
    if (newDx !== 0 && dx === 0) { dx = newDx; dy = 0 }
    if (newDy !== 0 && dy === 0) { dx = 0; dy = newDy }
  }
}

onMounted(() => window.addEventListener('keydown', handleKeys))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeys)
  if (gameLoop) clearInterval(gameLoop)
})
</script>

<template>
  <WindowContainer :title="activeGame === 'HUB' ? 'Arcade Terminal' : activeGame">
    <div class="flex flex-col items-center p-4 md:p-8 relative">
      
      <!-- --- ARCADE HUB --- -->
      <div v-if="activeGame === 'HUB'" class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
        <div @click="setGame('SNAKE')" class="liquid-surface cursor-pointer hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(132,59,253,0.2)] hover:border-psy-violet/30 group">
          <div class="h-48 flex flex-col items-center justify-center p-6 text-center relative bg-[#00FF41]/10">
            <div class="text-[#00FF41] font-code text-xl mb-4 group-hover:scale-110 transition-transform">_/_/_/_/</div>
            <h3 class="text-2xl font-black text-white italic group-hover:text-psy-yellow transition-colors uppercase tracking-tight">NEON_SNAKE</h3>
          </div>
          <div class="p-4 border-t border-white/10 flex justify-between items-center">
            <span class="text-[9px] text-psy-picton font-bold">ARCADE_MODE</span>
            <div class="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></div>
          </div>
        </div>

        <div @click="setGame('MINES')" class="liquid-surface cursor-pointer hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(132,59,253,0.2)] hover:border-psy-violet/30 group">
          <div class="h-48 flex flex-col items-center justify-center p-6 text-center relative bg-[#FF00FF]/10">
            <div class="text-[#FF00FF] font-code text-xl mb-4 group-hover:scale-110 transition-transform">[ * ]</div>
            <h3 class="text-2xl font-black text-white italic group-hover:text-psy-yellow transition-colors uppercase tracking-tight">CYBER_MINES</h3>
          </div>
          <div class="p-4 border-t border-white/10 flex justify-between items-center">
            <span class="text-[9px] text-[#FF00FF] font-bold">STRATEGY_MODE</span>
            <div class="w-2 h-2 rounded-full bg-[#FF00FF] animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- --- ACTIVE GAME VIEW --- -->
      <div v-else class="w-full flex flex-col items-center animate-slide-up h-full overflow-y-auto pb-20 custom-scrollbar">
        <div class="w-full max-w-[400px] flex justify-start mb-4">
          <button @click="setGame('HUB'); isPlaying = false" class="btn-liquid-yellow !px-4 !py-1.5 !text-[10px] z-50">
            « BACK
          </button>
        </div>

        <!-- NEON SNAKE VIEW -->
        <template v-if="activeGame === 'SNAKE'">
          <div class="flex justify-between w-full max-w-[400px] items-center mb-6 font-code liquid-surface !px-6 !py-3 !rounded-2xl border border-white/10 shadow-2xl [text-shadow:2px_2px_0px_rgba(0,0,0,1)]">
            <div class="flex flex-col">
              <span class="text-[8px] text-psy-violet uppercase font-bold tracking-widest mb-1">Score</span>
              <div class="text-psy-yellow text-lg font-bold leading-none">{{ snakeState.score.toString().padStart(5, '0') }}</div>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[8px] text-psy-violet uppercase font-bold tracking-widest mb-1">Hi-Score</span>
              <div class="text-white/60 text-xs font-bold leading-none">{{ snakeState.highScore.toString().padStart(5, '0') }}</div>
            </div>
          </div>
          <div class="relative rounded-lg border-4 border-[#1a1a1a] shadow-2xl overflow-hidden w-full max-w-[400px] aspect-square">
            <canvas ref="canvasRef" width="400" height="400" class="bg-black block w-full h-full object-contain"></canvas>
            <div v-if="!isPlaying" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
              <h3 class="text-2xl font-black text-psy-yellow italic mb-6 animate-bounce uppercase">Insert Coin</h3>
              <button @click="initSnake" class="btn-liquid-yellow !px-6 !py-2 text-sm">Play</button>
            </div>
            <div class="pointer-events-none absolute inset-0 z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]"></div>
          </div>
          
          <!-- MOBILE D-PAD FOR SNAKE -->
          <div v-if="isPlaying" class="mt-8 flex flex-col items-center justify-center gap-2 md:hidden">
            <button @touchstart.prevent="handleTouchDir(0, -1)" @click="handleTouchDir(0, -1)" class="w-16 h-16 bg-[#1a1a1a] border-b-4 border-black active:border-b-0 active:translate-y-1 rounded-xl flex items-center justify-center text-white/50 active:text-psy-yellow transition-all">▲</button>
            <div class="flex gap-2">
              <button @touchstart.prevent="handleTouchDir(-1, 0)" @click="handleTouchDir(-1, 0)" class="w-16 h-16 bg-[#1a1a1a] border-b-4 border-black active:border-b-0 active:translate-y-1 rounded-xl flex items-center justify-center text-white/50 active:text-psy-yellow transition-all">◀</button>
              <div class="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"><div class="w-6 h-6 rounded-full bg-psy-yellow/20"></div></div>
              <button @touchstart.prevent="handleTouchDir(1, 0)" @click="handleTouchDir(1, 0)" class="w-16 h-16 bg-[#1a1a1a] border-b-4 border-black active:border-b-0 active:translate-y-1 rounded-xl flex items-center justify-center text-white/50 active:text-psy-yellow transition-all">▶</button>
            </div>
            <button @touchstart.prevent="handleTouchDir(0, 1)" @click="handleTouchDir(0, 1)" class="w-16 h-16 bg-[#1a1a1a] border-b-4 border-black active:border-b-0 active:translate-y-1 rounded-xl flex items-center justify-center text-white/50 active:text-psy-yellow transition-all">▼</button>
          </div>
        </template>

        <!-- CYBER MINES VIEW -->
        <template v-if="activeGame === 'MINES'">
          <div class="flex justify-between w-full max-w-[320px] items-center mb-6 font-code liquid-surface !px-6 !py-3 !rounded-2xl border border-white/10 shadow-2xl [text-shadow:2px_2px_0px_rgba(0,0,0,1)]">
            <div class="flex flex-col">
              <span class="text-[8px] text-[#FF00FF] uppercase font-bold tracking-widest mb-1">Score</span>
              <div class="text-[#FF00FF] text-lg font-bold leading-none">{{ minesState.score.toString().padStart(5, '0') }}</div>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[8px] text-[#FF00FF] uppercase font-bold tracking-widest mb-1">Hi-Score</span>
              <div class="text-white/60 text-xs font-bold leading-none">{{ minesState.highScore.toString().padStart(5, '0') }}</div>
            </div>
          </div>
          <div class="relative rounded-lg border-4 border-[#1a1a1a] shadow-2xl overflow-hidden p-2 bg-[#1a1a1a] w-full max-w-[320px] aspect-square">
            <div class="grid grid-cols-10 gap-1 w-full h-full" :class="{ 'animate-shake': minesState.gameOver && !minesState.showOverlay }">
              <template v-for="(row, y) in minesState.grid" :key="y">
                <div 
                  v-for="(cell, x) in row" :key="x"
                  @click="revealCell(x, y)"
                  @contextmenu="toggleFlag($event, x, y)"
                  class="flex items-center justify-center border border-white/5 cursor-pointer hover:bg-[#333] transition-colors font-bold text-sm w-full h-full aspect-square"
                  :class="[
                    cell.revealed ? 'bg-[#111] border-none shadow-none' : 'bg-[#2a2a2a]', 
                    cell.exploded ? 'bg-red-600 text-white animate-explosion' : '', 
                    cell.flagged && !cell.revealed ? 'text-[#FF00FF]' : ''
                  ]"
                >
                  <span v-if="cell.revealed && !cell.mine && cell.count > 0" :class="{ 'text-[#00FF41]': cell.count === 1, 'text-[#3BB4FD]': cell.count === 2, 'text-[#FF00FF]': cell.count === 3, 'text-[#FDE53B]': cell.count >= 4 }">{{ cell.count }}</span>
                  <span v-if="cell.revealed && cell.mine" class="text-lg">💣</span>
                  <span v-if="cell.flagged && !cell.revealed">P</span>
                </div>
              </template>
            </div>
            <div v-if="minesState.showOverlay" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
              <h3 class="text-2xl font-black text-[#FF00FF] italic mb-6 animate-pulse uppercase">{{ minesState.win ? 'Secured' : 'Terminated' }}</h3>
              <button @click="initMines" class="btn-liquid-gloss !px-6 !py-2 text-sm !bg-[#FF00FF] !text-white">Retry</button>
            </div>
            <div v-if="minesState.grid.length === 0" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
              <button @click="initMines" class="btn-liquid-yellow !px-6 !py-2 text-sm">Start</button>
            </div>
            <div class="pointer-events-none absolute inset-0 z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]"></div>
          </div>
        </template>

      </div>
    </div>
  </WindowContainer>
</template>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes explosion {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.5); filter: brightness(3) contrast(2); background-color: #ff0000; }
  100% { transform: scale(1); filter: brightness(1); }
}

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-4px, -4px); }
  20%, 40%, 60%, 80% { transform: translate(4px, 4px); }
}

.animate-explosion {
  animation: explosion 0.4s ease-out forwards;
}

.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}

canvas {
  image-rendering: pixelated;
}
</style>
