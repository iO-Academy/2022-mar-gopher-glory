
let clickedItems = document.querySelectorAll('.game-item')

clickedItems.forEach(function(clickedItem) {
    clickedItem.addEventListener('click', hitOrMiss)

})

/**
 * This function changes game-board tiles on click based on hit or miss class
 *
 * @param e
 */
function hitOrMiss(e) {
    let target = e.currentTarget.classList
    if (target.contains('game-board__carrot') ||target.contains('game-board__gopher')) {
        return
    } else if (target.contains('miss')) {
        target.replace('game-board__sapling', 'game-board__carrot')
        return
    }
    target.replace('game-board__sapling', 'game-board__gopher')
}


