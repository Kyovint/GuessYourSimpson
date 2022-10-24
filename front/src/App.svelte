<script>
  import {Router, Route} from 'svelte-routing'
  import Inicio from './pages/Inicio.svelte'
  import Main from './pages/Main.svelte'
</script>


<Router>

  <Route path="/">
    <Inicio/>
  </Route>

  <Route path="/main">
    <Main/>
  </Route>


</Router>
