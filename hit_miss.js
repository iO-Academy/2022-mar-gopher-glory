
let clickedItems = document.querySelectorAll('.game-item')

clickedItems.forEach(function(clickedItem) {
    clickedItem.addEventListener('click', function (e) {
        if (e.currentTarget.classList.contains('game-board__carrot') || e.currentTarget.classList.contains('game-board__gopher')) {
            return
        } else if (e.currentTarget.classList.contains('miss')) {
            e.currentTarget.classList.replace('game-board__sapling', 'game-board__carrot')
            return
        } e.currentTarget.classList.replace('game-board__sapling', 'game-board__gopher')
        })
})