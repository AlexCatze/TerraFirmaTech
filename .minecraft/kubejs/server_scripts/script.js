// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true



onEvent('recipes', event => {

})

onEvent('item.tags', event => {
})

/**
 * 
 * @param {Internal.RecipeEventJS} event 
 * @param {string} name 
 */
