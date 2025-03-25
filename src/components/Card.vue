<template>
    <div 
      :class="['card', { 'selected': isSelected }]" 
      @click="toggleSelect"
    >
      {{ card.value }}{{ card.suit || '' }}
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    card: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['toggle-select'])
  
  const toggleSelect = () => {
    emit('toggle-select', props.card)
  }
  </script>
  
  <style scoped>
  .card {
    width: 60px;
    height: 90px;
    border: 1px solid #333;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    cursor: pointer;
    background-color: white;
    user-select: none;
  }
  
  .card.selected {
    transform: translateY(-20px);
    background-color: #f0f0f0;
  }
  </style>