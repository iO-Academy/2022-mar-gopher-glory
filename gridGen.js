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
        let text = `<div class="grid-slot miss" data-grid-id="${i}"><p>Bonjour</p></div>`
        innerHTML += text
        console.log(i)
    }
    return innerHTML
}

/** Sets the grid template for the container
 *
 * @param height inputted height
 * @param width inputted width
 */
function gridDefinition(height, width){
    let gridCont = document.querySelector("#grid-container")
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
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.add('hit')
            document.querySelector(`[data-grid-id = "${targetCell}"]`).classList.remove('miss')
            console.log(targetCell)
        } else {
            i--  // Decrements the counter if failed to find new cell (repeated cell), so that correct number of cells become hits
        }
    }
}

// let inputs = document.querySelectorAll('input')
// let form = document.querySelector('form')

// function inputGetter(){
//     inputs = document.querySelectorAll('input')
//     let newObject = {}
//     inputs.forEach(function (input){
//         newObject [input.name] = (input.value)
//     })
//     return newObject
// }
// let form_inputs={}
//
//
//
// form.addEventListener('submit', function (e) {
//     e.preventDefault()
//     form_inputs= inputGetter()
//     gridDefinition(form_inputs.rows,form_inputs.columns)
//     hitGenerator(form_inputs.rows, form_inputs.columns, form_inputs.gophers)
// })

let height = 70
let width = 70
let hits = 1
// let hitsLeft = hits
// let lives = height * width - hits


gridDefinition(height, width)
hitGenerator(height, width, hits)
