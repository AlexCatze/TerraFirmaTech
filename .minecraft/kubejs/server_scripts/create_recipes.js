var wood_types = ['kapok','hickory','douglas_fir','chestnut','blackwood','aspen','ash','acacia','maple','oak','palm','pine','rosewood','sequoia','spruce','sycamore','white_cedar','willow','birch'];
var meltable_ores = ['native_copper', 'native_silver', 'native_gold', 'hematite', 'cassiterite', 'bismuthinite', 'garnierite', 'sphalerite', 'tetrahedrite', 'limonite', 'malachite', 'magnetite']


onEvent('recipes', event => {
    //Рецепты распила дерева
    wood_types.forEach((i)=>createWoodRecipes(event,i))

    //Рецепты жернова
    event.forEachRecipe(
            {type:"tfc:quern"}, recipe =>{
                event.recipes.create.milling(recipe.outputItems, recipe.inputItems)},)

    meltable_ores.forEach((v)=>createOreProcessing(event,v))

})

onEvent('item.tags', event => {
})

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
/**
 * 
 * @param {Internal.RecipeEventJS} event 
 * @param {string} ore 
 */
function createOreProcessing(event, ore){
	let rich = 'tfc:ore/rich_'+ore
	let normal = 'tfc:ore/normal_'+ore
	let poor = 'tfc:ore/poor_'+ore
	event.recipes.createCrushing([normal, poor], rich)
	event.recipes.createCrushing([poor, poor], normal)

	createMeltingRecipe(event,rich)
	createMeltingRecipe(event,normal)
	createMeltingRecipe(event,poor)
}

/**
 * 
 * @param {Internal.RecipeEventJS} event 
 * @param {string} item 
 */
function createMeltingRecipe(event, item)
{
	event.forEachRecipe({type:"tfc:heating"},(v)=>
	{
		for (const [key, value] of Object.entries(v)) {
			console.log(`${key}: ${value}`);
		  }
	})
}
