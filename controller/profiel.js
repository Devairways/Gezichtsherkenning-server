const profielHandler = (req,res,database)=> {
	const {id} = req.params;
	database.select('*').from('gebruikers')
	.where({id})
	.then(gebruiker=>{
		if(gebruiker.length){
			res.json(gebruiker)
		}else{
			res.status(400).json('niet gevonden');
		}
	})
	.catch(err =>{ res.status(400).json('Foutje moet kunnen')})	
}

module.exports = {
	profielHandler
}