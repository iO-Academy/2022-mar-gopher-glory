const form = document.querySelector('form')
const splash = document.querySelector('.splash')
const gameBoard = document.querySelector('.game-board')

/** Generates the content for the grid container, with default miss class and unique data-grid-id attributes
 *
 * @param height inputted height
 * @param width inputted width
 * @returns {string} innerHTML for the grid container
 */
 function gridContent(height, width){
    let innerHTML = ''
    let gridSize = height * width
    for (let i = 1; i <= gridSize; i++){
        let text = `<div class="game-item game-board__sapling miss" data-grid-id="${i}"></div>`
        innerHTML += text

    }
    return innerHTML
}

/** Sets the grid template for the container
 *
 * @param height inputted height
 * @param width inputted width
 */
function gridDefinition(height, width){
    let gridCont = document.querySelector(".game-board__grid")
    gridCont.innerHTML= gridContent(height, width)
    gridCont.style.gridTemplateColumns = `repeat(${width}, 1fr)`
    gridCont.style.gridTemplateRows = `repeat(${height}, 1fr)`
}

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

/** Checks whether an int is between 3 and 12
 *
 * @param int
 * @returns {boolean}
 */
function checkRange(int) {
    return !(int < 3 || int > 12);
}

/**
 * validating form input for row and column numbers
 *
 * @returns object
 */
function inputGetter() {

    let column = document.querySelector('#column').value
    let row = document.querySelector('#row').value
    let gopher = document.querySelector('#gopher').value
    let parsedRow = parseInt(row)
    let parsedColumn = parseInt(column)
    let parsedGopher = parseInt(gopher)
    let parsedObject = {
        row: parsedRow,
        column: parsedColumn,
        gopher: parsedGopher
    }
    if (parsedGopher > Math.floor((parsedColumn * parsedRow) / 2) || parsedGopher < 3) {
        document.querySelector(".error_container").textContent = "You must choose a number of gophers between 3 and "
            + Math.floor((parsedColumn * parsedRow) / 2)
        return false
    }
    Object.values(parsedObject).forEach(function (input) {
        if (!Number.isInteger(input)) {
            document.querySelector(".error_container").textContent = "What you playing at sucka! (incorrect datatype)"
            return false
        }
    })
    if (!checkRange(parsedObject.column)) {
        document.querySelector(".error_container").textContent = "Please enter a value between 3 and 12!"
        return false
    }
    if (!checkRange(parsedObject.row)) {
        document.querySelector(".error_container").textContent = "Please enter a value between 3 and 12!"
        return false
    }

    return parsedObject
}

/** Randomly selects a number of cells to change to hit class
 *
 * @param height inputted height
 * @param width inputted width
 * @param hits inputted desired number of hits
 */
function hitGenerator(height, width, hits){
    let gridSize = height * width
    if (hits > gridSize) return // Checks if hits exceeds the size of the grid, and kicks out of function if it is
    let targetCells = [] // Keeps track of the cells that have already been turned to 'hit'
    for (let i = 0; i < hits; i++){
        let targetCell = Math.floor(Math.random() * (gridSize)) + 1  //generates a random number between (inclusive of) 1 and hits
        if (!targetCells.includes(targetCell)){  // Checks whether the cell has been targeted before
            targetCells.push(targetCell)         // Adds the cell to the array of targeted cells
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.add('hit')
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.remove('miss')
        } else {
            i--  // Decrements the counter if failed to find new cell (repeated cell), so that correct number of cells become hits
        }
    }
}


function toggleDisplay() {
    splash.classList.toggle('hidden')
    gameBoard.classList.toggle('hidden')
}

/** Start a new game with data from the form field
 *  @param form_inputs object
 */
function startNewGame(form_inputs) {
    let rows = form_inputs.row
    let columns = form_inputs.column
    let gophers = form_inputs.gopher
    gridDefinition(rows, columns)
    hitGenerator(rows, columns, gophers)
    toggleDisplay()
    let clickedItems = document.querySelectorAll('.game-item')

    clickedItems.forEach(function(clickedItem) {
        clickedItem.addEventListener('click', hitOrMiss)
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    document.querySelector(".error_container").textContent = ""
    const form_inputs = inputGetter()
    if (form_inputs) startNewGame(form_inputs)
})

