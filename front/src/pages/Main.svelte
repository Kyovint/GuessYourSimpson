<script>
    import { onMount } from 'svelte';
    import authStore from '../store/auth.js'
    import { navigate } from 'svelte-routing';

    var behaviour = "Intro"

    var features = []
    var facts = []
    var allQuestions = []
    var questions = []
    var names = []
    var featuresAssociated = []

    var answers = []
    var observer = 0

    const getFeatures = async ()=>{
        await fetch("http://localhost:3002/features")
        .then(res => res.json())
        .then(response => features = response)
    };

    const getNames = async ()=>{
        await fetch("http://localhost:3002/names")
        .then(res => res.json())
        .then(response => names = response)

        names.forEach(function(item, index){
            names[index] = item.name
        })
    };

    const getFacts = async ()=>{
        await fetch("http://localhost:3002/facts")
        .then(res => res.json())
        .then(response => facts = response)
    };

    const getQuestions = async ()=>{
        await fetch("http://localhost:3002/questions")
        .then(res => res.json())
        .then(response => allQuestions = response)
    };

    var lastIdAudit
    var allAudits = []
    const getLastAuditId = async ()=>{
        await fetch("http://localhost:3002/audits")
        .then(res => res.json())
        .then(response => allAudits = response)

        lastIdAudit = allAudits[allAudits.length -1].id
    };

    var lastIdResult
    var allResults = []
    const getLastResultId = async ()=>{
        await fetch("http://localhost:3002/results")
        .then(res => res.json())
        .then(response => allResults = response)

        lastIdResult = allResults[allResults.length -1].id
    };

    const selectQuestions = () =>{
        allQuestions.forEach(function(item, index){
            if(item.Type === "general"){
                questions.push(item.question)
                featuresAssociated.push(item.feature)
            }
        })
        if(selected != null && selected != ""){
            allQuestions.forEach(function(item, index){
                if(item.Type === "child"){
                    questions.push(item.question)
                    featuresAssociated.push(item.feature)
                }
            })
            answers.push(selected)
        }else{
            allQuestions.forEach(function(item, index){
                if(item.Type === "adult"){
                    questions.push(item.question)
                    featuresAssociated.push(item.feature)
                }
            })
        }
        questions = questions
        behaviour = "Game"
    }

    const buttonClick = async () =>{
        observer += 1
        if(selected != null && selected != ""){
            answers.push(selected)
            selected = ""
        }

        if(observer === questions.length){
            await validatorCharacter()
            await findSimilarCharacters()
            behaviour = "Result"
        }
    }

    var similarResults = []
    const findSimilarCharacters = () =>{
        var counterFacts = 0
        var checkingCharacterSimilarArray = []
        var similaryPercent = 0
        names.forEach(function(item, index){
            facts.forEach(function(a,b){
                if(a.name === names[index]){
                    checkingCharacterSimilarArray.push(a.feature)
                }
            })
            checkingCharacterSimilarArray.forEach(function(x,y){
                if(answers.includes(x)){
                    counterFacts = counterFacts + 1
                }
            })

            similaryPercent = (100 * counterFacts)/answers.length
            if(similaryPercent > 60){
                similarResults.push(item)
            }

            similaryPercent = 0
            counterFacts = 0
            checkingCharacterSimilarArray = []
            
        })
        if(guessedCharacter != ""){
            var index = similarResults.indexOf(guessedCharacter);
            similarResults.splice(index, 1);
        }
    }
    
    var guessedCharacter = ""
    const validatorCharacter = () =>{
        var checkingCharacterArray = []
        names.forEach(function(item, index){
            facts.forEach(function(a,b){
                if(a.name === names[index]){
                    checkingCharacterArray.push(a.feature)
                }
            })
            if(checkingCharacterArray.length === answers.length){
                if(checkingCharacterArray.sort().join(',') === answers.sort().join(',')){
                    guessedCharacter = item
                }
            }
            checkingCharacterArray = []
        })
    }

    var selection = ""
    const uploadResults = () =>{
         
        const results ={
            selection: selection,
            secondOption: undefined,
            thirdOption: undefined,
            fourthOption: undefined
        }

        if(similarResults[0] === undefined){
            results.secondOption = "no Aplica"
        }else{
            results.secondOption = similarResults[0]
        }

        if(similarResults[1] === undefined){
            results.thirdOption = "no Aplica"
        }else{
            results.thirdOption = similarResults[1]
        }

        if(similarResults[2] === undefined){
            results.fourthOption = "no Aplica"
        }else{
            results.fourthOption = similarResults[2]
        }

        fetch('http://localhost:3002/results', {
            method:"POST",
            body:JSON.stringify(results),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
        } 

        }).then(async response =>{
            if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
            }
        }).catch(error => {
            alert("ERROR: error ocurrido en la subida de los resultados")
         })
    }

    const uploadAudits = async() =>{
        const audit ={
            idClient: $authStore.id,
            answers: ""
        }

        await answers.forEach(function(item, index){
            if(index === 0){
                audit.answers = item
            }else{
                audit.answers = audit.answers +","+ item
            }
            
        })

        fetch('http://localhost:3002/audits', {
            method:"POST",
            body:JSON.stringify(audit),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
        } 

        }).then(async response =>{
            if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
            }
        }).catch(error => {
            alert("ERROR: error ocurrido en la subida de la auditoria de respuestas")
         })
    }

    const uploadAtention = () =>{
        const atention ={
            idClient: $authStore.id,
            idAudit: lastIdAudit + 1,
            idResults: lastIdResult + 1
        }

        fetch('http://localhost:3002/suggestedCharacters', {
            method:"POST",
            body:JSON.stringify(atention),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
        } 

        }).then(async response =>{
            if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
            }
        }).catch(error => {
            alert("ERROR: error ocurrido en la subida de la atencion")
         })
    }

    const uploadData = async () =>{
        await uploadResults()
        await uploadAudits()
        await uploadAtention()
        authStore.resetUser()
        alert("Gracias por jugar :D")
        navigate('/', {replace:true})
    }

    $: if(selection) uploadData()

    var selected="";
	function onChange(event) {
        var provisional = null
		provisional = event.currentTarget.value;
        if(provisional != null){
            selected = provisional
        }
	}

    onMount(async()=>{
        await getFeatures()
        await getFacts()
        await getQuestions()
        await getNames()

        await getLastResultId()
        await getLastAuditId()
    })

    const logOut = () =>{
        
        authStore.resetUser()
        navigate('/', {replace:true})
    }

