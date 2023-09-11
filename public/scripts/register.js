document.getElementById('register').addEventListener('click',(event)=> {
    event.preventDefault()
    let email = document.getElementById('email').value
    console.log(email)
    fetch(`/api/cookies/set/${email}`)
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})

document.getElementById('cookie').addEventListener('click',(event)=> {
    event.preventDefault()
    fetch('/api/cookies/get')
        .then(res=>res.json())
        .then(res=>alert(res.cookies.user))
        .catch(err=>console.log(err))
})