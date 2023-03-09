window.addEventListener('DOMContentLoaded', (event) => {
    const cookiesContainer = document.querySelector('#cookies')
    const btnCookie = document.querySelector('#btn-cookies')

    if (cookiesContainer) {
        cookieMessage(cookiesContainer)
    }
    if(btnCookie){
        btnCookie.addEventListener('click', () =>{
            if (cookiesContainer){
                cookiesContainer.style.display = 'none'
                setCookie('cookie', true,30)
            }
        })
    }

});
const setCookie = (cName, cValue, expDays) =>{
    let date = new Date()

    date.setTime(date.getTime() + ( expDays * 24 * 60 * 60 * 1000 ))
    const expires = `expires${date.toUTCString()}`
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`
}
const getCookie = (cName) =>{
    const name = `${cName}=`
    const cDecoded = decodeURIComponent(document.cookie)
    const cArr = cDecoded.split("; ")
    let value

    cArr.forEach(val =>{
        if(val.indexOf(name) === 0) {
            value = val.substring(name.length)
        }
    })
    return value
}
const cookieMessage = (cookiesContainer)=>{

    if(!getCookie('cookie')){
        console.log(getCookie('cookie'))
        cookiesContainer.style.display = 'block'
    }
}