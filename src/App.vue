<template>
  <div class="game-container">
    <h1>斗地主</h1>
    <div class="game-board">
      <div class="players">
        <Player 
          v-for="(player, index) in players" 
          :key="index"
          :cards="player"
          :is-current-player="currentPlayerIndex === index"
          @play-cards="handlePlayCards"
        />
      </div>
      <CardTable :played-cards="playedCards" />
      <GameControls 
        :current-player="currentPlayerIndex"
        @start-game="startGame"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Player from './components/Player.vue'
import CardTable from './components/CardTable.vue'
import GameControls from './components/GameControls.vue'
import { useGameLogic } from './composables/useGameLogic'

const { dealCards, validateCardPlay } = useGameLogic()

const players = ref([])
const landlordCards = ref([])
const playedCards = ref([])
const currentPlayerIndex = ref(0)

const startGame = () => {
  const { players: dealedPlayers, landlordCards: cards } = dealCards()
  players.value = dealedPlayers
  landlordCards.value = cards
}

const handlePlayCards = (playedCards) => {
  // 出牌逻辑
  if (validateCardPlay(playedCards)) {
    playedCards.value = playedCards
    currentPlayerIndex.value = (currentPlayerIndex.value + 1) % 3
  }
}
</script>

<style>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./assets/bg.jpg');
  min-height: 100vh;
}
</style>