const loginOptions = {
    headers: {
        "content-type": "application/json; charset=UTF-8"
    },
    method:"GET"
}

const createOptions = {
    headers: {
        "content-type": "application/json"
    },
    method:"POST"
}

async function login(username,password) {
    const data = await fetch(`http://localhost:5001/login/${username}/${password}`, loginOptions)
    return data
}


document.querySelector('#login-button').addEventListener('click', async () => { //login
    const username = document.querySelector('#username-input').value
    const password = document.querySelector('#password-input').value

    try{
        const data = await login(username,password)
        if (data.status === 200){ //passwords match, access permitted
            const userId = (await data.json()).id
            console.log(userId)
            sessionStorage.setItem('id', userId)

            window.location.replace('../main/main.html')
        } else {
            document.querySelector('#error-text h2').innerHTML = 'Username or password is incorrect'
        }
    } catch (error) {
        console.log(error)
    }


})

document.querySelector('#create-button').addEventListener('click', async () => {
    const username =  document.querySelector('#username-input').value
    const password = document.querySelector('#password-input').value
    const data = await fetch(`http://localhost:5001/login/new/${username}/${password}`,options)

    //display to page saying how account is created
})

document.querySelector('#username-input').addEventListener('input', () => {
    document.querySelector('#error-text h2').innerHTML = ''
})
document.querySelector('#password-input').addEventListener('input', () => {
    document.querySelector('#error-text h2').innerHTML = ''
})
