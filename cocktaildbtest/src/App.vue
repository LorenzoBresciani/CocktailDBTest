<template>
  <div id="app">
    <div class="siteHeader">
      <img class="logoHeader" src="./assets/cocktail-logo.png"/>
      <h2>Cocktail Time</h2>
    </div>
    <router-view/>
    <div class="footer">
      <span>@ 2020 CocktailTime  </span>
      <span>Powered by www.thecocktaildb.com</span>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

.siteHeader{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
}
.logoHeader{
  height: 25px;
  width: 25px;
  margin-right: 4px;
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 40px;
  font-size: 14px;
}

</style>
