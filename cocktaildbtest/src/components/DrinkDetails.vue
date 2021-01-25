<template>
  <div class="body">
    <div class="firstRow">
      <img :src="drink.strDrinkThumb"/> 
      <div class="drinkInstruction">
        <div class="row"></div>
        <div class="instructionBody">
          <div class="breadcrumb">
            <span @click="returnHome" style="cursor:pointer">Home / </span><span>{{drink.strDrink}}</span>
          </div>
          <h1>{{drink.strDrink}}</h1>
          <h2>Instructions:</h2>
          <ul>
            <li>{{drink.strInstructions}}</li>
          </ul>
          <h2>Glass:</h2>
          <span>Serve: {{drink.strGlass}}</span>
        </div>
      </div>
    </div>
    <div class="secondRow">
      <div class="secondRowHeader">
        <h3>Ingredients: ({{filterDrinkIngredients.length}})</h3>
      </div>
      <div class="grid-container">
      <div v-for="(ingr, index) in filterDrinkIngredients" :key='index' class="drinkCard" @click="seeDrinkDetails(drink)">
          <img :src="'https://www.thecocktaildb.com/images/ingredients/' + ingr.toLowerCase() + '-Medium.png'">
          <span style="font-weight: bold;">{{filterIngredientsMeasures[index]}}</span>
        </div>
      </div>
    </div>
    <div class="thirdRow">
      <h2>Browse more</h2>
    </div>
    <div class="fourthRow">
        <div v-for="cocktail in cocktailsRandomSorter" :key='cocktail.idDrink' class="previewCard" @click="seeDrinkDetails(cocktail)">
          <img class='previewImg' :src="cocktail.strDrinkThumb + '\/preview'" width="310" height='310'>
          <span>{{cocktail.strDrink}}</span>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DrinkDetails',
  props:{
      drink: Object,
      cocktails: Array
    },
  computed: {
    filterDrinkIngredients(){
      return this.filterDrinkByObjProp('strIngredient')
    },
    filterIngredientsMeasures(){
      return this.filterDrinkByObjProp('strMeasure')
    },
    cocktailsRandomSorter(){
      const otherCocktails = this.cocktails.filter(drink => drink.idDrink !== this.drink.idDrink)
      otherCocktails.sort(() => 0.5 - Math.random())
      return otherCocktails.slice(0,4)
    }
  },
  methods:{
    returnHome(){
      this.$router.push({name: 'Home'})
    },
    seeDrinkDetails(drink){
      this.$router.push({
        name: 'DrinkDetails',
         params: {
           drinkName:drink.strDrink,
           drink: drink,
           cocktails: this.cocktails
           }
      })
    },

    filterDrinkByObjProp(objProp){
      const drinkArr = [];

      for (const [key, value] of Object.entries(this.drink)) {
        if(key.includes(objProp))
          if(value)
            drinkArr.push(value)
      }
        return drinkArr
    }    
  }
}

</script>

<style scoped>

.firstRow{
  display: flex;
  flex-direction: row;
}

.drinkInstruction{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.breadcrumb{
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-bottom: 48px;
}

h1{
  font-size: 48px;
  margin-bottom: 54px;
}

span{
  font-size: 16px;
}

.row{
  display: flex;
  height:44px;
  background-color: #f5f5f5;
}

.instructionBody{
  display: flex;
  flex-direction: column;
  padding: 78px 169px 0 156px;
}

.drinkCard{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  #f5f5f5;
  margin-right: 5px;
  margin-bottom: 5px;
}

.grid-container{
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 1fr 1fr;
}


.secondRow{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.secondRowHeader{
  display: flex;
  align-items: center;
  padding-left: 259px;
  height:113px;
}

.thirdRow{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 193px;
}

.fourthRow{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 300px;
  gap: 40px 40px;
  padding: 0 40px;
}

.previewCard{
  display: flex;
  flex-direction: column;
  max-width: 310px;
  max-height: 310px;
  cursor: pointer;
}

.previewImg{
  object-fit:cover;
  width: 100%;
  height: 100%;
}

ul{
  margin-bottom: 67px;
}

h2{
  margin-bottom: 31px;
}

</style>