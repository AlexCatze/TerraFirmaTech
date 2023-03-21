// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

var wood_types = ['kapok','hickory','douglas_fir','chestnut','blackwood','aspen','ash','acacia','maple','oak','palm','pine','rosewood','sequoia','spruce','sycamore','white_cedar','willow','birch'];

onEvent('recipes', event => {
	//Рецепты распила дерева
	wood_types.forEach((v)=>createWoodRecipes(event,v))

	//Рецепты жернова
	event.forEachRecipe(
		{type:"tfc:quern"}, recipe =>{
			event.recipes.create.milling(recipe.outputItems, recipe.inputItems)},	
	)
})

onEvent('item.tags', event => {
})

/**
 * 
 * @param {Internal.RecipeEventJS} event 
 * @param {string} name 
 */
function createWoodRecipes(event, name){
	let log = 'tfc:wood/log/'+name
	let stripped_log = 'tfc:wood/stripped_log/'+name
	let wood = 'tfc:wood/wood/'+name
	let stripped_wood = 'tfc:wood/stripped_wood/'+name
	let lumber = 'tfc:wood/lumber/'+name
	event.recipes.createCutting(stripped_wood,wood)
	event.recipes.createCutting(stripped_log,log)

	event.recipes.createCutting(Item.of(lumber,10), stripped_wood)
	event.recipes.createCutting(Item.of(lumber,10), stripped_log)
}