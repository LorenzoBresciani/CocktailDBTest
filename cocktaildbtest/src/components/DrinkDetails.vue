<template>
  <div class="body">
    <div class="firstRow">
      <img :src="drinkDetails.strDrinkThumb"/> 
      <div class="drinkInstruction">
        <div class="row"></div>
        <div class="instructionBody">
          <div class="breadcrumb">
            <span @click="returnHome" style="cursor:pointer">Home / </span><span>{{drinkDetails.strDrink}}</span>
          </div>
          <h1>{{drinkDetails.strDrink}}</h1>
          <h2>Instructions:</h2>
          <ul>
            <li>{{drinkDetails.strInstructions}}</li>
          </ul>
          <h2>Glass:</h2>
          <span>Serve: {{drinkDetails.strGlass}}</span>
        </div>
      </div>
    </div>
    <div class="secondRow">
      <div class="secondRowHeader">
        <h2>Ingredients: ({{filterDrinkIngredients.length}})</h2>
      </div>
      <div class="grid-container">
        <div v-for="(ingr, index) in filterDrinkIngredients" :key='index' class="drinkCard" @click="seeDrinkDetails(drinkDetails)">
          <img :src="'https://www.thecocktaildb.com/images/ingredients/' + ingr.toLowerCase() + '-Medium.png'">
          <span style="font-weight: bold;margin-top: 48px;margin-bottom: 48px;">{{filterIngredientsMeasures[index]}}</span>
        </div>
      </div>
    </div>
    <div class="thirdRow">
      <h2>Browse more</h2>
    </div>
    <div class="fourthRow">
        <div v-for="cocktail in cocktails" :key='cocktail.idDrink' class="previewCard" @click="seeDrinkDetails(cocktail)">
          <img class='previewImg' :src="cocktail.strDrinkThumb + '\/preview'" width="310" height='310'>
          <div class="caption">
            <span>{{cocktail.strDrink}}</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DrinkDetails',
  props:{
      drinkId: String,
    },
    data(){
      return {
        drinkDetails: {},
        cocktails: []
      }
    },
    mounted(){
      this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.drinkId)
      .then(response => this.drinkDetails = response.data.drinks[0])

      this.randomCocktails();
    },
  computed: {
    filterDrinkIngredients(){
      return this.filterDrinkByObjProp('strIngredient')
    },
    filterIngredientsMeasures(){
      return this.filterDrinkByObjProp('strMeasure')
    },
  },
  methods:{
    returnHome(){
      this.$router.push({name: 'Home'})
    },
    seeDrinkDetails(drink){
      this.$router.push({
        name: 'DrinkDetails',
         params: {
           drinkName: drink.strDrink,
           drinkId: drink.idDrink
           }
      })
    },

    filterDrinkByObjProp(objProp){
      const drinkArr = [];

      for (const [key, value] of Object.entries(this.drinkDetails)) {
        if(key.includes(objProp))
          if(value)
            drinkArr.push(value)
      }
        return drinkArr
    },
    randomCocktails(){
      this.cocktails = [];
      for(let i = 0; i < 4; i++)
      {
        this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
          .then(response => {
            if(!this.cocktails.find(drink => drink.idDrink === response.data.drinks[0].idDrink))
              this.cocktails.push(response.data.drinks[0])
          })
      }
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
  justify-content: flex-end;
  background-color:  #f5f5f5;
  margin-right: 5px;
  margin-bottom: 5px;
}

.drinkCard > img{
  object-fit:cover;
  max-width: 150px;
  max-height: 150px;
}

.drinkCard > span {
  margin-top: 46px;
}

.grid-container{
  display: grid;
  grid-template-columns: repeat(2, 350px);
  grid-auto-rows: 350px;
  height: 100%;
}


.secondRow{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.secondRowHeader{
  display: flex;
  align-items: center;
  padding-left: 259px;
  height:113px;
}

.secondRowHeader > h2 {
  margin-bottom: 0;
}

.thirdRow{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 193px;
}

.fourthRow{
  display: grid;
  justify-content: center;
  grid-template-columns: 310px 310px 310px 310px;
  grid-template-rows: 300px;
  gap: 40px 40px;
  padding: 0 40px;
  margin-bottom: 85px;
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

.caption{
  display: flex;
  align-items: center;
  font-size: 24px;
  height:53px;
}

</style>