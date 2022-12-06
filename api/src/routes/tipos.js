const { Router } = require('express');
const axios = require('axios')
const router = Router();

const { Tipo } = require('../db.js');

router.get('', async (req, res) => {
    try {
        const count = await Tipo.count()
        console.log(count);
        let finalList = []
        if (count === 0) {
            const result = await axios.get('https://pokeapi.co/api/v2/type')
            const typeList = result.data.results

            finalList = await Promise.all(typeList.map(async (tipo) => {
                const typeDetail = await axios.get(tipo.url)
                const obj = {
                    id: typeDetail.data.id,
                    name: tipo.name
                }
                return obj
            }))

            finalList.forEach(element => {
                Tipo.create(element)
            });
        }
        else {
            const result = await Tipo.findAll()
            finalList = result.map(element => {
                return {
                    id: element.id,
                    name: element.name
                }
            })
        }

        return res.json(finalList)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router