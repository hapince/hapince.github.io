<template>
    <div class="card-table">
      <h2>已出牌区</h2>
      <div class="played-cards">
        <Card 
          v-for="(card, index) in playedCards" 
          :key="index"
          :card="card"
          :is-selected="false"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import Card from './Card.vue'
  
  defineProps({
    playedCards: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  .card-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ccc;
    min-height: 100px;
  }
  
  .played-cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  </style>