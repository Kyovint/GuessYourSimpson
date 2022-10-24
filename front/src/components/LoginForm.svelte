<script>
    import { form, field } from 'svelte-forms';
    import { required } from 'svelte-forms/validators';
    import { navigate } from 'svelte-routing';
    import axios from 'axios';
    import authStore from '../store/auth.js'

    const USERNAME = field('USERNAME', '', [required()]);
    const PASSWORD = field('PASSWORD', '', [required()]);
    const loginForm = form(USERNAME, PASSWORD);

    var loginErrorMessage = ""
    const login = async() =>{
        const data = { username: $USERNAME.value, password: $PASSWORD.value };
        await axios.post("http://localhost:3002/clients/login", data)
        .then(async (response)=>{
            if(response.data === "Contraseña invalida" || response.data === "Usuario no existe"){
                loginErrorMessage = response.data
                alert(loginErrorMessage)
            }else{
                await authStore.saveUser($USERNAME.value, $PASSWORD.value, response.data)
                navigate('/main', {replace:true})
            }
        })
    }
</script>

<div class="ContainerUserForm">

    <div class="fieldContainer">
        <span>Usuario</span> 
        <input type="text" bind:value={$USERNAME.value}>
    </div>

    <div class="fieldContainer">
        <span>Password</span> 
        <input type="text" bind:value={$PASSWORD.value}>
    </div>

    <div class="Buttons-Container">
        <button on:click={login}>Ingresar</button>
    </div>

</div>

<style>
    button{
        background-color: transparent;
        border: 1px solid rgb(255, 203, 73);
        color:aliceblue;
        font-size: 15px;
        padding: 4px;
    }

    .Buttons-Container{
        display: flex;
        justify-content: space-around;
    }

    span{
        margin-right: 20px;
    }

    .ContainerUserForm{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .fieldContainer{
        width: 90%;
        padding-left: 10px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
    }

</style>