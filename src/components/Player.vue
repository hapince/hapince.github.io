<template>
    <div :class="['player', { 'active': isCurrentPlayer }]">
      <div class="player-cards">
        <Card 
          v-for="card in sortedCards" 
          :key="`${card.value}-${card.suit}`"
          :card="card"
          :is-selected="selectedCards.includes(card)"
          @toggle-select="toggleCardSelection"
        />
      </div>
      <button 
        v-if="isCurrentPlayer" 
        @click="playCards"
        :disabled="!canPlayCards"
      >
        出牌
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue'
  import Card from './Card.vue'
  import { useGameLogic } from '../composables/useGameLogic'
  
  const props = defineProps({
    cards: {
      type: Array,
      required: true
    },
    isCurrentPlayer: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['play-cards'])
  
  const { CARD_TYPES } = useGameLogic()
  
  const selectedCards = ref([])
  
  const sortedCards = computed(() => {
    return [...props.cards].sort((a, b) => CARD_TYPES[a.value] - CARD_TYPES[b.value])
  })
  
  const canPlayCards = computed(() => {
    return selectedCards.value.length > 0
  })
  
  const toggleCardSelection = (card) => {
    const index = selectedCards.value.findIndex(
      c => c.value === card.value && c.suit === card.suit
    )
    
    if (index !== -1) {
      selectedCards.value.splice(index, 1)
    } else {
      selectedCards.value.push(card)
    }
  }
  
  const playCards = () => {
    if (canPlayCards.value) {
      emit('play-cards', selectedCards.value)
      selectedCards.value = []
    }
  }
  </script>
  
  <style scoped>
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 2px solid transparent;
  }
  
  .player.active {
    border-color: green;
  }
  
  .player-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  button {
    margin-top: 10px;
    padding: 5px 15px;
  }
  </style>