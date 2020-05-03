<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html,
  body {
    font-family: "Helvetica";
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  li,
  a,
  div,
  p {
    margin: 0;
    padding: 0;
    font-family: "Helvetica";
    font-size: 14px;
    color: #000;
    font-weight: normal;
    list-style: none;
    text-decoration: none;
  }
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
  a{
      cursor: pointer;
  }
  *{
    outline: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>