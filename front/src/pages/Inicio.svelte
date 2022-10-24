<script>
    import { onMount } from "svelte";
    import UserForm from '../components/UserForm.svelte'
    import LoginForm from '../components/LoginForm.svelte'
    

    var actualUsers = []
    var behaviour = ""
    var titlePage = ""
    var buttonText = ""

    const getUsers = async() =>{
        await fetch("http://localhost:3002/clients")
        .then(res => res.json())
        .then(response => actualUsers = response)
    }

    onMount(async() =>{
        await getUsers()
        if(actualUsers.length === 0){
            behaviour = "Create User"
            titlePage = "Creación de Usuario"
            buttonText = "Login"
        }else{
            behaviour = "Login"
            titlePage = "Login"
            buttonText = "Crear Usuario"
        }
    })

    const chageState = () =>{
        if(behaviour === "Login"){
            behaviour="Create User"
            buttonText = "Login"
            titlePage = "Creación de Usuario"
        }else{
            behaviour="Login"
            buttonText = "Crear Usuario"
            titlePage = "Login"
        }
    }
</script>

<div class="container">
    <div class="form-header">
        {titlePage}
    </div>
    <div class="form-container">
        {#if behaviour === "Create User"}
            <UserForm></UserForm>
        {:else if behaviour === "Login"}
            <LoginForm></LoginForm>
        {/if}
    </div>
    <button style="margin-top:6px; background-color:transparent; border:none; text-decoration:dashed"
    on:click={chageState}
    >{buttonText}</button>
    
</div>

<style>
    .form-header{
        font-family: 'Nunito';
        height: 70px;
        width: 400px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 70px;
        font-weight: 600;
        font-size: 40px;
        text-shadow: 2px 2px black;
    }
    
    .form-container{
        background-color: rgb(138, 119, 0);
        border-radius: 6%;
        font-family: 'Nunito';
        height: 500px;
        width: 400px;
        box-shadow: 2px 2px black;
    }

    .container{
        width: 100%;
        height: 100vh;
        background-color: rgb(255, 222, 9);
        color: aliceblue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>