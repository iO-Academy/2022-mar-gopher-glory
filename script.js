const form = document.querySelector('form')
const splash = document.querySelector('.splash')
const gameBoard = document.querySelector('.game-board')
const endGameModalButtons = document.querySelectorAll('.modal__btn')
const winModal = document.querySelector('.modal--winner')
const loseModal = document.querySelector('.modal--loser')
const banner = document.querySelector('.banner')
const carrotClass = 'game-board__carrot'
const gopherClass = 'game-board__gopher'
const saplingClass = 'game-board__sapling'

let gameState = {
    remainingGophers: 0,
    remainingCarrots: 0
}

/** Generates the content for the grid container, with default miss class and unique data-grid-id attributes
 *
 * @param height inputted height
 * @param width inputted width
 * @returns {string} innerHTML for the grid container
 */
function gridContent(height, width) {
    let innerHTML = ''
    const gridSize = (height+1) * (width+1)
    let i = 0
    for (let j = 1; j <= gridSize; j++){
        if (j === 1){
            let text = '<div class="game-item transparent"></div>'
            innerHTML += text
        } else if (j <= height + 1) {
            let colPos = j-2
            let text = `<div class="game-item hint column-hint" data-colPos="${colPos}"></div>`
            innerHTML += text
        } else if((j % (width + 1) === 1)) {
            let rowPos = Math.floor((j/(width+1))-1)
            let text = `<div class="game-item hint row-hint" data-rowPos="${rowPos}"></div>`
            innerHTML += text
        } else {
            i++
            let rowID = Math.floor((i - 1) / width) + 1
            let columnID = ((i - 1) % width) + 1
            let text = `<div class="game-item game-board__sapling miss" data-grid-id="${i}" data-rowID="${rowID}" data-colID="${columnID}"></div>`
            innerHTML += text
        }
    }
    // if (height < 6 || width < 6) {
        
    // }
    return innerHTML
}

/** Sets the grid template for the container
 *
 * @param height inputted height
 * @param width inputted width
 */
function gridDefinition(height, width){
    const gridCont = document.querySelector(".game-board__grid")
    gridCont.innerHTML= gridContent(height, width)

    if (height < 6 || width < 6) {
        document.querySelectorAll('.hint').forEach(hint => {
            hint.style.fontSize = '72px'
        })
    }
    
    const newHeight=height+1
    const newWidth=width+1
    gridCont.style.gridTemplateColumns = `repeat(${newWidth}, 1fr)`
    gridCont.style.gridTemplateRows = `repeat(${newHeight}, 1fr)`
}


/**
 * This function changes game-board tiles on click based on hit or miss class
 *
 * @param e
 */
function hitOrMiss(e) {
    const clickedClass = e.currentTarget.classList
    if (clickedClass.contains(saplingClass)) {
        if (clickedClass.contains('miss')) {
            clickedClass.replace(saplingClass, carrotClass)
            if(updateRemainingCarrots(gameState)){
                toggleGameLoss()
            }
        } else {
            clickedClass.replace(saplingClass, gopherClass)
            if(updateRemainingGophers(gameState)){
                toggleGameWin()
            }
        }
    }
}

/** Decrements remainingCarrots and checks if 0, returns boolean
 *
 * @returns {boolean}
 */
function updateRemainingCarrots(gameState) {
    gameState.remainingCarrots--
    return gameState.remainingCarrots === 0;
}

/** Decrements remainingGophers and checks if 0, returns boolean
 *
 * @returns {boolean}
 */
function updateRemainingGophers(gameState) {
    gameState.remainingGophers--
    return gameState.remainingGophers === 0;
}

/** Checks whether an int is between 3 and 12
 *
 * @param int
 * @returns {boolean}
 */
function checkRowColumnRange(int) {
    return !(int < 3 || int > 12);
}

/**
 * validating form input for row and column numbers
 *
 * @returns object
 */
function inputGetter() {
    let parsedRow = parseInt(document.querySelector('#row').value)
    let parsedColumn = parseInt(document.querySelector('#column').value)
    let parsedGopher = parseInt(document.querySelector('#gopher').value)
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
            document.querySelector(".error_container").textContent = "What you playing at sucka!"
            return false
        }
    })
    if (!checkRowColumnRange(parsedObject.column)) {
        document.querySelector(".error_container").textContent = "Number of rows must be between 3 and 12!"
        return false
    }
    if (!checkRowColumnRange(parsedObject.row)) {
        document.querySelector(".error_container").textContent = "Number of columns must be between 3 and 12!"
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
    const gridSize = height * width
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

/** Hides start screen, displays game grid
 *
 */
function toggleDisplay() {
    splash.classList.toggle('hidden')
    gameBoard.classList.toggle('hidden')
}

/** Toggles the winModal
 *
 */
function toggleGameWin() {
    winModal.classList.remove('hidden')
}

/** Toggles the loseModal
 *
 */
function toggleGameLoss() {
    loseModal.classList.remove('hidden')
}

function getRowHints(height) {
    let rowHintArray = []
    for (let i=1; i<=height; i++){
        rowHintArray.push(document.querySelectorAll(`.hit[data-rowID="${i}"]`).length)
    }
    return rowHintArray
}

function getColHints(width) {
    let colHintArray = []
    for (let i=1; i<=width; i++){
        colHintArray.push(document.querySelectorAll(`.hit[data-colID="${i}"]`).length)
    }
    return colHintArray
}

function setRowHintText(rowHints) {
    for (let i = 0; i < rowHints.length; i++){
        document.querySelector(`[data-rowPos = "${i}"]`).textContent=rowHints[`${i}`]
    }
}

function setColHintText(colHints) {
    for (let i = 0; i < colHints.length; i++){
        document.querySelector(`[data-colPos = "${i}"]`).textContent=colHints[`${i}`]
    }
}

/** Start a new game with data from the form field
 *  @param form_inputs object
 */
function startNewGame(form_inputs) {
    const rows = form_inputs.row
    const columns = form_inputs.column
    const gophers = form_inputs.gopher
    gridDefinition(rows, columns)
    hitGenerator(rows, columns, gophers)
    let rowHints = getRowHints(rows)
    let columnHints = getColHints(columns)
    setRowHintText(rowHints)
    setColHintText(columnHints)
    gameState.remainingGophers = gophers
    gameState.remainingCarrots = (rows * columns) - gophers
    toggleDisplay()
    const gridTiles = document.querySelectorAll('.game-item')

    gridTiles.forEach(function(gridTiles) {
        gridTiles.addEventListener('click', hitOrMiss)
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    document.querySelector(".error_container").textContent = ""
    banner.classList.remove('animateBanner')
    const form_inputs = inputGetter()
    if (form_inputs) startNewGame(form_inputs)
})

endGameModalButtons.forEach(function (endGameModalBtn) {
    endGameModalBtn.addEventListener('click', function(e) {
        banner.classList.add('animateBanner')
        if (!winModal.classList.contains('hidden')) {
            winModal.classList.add('hidden')
            toggleDisplay()
        }
        if (!loseModal.classList.contains('hidden')) {
            loseModal.classList.add('hidden')
            toggleDisplay()
        }
    })
})
