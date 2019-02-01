const logHandler = (req,res,bcrypt,database)=>{
	const { email,password } = req.body;
	if (!email || !password){
		return res.status(400).json("formulier onjuist ingevuld");
	}
	database.select('hash','email').from('login')
	.where('email','=',email)
	.then(data =>{
		const isGeldig = bcrypt.compareSync(password, data[0].hash);
		if(isGeldig){
			database.select('*').from('gebruikers')
			.where('email','=',email)
			.then(gebruiker =>{
				res.json(gebruiker[0]);
			})
			.catch(err=> res.status(400).json('kan gebruiker niet ophalen'))
		}else{
			res.status(400).json('Geen gebruiker gevonden')
		}
	})
	.catch(err=>{
		res.status(400).json('geen gebruiker gevonden')
	})
}

module.exports = {
	logHandler
}