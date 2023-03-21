
onEvent('recipes', event => {
    event.custom({
        type: 'tfc:heating',
        ingredient: Ingredient.of('tconstruct:grout').toJson(),
        result_item: Item.of('tconstruct:seared_brick').toJson(),
        temperature: 1399
    })
})