</script>

<header>
    <span>Usuario: {$authStore.username}</span>
    <button on:click={logOut}>Cerrar sesion</button>
</header>

<div class="container">
    {#if behaviour === "Intro"}
        <div class="content">
            <img src="public/familia.png" alt="familiaPortada" style="height:200px">
            <h1 style="font-weight:600; text-shadow:2px 2px black">Bienvenido a GUESS YOUR SIMPSON</h1>
            <span style="font-weight:600">Piensa en un personaje entre los siguientes</span>
            <span>Abraham, Apu, Bart, Bartney, Burns, Cletus, Duffman, Edna, Hibbert</span>
            <span>Homero, Krosty, Lenny, Lisa, Maggie, Marge, Milhouse, Moe, Nelson, Nick</span>
            <span>Ralph, Skinner o Smithers y....</span>
            <button class="StartButton" on:click={()=> behaviour = "Desicion"}> Que empiece el juego</button>
        </div>
    {:else if behaviour === "Desicion"}
        <div class="QuestionContainer">
            <h2 class="questionText">¿Tu personaje es un niño?</h2>

            <div class="answersSelectorContainer">
                <div class="SelectorAndOptions">
                    <input checked={selected==="niño"} on:change={onChange} type="radio" name="amount" value="niño" />
                    <span>si</span>
                </div>
                <div class="SelectorAndOptions">
                    <input checked={selected===null} on:change={onChange} type="radio" name="amount" value={null} />
                    <span>no</span>
                </div>
            </div>
            <button class="StartButton" on:click={selectQuestions}> Siguiente pregunta</button>
        </div>
    {:else if behaviour === "Game"}
        <div class="QuestionContainer">
            <h2 class="questionText">{questions[observer]}</h2>

            <div class="answersSelectorContainer">
                <div class="SelectorAndOptions">
                    <input checked={selected===featuresAssociated[observer]} on:change={onChange} type="radio" name="amount" value={featuresAssociated[observer]} />
                    <span>si</span>
                </div>
                <div class="SelectorAndOptions">
                    <input checked={selected===null} on:change={onChange} type="radio" name="amount" value={null} />
                    <span>no</span>
                </div>
            </div>
            <button class="StartButton" on:click={buttonClick}> Siguiente pregunta</button>
        </div>
    {:else if behaviour === "Result"}
        <div class="content">
            {#if guessedCharacter === "" && similarResults.length === 0}
            <div>
                Tus respuestas son muy aleatorias
                <button class="finalButtonWithoutResult" on:click={logOut}>Finalizar</button>
            </div>
            {:else}
            {#if guessedCharacter != ""}
                <h2>Creemos que has pensado en: </h2>
                    <button on:click={() => selection = guessedCharacter}>
                        <img 
                        src="public/{guessedCharacter}.png"
                        alt="result"
                        style="width:200px; height:200px"/> 
                    </button>
                <h3 class="resultText">{guessedCharacter}</h3>
            {/if}
            <h2> Aqui algunas opciones</h2>
            <div class="otherOptions">
                {#each similarResults as similar}
                    <button style="margin-right:5px" on:click={() => selection = similar}>
                        <img 
                        src="public/{similar}.png"
                        alt="similarResult"
                        style="width:50px; height:50px;"/> 
                    </button>
                {/each}
            </div>
            <h3 style="color:grey">Selecciona el personaje que pensaste</h3>
            {/if}
        </div>
    {/if}
</div>

<style>

    .otherOptions{
        display: flex;
        flex-direction: row;
    }

    .resultText{
        font-family: 'Nunito';
        width: fit-content;
        margin-top: 30px;
        background-color: rgb(195, 35, 35);
        color:aliceblue;
        border: none;
        box-shadow: 2px 2px black;
        padding: 8px;
    }

    .finalButtonWithoutResult{
        font-family: 'Nunito';
        width: fit-content;
        margin-top: 30px;
        background-color: rgb(195, 35, 35);
        color:aliceblue;
        border: none;
        box-shadow: 2px 2px black;
        padding: 8px;
    }

    .SelectorAndOptions{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px;
    }

    .answersSelectorContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: space-between;
    }

    .questionText{
        text-align: center;
    }

    .QuestionContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        height: 400px;
        width: 400px;
        background-color: rgba(46, 42, 0, 0.196);
        box-shadow: 2px 2px black;
        color:aliceblue;
    }

    .StartButton{
        font-family: 'Nunito';
        margin-top: 30px;
        background-color: rgb(195, 35, 35);
        color:aliceblue;
        border: none;
        box-shadow: 2px 2px black;
        padding: 8px;
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }


    header{
        font-family: 'Nunito';
        background-color: rgb(255, 222, 9);
        padding-top: 5px;
        padding-left: 10px;
    }


    .container{
        font-family: 'Nunito';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        height: 96vh;

        background-color: rgb(255, 222, 9);
    }
</style>