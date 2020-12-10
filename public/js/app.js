console.log('client side js is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from Js'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading.. '
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                return messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.address)
                messageOne.textContent = data.location
                messageTwo.textContent= data.forecast


            }
        })
    })


})

