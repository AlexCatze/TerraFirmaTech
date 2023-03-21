var wood_types = ['kapok','hickory','douglas_fir','chestnut','blackwood','aspen','ash','acacia','maple','oak','palm','pine','rosewood','sequoia','spruce','sycamore','white_cedar','willow','birch'];
var meltable_ores = ['native_copper', 'native_silver', 'native_gold', 'hematite', 'cassiterite', 'bismuthinite', 'garnierite', 'sphalerite', 'tetrahedrite', 'limonite', 'malachite', 'magnetite']


onEvent('recipes', event => {
    //Рецепты распила дерева
    wood_types.forEach((i)=>createWoodRecipes(event,i))

    //Рецепты жернова
    event.forEachRecipe(
            {type:"tfc:quern"}, recipe =>{
                event.recipes.create.milling(recipe.outputItems, recipe.inputItems)})

    meltable_ores.forEach((v)=>createOreProcessing(event,v))

    //Рецепты плавки
    event.forEachRecipe(
		{type:"tfc:heating"}, recipe =>{
            var data = JSON.parse(recipe.json)
            if(data.result_fluid) 
            {
                let output = Fluid.of(data.result_fluid.fluid, data.result_fluid.amount);
			    let input = data.ingredient.item;
			    /*if(temperature > 1500)
			    	event.recipes.create.mixing(output, input).superheated() /// У нас пока негде его брать
		    	else */
		    		event.recipes.create.mixing(output, input).heated()
            }
		}		
	)

    //Рецепты отливки
    event.forEachRecipe(
		{type:"tfc:casting"}, recipe =>{
            var data = JSON.parse(recipe.json)
            event.recipes.createFilling(data.result.item, [
                data.mold.item,
                Fluid.of(data.fluid.ingredient, data.fluid.amount)
            ])
		}		
	)

    //Рецепты сварки
    event.forEachRecipe(
		{type:"tfc:welding"}, recipe =>{
            var data = JSON.parse(recipe.json)
            event.recipes.createCompacting(data.result.item, [
                data.first_input,
                data.second_input,
                'tfc:powder/flux'
            ].filter(item=>item)).heated()//.filter(item=>item)
		}		
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
}
