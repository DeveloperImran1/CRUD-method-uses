/**
 * -------------------MODULE SUMMARY ---------------------------
 * MongoDb conection
 * 
 * [note: Jekhon IP dia mongoDB project kaj korar jonno : Project select kore vitore gia Netword Access > add ip address theke default ip ta add korte hobe. Tahole network issure jonno error dei. ai jhamela hobena. https://cloud.mongodb.com/v2/66251e89fd2eec615b05e567#/security/network/accessList ]
 * -------------------------
 * 
 * Create account
 * create an user with password
 * whitelist IP address
 * database > connect > driver > Node > View full code
 * change the pasword the uri ----mane amar username and project password ta URI te bosate hobe.
 * Than try er moddhe main kajgulo korte hobe.
 * 
 * -------------------- CREATE POST
 * 1st node mongodb crud documentation website a jaita hobe https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/ 
 * Than Usase Example > Insert operation > insert a Document theke code dekhe dekhe aikhane kiso modify korte hobe.
 *  Tarpor client side theke data submit korle data base a jasse kina. Ta dekhar jonno: https://cloud.mongodb.com/v2/66248838bd6bae697e0fc5f5#/overview
 * database a kono project selec kore oi project er  Database > Browsecollection > Collections > userDB > user a gele user er information gulo paoa jabe.
 * 
 * ---------- Post server side
 * app.post('/users', async(req, res)=> {code})
 * make the function async to use await inside it
 * make sure you use the express.json() middlewere
 * access data form the body: const user = req.body;
 * const result = await userCollection.insertOne(user)
 * res.send()
 * ---------- Post Client side
 * create fetch
 * add second paramter as an object
 * povide method: "POST"
 * add headers: {'content-type': 'application/json'}
 * add body: JSON.stringify(user)
 * 
 * 
 * 
 * ----------------------------- READ MANY -------------------------------
 * create a cursor = userCollection.find() // find er moddhe fixed kono data dila , sudho oi data guloi get korbe.
 * const result = await cursor.toArray()
 * res.send(result)
 * 
 * 
 * 
 * 
 * ------------------------------- DELETE --------------------------------
 * --------Delete server side
 * create app.delete('/users/:id', async(req, res) => {})
 * specify uniqe objectId to delete the right user
 * const query = { _id: new ObjectId(id) }
 * const result = await userCollection.deleteOne(query);
 * 
 * --------Client side
 * create dynamic url with id
 * mention the delete method
 * 
 * 
 * 
 * 
 * ------------------------------- Update Data -------------------------------
 * 1. Client side a fixed 1 joner mane jei user data update korbe tar data catch kore server side a PUT method er maddhome pathabo. 
 * 2. Server side theke oi data k PUT method dia nita hobe. Tarpor Mongodb te ptahate hobe. MongeDb theke information update hoia server side a asle res.send() er maddhome client side patiha dita hobe.
 * 3. Thaloe client side a data update hoia jabe.
 * 4. Update user er jonno folow this document: https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/
 * 
 * -------- client side
 * dynamicaly kono delete button a click a dynamic route a nia jabo:   <Link to={`/update/${user._id}`}> Update</Link>
 * main.jsx file a  path: `/update/:id`, aikhane id ta dymic hobe. 
 * Tarpor server side theke specic data k ai path a pabo: loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
 * Update component a useLoaderData() dia data case kore kaj korte hobe.
 * 
 * 
 * --------- server side
 * app.get('/users/:id', async(req, res)=> { })
 * req.params.id er maddhome path er last er part mane id ta paoa jabe.
 * Than oi specific id er user k ber kore res.send(result) korte obe.
 * 
 * 
 */





const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json())  // client side k connect korar jonno use kora hoi.

// mongodb te project create korar somoi username and password pabo,, sei gulo .env file a rakbo. But akhon aikhane rakhtesi.
// ih9066588
//uWIlYxDjPu8Csqzm


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://ih9066588:uWIlYxDjPu8Csqzm@cluster0.zbiljp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://ih9066588:RLw5tN9paiJ84KxV@cluster0.2441yga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();   // amar project k mongodb er sathe contect korbe.

        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db("usersDB");  // aikhane usersDB hobe. Karon mongodb te userDB nam diasi.
        const usersCollection = database.collection("users");  // abar userDB er vitore users nam diasi. So aikhanew users dita hobe. aigulo pawa jabe. Jei project create koresi tarvitore  Database > Browsecollection > Collections > userDB > user a gele user and userDB er jaigai onno nam thakbe.


        // mongoDB theke users er data gulo get korbo. But tar age app.post a data send koresi mongoDB te. Tarpor get korbo. : folow this documentation: https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
        app.get("/users", async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // akhon client side k server side er sathe app.use(express.json()) er maddhome connect korbo. Than mongo db te data send korbo.
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log("new user is: ", user)

            // send user of mongoDB
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

        // dynamic vabe user get korbo for user update
        app.get('/users/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const user = await usersCollection.findOne(query);
            res.send(user)
        })

        // user update er main part
        app.put('/users/:id', async(req, res)=> {
            const id = req.params.id;
            const user = req.body;
            console.log(user)
            const filter = {_id: new ObjectId(id)};
            const options = {upsert: true}
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            
            const result = await usersCollection.updateOne(filter, updatedUser, options)
            res.send(result)
        })

        // folow this document for delete: https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;  // aivabe route theke id ta pawa jai.
            console.log("Please delete from database ", id)
            const query = { _id: new ObjectId(id) }   // ObjectId k import korte hobe.
            const result = await usersCollection.deleteOne(query);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
        // try er moddhe kono kaj error dila finaly er moddhe ase client.close() or function ta close kore diba. But amra function ta close korte chassina. so awat client.close() function ta bad dibo.
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("simple crud is running")
})

app.listen(port, () => {
    console.log("Simple crud is running on port", port)
})








// // ----------> try, catch er basic syntax
// try {
//     // main code
// }
// catch {
//     // kono error hole catch er moddhe asbe.
// }
// finally {
//     // aito erro er jonno. But catch or finaly er moddhe jekono akta use korelei hobe.
// }


// // ----------------> async- await use er syntax
// async function run() {
//     // await code
// }
// // or
// const run = async () => {
//     // await code
// }
// run().catch(error => console.log(error))




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ih9066588:RLw5tN9paiJ84KxV@cluster0.2441yga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
