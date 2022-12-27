require('../src/db/mongoose')
const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('63a9267e8576cdc574f0ef5a', 30).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})