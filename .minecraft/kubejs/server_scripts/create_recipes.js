var wood_types = ['kapok','hickory','douglas_fir','chestnut','blackwood','aspen','ash','acacia','maple','oak','palm','pine','rosewood','sequoia','spruce','sycamore','white_cedar','willow','birch'];
var meltable_ores = ['native_copper', 'native_silver', 'native_gold', 'hematite', 'cassiterite', 'bismuthinite', 'garnierite', 'sphalerite', 'tetrahedrite', 'limonite', 'malachite', 'magnetite']


onEvent('recipes', event => {
    //Рецепты распила дерева
    wood_types.forEach(type => createWoodRecipes(event, type))

    //Рецепты жернова
    //event.forEachRecipe({type:"tfc:quern"}, recipe => {
    //event.recipes.create.milling(recipe.outputItems, recipe.inputItems)})
    event.forEachRecipe(
		{type:"tfc:quern"}, recipe =>{
            var data = JSON.parse(recipe.json)
            if(data.ingredient.type=="tfc:not_rotten")
                event.recipes.createMilling(data.result.stack,data.ingredient.ingredient)
            else
                event.recipes.createMilling(data.result,data.ingredient)
		}		
	)

    meltable_ores.forEach(ore => createOreProcessing(event, ore))

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
            var nbt = {};
            nbt.tank = {};
            nbt.tank.Amount = data.fluid.amount;
            nbt.tank.FluidName = data.fluid.ingredient;
            event.recipes.createFilling(Item.of(data.mold.item, 1, nbt), [
                data.mold.item,
                Fluid.of(data.fluid.ingredient, data.fluid.amount)
            ])
		}		
	)

    //Рецепты сварки
    event.forEachRecipe(
		{type:"tfc:welding"}, recipe =>{
            var data = JSON.parse(recipe.json)
            /*event.recipes.createCompacting(data.result.item, [
                data.first_input,
                data.second_input,
                'tfc:powder/flux'
            ]).heated()*/
            var trans = data.result;
            event.recipes.createSequencedAssembly(
                [data.result],
                data.first_input,[
                event.recipes.createDeploying(trans,[trans,'tfc:powder/flux']),
                event.recipes.createDeploying(trans,[trans,data.second_input]),
                event.recipes.createPressing(trans,trans),
                ]).transitionalItem(trans).loops(1) 
		}		
	)

    //Простые рецепты ковки
    event.forEachRecipe(
		{type:"tfc:anvil"}, recipe =>{
            var data = JSON.parse(recipe.json)
            if(data.result.item.startsWith("tfc:metal/ingot/"))//Отбивание слитков
                event.recipes.createPressing(data.result, [
                data.input
            ])
            else if(data.result.item.startsWith("tfc:metal/chain/"))//Делание цепей
            {
                var trans = data.result;
                event.recipes.createSequencedAssembly(
                    [data.result],
                    data.input,[
                    event.recipes.createCutting(trans,trans),
                    event.recipes.createPressing(trans,trans)
                    ]).transitionalItem(trans).loops(3) 
            }
		}		
	)


})

onEvent('item.tags', event => {})

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
