const { db, Member, syncAndSeed } = require('./db')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/members', async (req, res, next) => {
    try{
        const members = await Member.findAll({
            attributes: ['id', 'name', 'mobile', 'birthday']
        })
  
        res.send(members)
    }
    catch(ex){
        next(ex)
    }
})

app.get('/members/:memberId', async (req, res, next) => {
    try{
        const member = await Member.findByPk(req.params.memberId)
        res.send(member)
    }
    catch(ex){
        next(ex)
    }
})

const init = async (req, res, next) => {
    try{
        await db.sync( {force : true} ) 
        syncAndSeed()
        console.log('Database connected and seeded')
        app.listen(PORT, () => console.log('Listening on Port ', PORT))
    }
    catch(ex){
        next(ex)
    }
}
init()

