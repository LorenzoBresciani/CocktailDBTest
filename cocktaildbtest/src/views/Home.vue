<template>
  <div>
    <div class="header">
      <search-icon :size="30"/>
      <div class="searchRow">
        <input type="text" v-model='search' placeholder="Search cocktail" />
        <button v-if="search !== ''" class="clearButton" @click="clearSearch">Clear</button>
      </div>
      <button @click="searchDrink">Search</button>
    </div>
    <div class="body">
      <div class="counterRow">
        <img class="counterIcon" src="../assets/cocktail-logo.png"/>
        <pre><h3> Total Drinks: </h3></pre> {{totaDrinksCounter}} <pre><h3> | </h3></pre>
        <img class="counterIcon" src="../assets/ingredient-logo.png"/>
        <pre><h3> Total ingredients: </h3></pre> {{totalIngredientsCounter}} <pre><h3> | </h3></pre>
        <img class="counterIcon" src="../assets/images-logo.png"/>
        <pre><h3>Drink images: </h3></pre> {{totalImagesCounter}}
      </div>
      <div class="grid-container">
        <div v-for="drink in cocktailsLimit" :key='drink.idDrink' class="drinkCard" @click="seeDrinkDetails(drink)">
          <img :src="drink.strDrinkThumb + '\/preview'" width="310" height='310'>
          <div class="caption">
            <span>{{drink.strDrink}}</span>
          </div>
        </div>
      </div>
      <div class="gridFooterRow">
        <button v-if="limit !== null" @click="limit = null">Load more +</button>
      </div>
    </div>
  </div>
</template>

<script>

import SearchIcon from 'vue-material-design-icons/Magnify.vue'

export default {
  name: 'Home',
  components: {
    SearchIcon
  },
  data(){
    return{
      search: "",
      cocktails: null,
      limit: 12
    }
  },
 mounted () {
     this.retrieveAllCocktails();
  },

   computed:{

     cocktailsLimit(){
      return this.limit ? this.cocktails.slice(0,this.limit) : this.cocktails
     },

    totaDrinksCounter(){
      if(this.cocktails)
        return this.cocktails.length;
      return []
    },

    totalIngredientsCounter(){
      if(this.cocktails){
        const totalIngredients = [];
        for(const drink of this.cocktails){
          for (const [key, value] of Object.entries(drink)){
            if(key.includes('strIngredient'))
            if(value)
              totalIngredients.push(value)
            }
          }
        return totalIngredients.length;
      }
      return [];
    },
    totalImagesCounter(){
      if(this.cocktails){
        const totalDrinkImages = [];
        for(const drink of this.cocktails){
          for (const [key, value] of Object.entries(drink)){
            if(key.includes('strDrinkThumb'))
            if(value)
              totalDrinkImages.push(value)
          }
        }
        return totalDrinkImages.length + this.totalIngredientsCounter;
      }
      return [];
    }
  },

  methods:{
    seeDrinkDetails(drink){
      this.$router.push({name: 'DrinkDetails', params: {drinkName:drink.strDrink, drink: drink, cocktails: this.cocktails}})
    },
    searchDrink(){
      if(this.search !== "")
      {
        this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(response => (this.cocktails = response.data.drinks.filter(drink => { return drink.strDrink.match(new RegExp(this.search, "i"))})))
      }
      else
       this.retrieveAllCocktails()
    },
    clearSearch(){
      this.search = "";
      this.retrieveAllCocktails();
    },
    retrieveAllCocktails(){
      this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(response => (this.cocktails = response.data.drinks))
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px;
  background-color: #f5f5f5;
}

.searchIcon{
  width:25px;
  height: 25px;
}

button {
  width: 194px;
  height: 44px;
  background-color: black;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
}

.searchRow{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.clearButton{
  color: grey;
  border: none;
  background-color: transparent;
  position: absolute;
  font-size: 14px;
}

input {
  margin: 0 40px;
  height: 41px;
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid grey;
  outline: none;
}

input,
input::-webkit-input-placeholder {
    font-size: 24px;
    /* line-height: 3; */
}

.body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
}

.counterRow{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 156px;
}

.counterIcon{
  height: 25px;
  width: 25px;
  margin-right: 4px;
}

.grid-container{
  display: grid;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  grid-template-columns: 310px 310px 310px 310px;
  grid-gap: 40px 40px;
}

.gridFooterRow{
  display: flex;
  width: 100%;
  height: 182px;
  justify-content: center;
  align-items: center;
}

.drinkCard{
  display: flex;
  flex-direction: column;
  max-width: 310px;
  max-height: 310px;
  cursor: pointer;
}

img{
  object-fit:cover;
  width: 100%;
  height: 100%;
}

.caption{
  display: flex;
  align-items: center;
  font-size: 24px;
  height:53px;
}
</style>