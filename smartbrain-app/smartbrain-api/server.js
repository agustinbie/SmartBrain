//agregar el script "start": "nodemon server.js", al package json
//"type": "module", agregar esto para tambien para usar express
import express from "express";
const app = express();
import bcrypt from "bcrypt-nodejs"
import cors from "cors";



app.use(express.urlencoded());  //para poder manipular las request 
app.use(express.json());
app.use(cors());  //para que se pueda comunicar con el frontend en chrome



const database = {      //por mas que agregue usuarios, cada vez que guarde los cambios del archivo server.js, nodemon reinicia el server y vuelve a leer el codigo, volviendo la database a solo 2 usuarios
	users: [{
		id:"123",
		name: "John",
		email: "john@gmail.com",
		password: "cookies",
		entries: 0,  //registro de cuántas imagenes introdujo
		joined: new Date()   //registro de fecha de sign up
	},
	{
	 	id:"1234",
		name: "Sally",
		email: "sally@gmail.com",
		password: "bananas",
		entries: 0, 
		joined: new Date()   

	}]
}


app.get("/", (req, res) => {
	res.send(database.users)
})


app.post("/signin", (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json(database.users[0])
	} else {
		res.status(400).json("error logging in")  //.json() es lo mismo que send()
	}
})

app.post("/register", (req, res) => {
	const {email,name,password} = req.body
	database.users.push({
			id:"125",
			name: name,
			email: email,
			password: password,
			entries: 0, 
			joined: new Date()   
	})
	res.json(database.users[database.users.length-1]); //para responder con el ultimo usuario creado, que va a ser el que mandaron como register
});


app.get("/profile/:id", (req, res) =>{
	const { id} = req.params;
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return	res.json(user)
		} 
	})
	if (!found) {
		res.status(400).json("not found")
	}

})


app.put("/image", (req, res) =>{
	const { id} = req.body;
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return	res.json(user.entries)   //para chequear como va cambiando el database mandar en postaman PUTs a 3000/image con un body "id": "123" y despues ir al home "/" para que loguee los usuarios
		} 
	})
	if (!found) {
		res.status(400).json("not found")
	}

})




//BCRYPT-NODEJS
// bcrypt.hash("bacon", null, null, function(err, hash) {
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });









app.listen(3001, () => {
	console.log("app is running on port 3001")
})

/*DISEÑO DE LA API (ENDPOINTS)
/ --> res =this is working
/signin --> post = success/fail  por mas que no quieras crear un usuario en el signin, es mas seguro usar POST para los datos sensibles como las contraseñas para que vayan dentro del body y no en la url string
/register --> post = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/

