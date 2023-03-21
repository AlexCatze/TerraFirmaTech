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
    // Warp Stone Recipes
    event.shaped('waystones:warp_stone',
                 ['DSD',
                  'EGE',
                  'DSD'], {
        G: '#forge:gems',
        D: 'minecraft:purple_dye',
        E: 'minecraft:spider_eye',
        S: 'minecraft:string'})
    event.shaped('waystones:warp_stone',
                 ['DSD',
                  'EOE',
                  'DSD'], {
        O: '#tfc:ore_pieces',
        D: 'minecraft:purple_dye',
        E: 'minecraft:spider_eye',
        S: 'minecraft:string'})
})
