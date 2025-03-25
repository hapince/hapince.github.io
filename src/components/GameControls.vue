<template>
    <div class="game-controls">
      <button @click="startGame">开始游戏</button>
      <div class="current-player">
        当前玩家: {{ currentPlayer + 1 }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    currentPlayer: {
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits(['start-game'])
  
  const startGame = () => {
    emit('start-game')
  }
  </script>
  
  <style scoped>
  .game-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
  }
  
  .current-player {
    font-size: 16px;
  }
  </style>