const mongoose = require('mongoose')

let url = '';

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const AddPerson = (name, number) => {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Phonebook({
                name: name,
                number: number
            })

            return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to phoneboook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

const ListPeople = () => {
    mongoose
        .connect(url)
        .then(() => {
            Phonebook.find({})
                .then(result => {
                    console.log("phonebook:");
                    result.forEach(person => {
                        console.log(`${person.name} ${person.number}`)
                    })
                })
            return mongoose.connection.close()
        })
}



if (process.argv.length >= 3) {
    const password = process.argv[2]
    url = `mongodb+srv://amillner:${password}@cluster0.ugr1kgz.mongodb.net/phonebook?retryWrites=true&w=majority`

    if (process.argv.length === 5) {
        const name = process.argv[3]
        const number = process.argv[4]
        AddPerson(name, number);

    } else {
        ListPeople();
    }
}
else {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)

}









