let con = require('./connector')
let data = require('./data')

let a = async (err) => {

    if (err) return console.log("failed to connect to mysql server/ database", err);
    else {
        await new Promise((resolve, reject) => {
            con.query('DROP TABLE IF EXISTS orders', (err) => {
                if (err) reject(err)
                else {
                    resolve(1)
                }
            })
        })
        await new Promise((resolve, reject) => {
            con.query('CREATE TABLE orders(_id varchar(200),title varchar(100),description varchar(1000) )', (err) => {
                if (err) reject(err)
                else resolve(1)
            })
        })
        for (let i = 0; i < data.length; i++)
            await new Promise((resolve, reject) => {
                con.query(`INSERT into orders values("${data[i]._id}","${data[i].title}","${data[i].description}")`, (err) => {
                    if (err) reject(err)
                    else { resolve(1) }
                })
            })
    }
    let [error, result] = await new Promise((resolve, reject) => {
        con.query('SELECT * FROM orders', (err, rows) => {
            if (err) reject([err, undefined])
            else resolve([undefined, rows])
        })
    })
    if (error) { console.log(error) }
    else {
        console.log(`✅ Database seeded successfully! Total records: ${result.length}`)
        process.exit(0)
    }
}
a()