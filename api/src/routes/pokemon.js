const { Router } = require('express');
const axios = require('axios')
const router = Router();
const { Pokemon } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const { name } = req.query
        const count = await Pokemon.count()
        if (count === 0) {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            const pokeList = result.data.results

            const finalList = await Promise.all(pokeList.map(async (poke) => {
                const pokeDetail = await axios.get(poke.url)
                const obj = {
                    id: pokeDetail.data.id,
                    name: pokeDetail.data.name,
                    height: pokeDetail.data.height,
                    weight: pokeDetail.data.weight,
                    backSprite: pokeDetail.data.sprites['back_default'],
                    frontSprite: pokeDetail.data.sprites['front_default']
                }
                pokeDetail.data.stats.forEach(e => {
                    if (e.stat.name === 'hp') {
                        obj.life = e['base_stat']
                    }
                    else if (e.stat.name === 'attack' || e.stat.name === 'defense' || e.stat.name === 'speed') {
                        obj[e.stat.name] = e['base_stat']
                    }
                });
                await Pokemon.create(obj)
                return obj
            }))

            if (name) return res.json(finalList.filter(poke => poke.name.includes(name)))
            return res.json(finalList)
        }
        else {
            const finalList = Pokemon.findAll()
            if (name) return res.json(finalList.filter(poke => poke.name.includes(name)))
            return res.json(finalList)
        }


    } catch (error) {
        return res.json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pokeDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        const poke = {
            id: pokeDetail.data.id,
            name: pokeDetail.data.name,
            height: pokeDetail.data.height,
            weigth: pokeDetail.data.weigth,
            backSprite: pokeDetail.data.sprites['back_default'],
            frontSprite: pokeDetail.data.sprites['front_default']
        }

        pokeDetail.data.stats.forEach(e => {
            if (e.stat.name === 'hp') {
                poke.life = e['base_stat']
            }
            else if (e.stat.name === 'attack' || e.stat.name === 'defense' || e.stat.name === 'speed') {
                poke[e.stat.name] = e['base_stat']
            }
        });

        res.json(poke)
    } catch (error) {
        return res.json({ message: error.message })
    }
})

router.post('/:id', async (req, res) => {
    try {
        const { name, height, weigth, speed, life, attack, defense } = req.body

        if(!name) return res.json({ message: error.message })

        const poke = {
            name,
            height,
            weigth,
            backSprite: null,
            frontSprite: null,
            speed,
            life,
            attack,
            defense
        }

        pokeDetail.data.stats.forEach(e => {
            if (e.stat.name === 'hp') {
                poke.life = e['base_stat']
            }
            else if (e.stat.name === 'attack' || e.stat.name === 'defense' || e.stat.name === 'speed') {
                poke[e.stat.name] = e['base_stat']
            }
        });

        res.json(poke)
    } catch (error) {
        return res.json({ message: error.message })
    }
})

module.exports = router