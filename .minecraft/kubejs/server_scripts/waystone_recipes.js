var rock_types = []

onEvent('recipes', event => {
    // Waystone Recipes
    event.shaped('waystones:waystone',
                 ['KRK',
                  'KWK',
                  'KRK'], {
        W: 'waystones:warp_stone',
        R: '#forge:stone',
        K: '#tfc:rock_knapping'})

    event.shaped('waystones:waystone',
                 ['KRK',
                  'KWK',
                  'KRK'], {
        W: 'waystones:warp_stone',
        R: '#forge:cobblestone',
        K: '#tfc:rock_knapping'})
})
