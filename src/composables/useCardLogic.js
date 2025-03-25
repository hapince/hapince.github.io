export function useCardLogic() {
    // 复杂的牌型判断逻辑
    const getCardType = (cards) => {
      // 判断牌型（单张、对子、顺子、炸弹等）
      const sortedCards = cards.sort((a, b) => a.type - b.type)
      
      if (cards.length === 1) return 'SINGLE'
      if (cards.length === 2 && sortedCards[0].type === sortedCards[1].type) return 'PAIR'
      
      // 更多牌型判断...
      return 'UNKNOWN'
    }
  
    const compareCards = (playedCards, previousCards) => {
      // 比较出牌大小
      const playedType = getCardType(playedCards)
      const previousType = getCardType(previousCards)
      
      if (playedType !== previousType) return false
      
      return playedCards[playedCards.length - 1].type > 
             previousCards[previousCards.length - 1].type
    }
  
    return {
      getCardType,
      compareCards
    }
  }