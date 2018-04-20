<template>
  <div class="header">
    <div class="logo"><a href="/"><img src="../../images/box-logo.svg" /></a></div>
     <navigation></navigation>
  </div>
</template>

<script>
import Navigation from './Navigation'
export default {
  name: 'header-app',
  components: {
    Navigation
  }
}
</script>
