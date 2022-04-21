
let form = document.querySelector('form')


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
        return
    }
    Object.values(parsedObject).forEach(function (input) {
        if (!Number.isInteger(input)) {
            document.querySelector(".error_container").textContent = "What you playing at sucka! (incorrect datatype)"
            return
        } else if (input < 3 || input > 30) {
            document.querySelector(".error_container").textContent = "Please enter a value between 3 and 30!"
            return
        }
    })
    return parsedObject
}

let form_inputs = {}


form.addEventListener('submit', function (e) {
    e.preventDefault()
    document.querySelector(".error_container").textContent = ""
    form_inputs = inputGetter()
    console.log(form_inputs)
})






