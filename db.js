const Sequelize = require ('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react')

const Member = db.define('member', {
    name:{
        type: Sequelize.STRING,
        unique: true,
        allowsNull: false,
        validate: {
            notEmpty: true
        }
    },
    mobile:{
        type: Sequelize.STRING
    },
    birthday:{
        type: Sequelize.STRING
    }
})

const syncAndSeed = async (req, res) => {
    try{
        await Member.create({name:'Jess Day', mobile: '347-111-1111', birthday: 'Jan 1'})
        await Member.create({name:'Nick Miller', mobile: '347-222-2211', birthday: 'Feb 1'})
        await Member.create({name:'Winston Schmidt', mobile: '347-333-3311', birthday: 'Mar 1'})
        await Member.create({name:'Winston Bishop', mobile: '347-444-4411', birthday: 'Apr 1'})
        await Member.create({name:'Cece Parekh',mobile: '347-555-5511', birthday: 'May 1'})
    }
    catch(ex){
        console.log(ex)
    }
}

module.exports = { db, Member, syncAndSeed }