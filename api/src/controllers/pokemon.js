const axios = require('axios')
const { Pokemon, Tipo } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

const getPokemon = async (name) => {
    const result = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40')
    const pokeList = result.data.results

    const fromApi = await Promise.all(pokeList.map(async (poke) => {
        const pokeDetail = await axios.get(poke.url)
        const obj = {
            id: pokeDetail.data.id,
            name: pokeDetail.data.name,
            height: pokeDetail.data.height,
            weight: pokeDetail.data.weight,
            frontSprite: pokeDetail.data.sprites.other.dream_world['front_default'],
            types: [],
            from: 'api'
        }
        pokeDetail.data.stats.forEach(e => {
            if (e.stat.name === 'hp') {
                obj.life = e['base_stat']
            }
            else if (e.stat.name === 'attack' || e.stat.name === 'defense' || e.stat.name === 'speed') {
                obj[e.stat.name] = e['base_stat']
            }
        });
        pokeDetail.data.types.forEach(e => {
            obj.types.push(e.type.name)
        });
        return obj
    }))
    const fromDb = await Pokemon.findAll()
    const finalList = fromApi.concat(fromDb)
    if (name) {
        const filtered = finalList.filter(poke => poke.name === name)
        if (filtered.length === 0) throw Error('No existe el pokemon buscado')
        return filtered
    }
    return finalList
}


const getPokemonByID = async (poke_id) => {
    let poke;

    if(isNaN(poke_id)){
        poke = Pokemon.findOne({
            where: {
                id: poke_id
            },
            include: Tipo
        })
    }
    else{
        const pokeDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke_id}`)
        poke = {
            id: pokeDetail.data.id,
            name: pokeDetail.data.name,
            height: pokeDetail.data.height,
            weight: pokeDetail.data.weight,
            frontSprite: pokeDetail.data.sprites.other.dream_world['front_default'],
            types: [],
            from: 'api'
        }
    
        pokeDetail.data.stats.forEach(e => {
            if (e.stat.name === 'hp') {
                poke.life = e['base_stat']
            }
            else if (e.stat.name === 'attack' || e.stat.name === 'defense' || e.stat.name === 'speed') {
                poke[e.stat.name] = e['base_stat']
            }
        });

        pokeDetail.data.types.forEach(e => {
            poke.types.push(e.type.name)
        });
        return poke
    }

    return poke
}



const createPokemon = async (name, height, weight, speed, life, attack, defense, types) => {

    if (!name) throw Error('Debe proporcionar un nombre al pokemon')
    console.log(types);
    const id = uuidv4()
    const poke = {
        id,
        name,
        height,
        weight,
        speed,
        life,
        attack,
        defense
    }

    const createdPoke = await Pokemon.create(poke)
    await createdPoke.setTipos(types)
    const returnedPoke = Pokemon.findOne({
        where: {
            id: id
        },
        include: Tipo
    })
    return returnedPoke
}

module.exports = {
    getPokemon,
    getPokemonByID,
    createPokemon,
}