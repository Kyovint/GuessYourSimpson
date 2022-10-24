import { writable } from 'svelte/store'

const authStore = () => {

    const loggedUser ={
        username: undefined,
        password: undefined,
        id: undefined
    }

    const {subscribe, set, update} = writable(loggedUser)

    const methods = {
        resetUser(){
            update (loggedUser =>{
                loggedUser.name = undefined
                loggedUser.password = undefined
                return loggedUser
            })
        },
        saveUser(username, password, id){
            update(loggedUser =>{
                loggedUser.username = username
                loggedUser.password = password
                loggedUser.id = id
                return loggedUser
            })
        }
    }

    return{
        subscribe,
        set,
        update,
        ...methods
    }
}

export default authStore()