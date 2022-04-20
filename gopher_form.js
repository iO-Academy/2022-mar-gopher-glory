let inputs = document.querySelectorAll('input')
let form = document.querySelector('form')

function inputGetter(){
    inputs = document.querySelectorAll('input')
    let gridDimensionObject = {}
    inputs.forEach(function (input){
        if (input.name === "rows" || input.name === "columns") {
            let parsed = parseInt(input.value)
            if (!Number.isInteger(parsed)) {
                let displayError = document.querySelector(".data_error")
                displayError.classList.add('display')
                return
            } else if (input.value < 3 || input.value > 30) {
                console.log("Please use a number between 3 and 30, sucka.")
                let numberError = document.querySelector(".number_error")
                numberError.classList.add('display')
                return
            } else {
                gridDimensionObject [input.name] = (input.value)
            }
        }
    })
    return gridDimensionObject
}


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

let form_inputs={}
let gridHeight = 0
let gridWidth = 0
let gridHits = 0

form.addEventListener('submit', function (e) {
    e.preventDefault()
    form_inputs= inputGetter()
    gridHeight = form_inputs.rows
    gridWidth = form_inputs.columns
    gridHits = form_inputs.gophers
    if (gridHeight*gridWidth*gridHits!==0) {
        gridDefinition(gridHeight, gridWidth)
    }
})

