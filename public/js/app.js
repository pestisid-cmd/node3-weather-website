
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //prevents from refreshing the page

    const location = search.value 

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if(!location){
        
        return messageOne.textContent = 'Please provide some address'
    }

    fetch('/weather?address=' + location).then((response, error) => {

    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = ''
            messageTwo.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        
        }
        
    })
   
})


})