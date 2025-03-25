import { ref, computed } from 'vue'

export function useGameLogic() {
  // 牌的定义
  const CARD_TYPES = {
    '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14, '2': 15,
    'JOKER_SMALL': 16, 'JOKER_BIG': 17
  }

  // 洗牌和发牌
  const shuffle = () => {
    const cards = []
    const suits = ['♠', '♥', '♣', '♦']
    
    // 生成普通牌
    suits.forEach(suit => {
      Object.keys(CARD_TYPES).slice(0, 13).forEach(value => {
        cards.push({ value, suit, type: CARD_TYPES[value] })
      })
    })
    
    // 添加大小王
    cards.push({ value: 'JOKER_SMALL', type: CARD_TYPES.JOKER_SMALL })
    cards.push({ value: 'JOKER_BIG', type: CARD_TYPES.JOKER_BIG })

    // 随机排序
    return cards.sort(() => Math.random() - 0.5)
  }

  // 发牌逻辑
  const dealCards = () => {
    const allCards = shuffle()
    const players = [[], [], []]
    const landlordCards = []

    // 每个玩家17张牌
    for (let i = 0; i < 51; i++) {
      players[i % 3].push(allCards[i])
    }

    // 底牌3张
    for (let i = 51; i < 54; i++) {
      landlordCards.push(allCards[i])
    }

    return { players, landlordCards }
  }

  // 出牌验证
  const validateCardPlay = (playedCards, previousPlay) => {
    // 复杂的出牌规则判断
    // 这里是简化版本，实际游戏需要更复杂的逻辑
    if (!previousPlay) return true
    
    return playedCards.length === previousPlay.length
  }

  return {
    shuffle,
    dealCards,
    validateCardPlay,
    CARD_TYPES
  }
}