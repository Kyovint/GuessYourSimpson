<script>
    import { form, field } from 'svelte-forms';
    import { required } from 'svelte-forms/validators';
    import { navigate } from 'svelte-routing';

    const USERNAME = field('USERNAME', '', [required()]);
    const PASSWORD = field('PASSWORD', '', [required()]);

    const createUserForm = form(USERNAME, PASSWORD);

    const createUser = async() =>{
        fetch('http://localhost:3002/clients',{
            method: "POST",
            body: JSON.stringify($createUserForm.summary),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            } 
        }).then(async response =>{
            if(!response.ok){
                const error = response.status
                return Promise.reject(error)
            }else{
                alert("Usuario Creado")
                location.reload();
            }
        }).catch(error =>{
            alert("Error :( => ) "+error)
        })
    }

</script>

<div class="ContainerUserForm">

    <div class="fieldContainer">
        <span>Usuario</span> 
        <input type="text" bind:value={$USERNAME.value}>
    </div>

    <div class="fieldContainer">
        <span>Contraseña</span> 
        <input type="text" bind:value={$PASSWORD.value}>
    </div>

    <div class="Buttons-Container">
        <button on:click={createUser}>Grabar</button>
    </div>

</div>

<style>
    button{
        color: black;
        background-color: rgb(255, 203, 73);
        border: 1px solid rgb(255, 203, 73);
        font-size: 15px;
        padding: 10px;
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