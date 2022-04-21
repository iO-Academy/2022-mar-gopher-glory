const form = document.querySelector('form')

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
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.add('game-board__gopher')
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.remove('game-board__sapling')
        } else {
            i--  // Decrements the counter if failed to find new cell (repeated cell), so that correct number of cells become hits
        }
    }
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
    if (parsedGopher > Math.floor((parsedColumn * parsedRow) / 2)) {
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
        console.log('here1')
        document.querySelector(".error_container").textContent = "Please enter a value between 3 and 30!"
        return false
    }
    if (!checkRange(parsedObject.row)) {
        console.log('here2')
        document.querySelector(".error_container").textContent = "Please enter a value between 3 and 30!"
        return false
    }

    return parsedObject
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    document.querySelector(".error_container").textContent = ""
    const form_inputs = inputGetter()
    if (form_inputs) {
        gridDefinition(form_inputs.row, form_inputs.column)
    }
})
