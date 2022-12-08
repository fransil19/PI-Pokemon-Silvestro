const axios = require('axios')
const { Tipo } = require('../db.js');

const getTipos = async () => {
    try {
        const count = await Tipo.count()
        let finalList;
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

        return finalList
    } catch (error) {
        throw Error(error.message)
    }

}

module.exports = {
    getTipos
}