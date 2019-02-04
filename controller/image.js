const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '50fc9203391d4b358c881e5513551955'
});

 const apiHandler = (req,res) => {
 	app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then (response =>{ res.json(response)})
    .catch(err => { res.status(400).json('error')})
}

const imgHandler = (req,res,database)=>{
	const {id} = req.body;
	database('gebruikers')
	.where({id})
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err =>{res.status(400).res.json('aantal entries niet gevonden')})
}

module.exports  = {
	imgHandler,
	apiHandler

}