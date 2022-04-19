let inputs = document.querySelectorAll('input')
let form = document.querySelector('form')

function inputGetter(){
    inputs = document.querySelectorAll('input')
    let newObject = {}
    inputs.forEach(function (input){
        let parsed = parseInt(input.value)
        if (!Number.isInteger(parsed)) {
          let displayError = document.querySelector(".data_error")
              displayError.classList.add('display')

        } else if (input.value < 3 || input.value > 30) {
            console.log("Please use a number between 3 and 30, sucka.")
            let numberError = document.querySelector(".number_error")
            numberError.classList.add('display')
        } else {
            newObject [input.name] = (input.value)
        }
    })
    return newObject
}
let form_inputs={}


    form.addEventListener('submit', function (e) {
        e.preventDefault()
        form_inputs= inputGetter()
        console.log(form_inputs)
    })



