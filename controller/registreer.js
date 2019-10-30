const emailCheck = (req,res,database)=>{
	const {email} = req.body;
	if (!email){
		return res.status(400).json(false);
	}
	else{
		database.select('email').from('login').where('email','=',email)
		.then(data =>{
				console.log(data)
		if (!data[0]){
			return res.status(400).json(false);
		}
		else{
			return res.status(400).json(true);
		}
		})
	
	}
}

const regHandler = (req,res,bcrypt,database)=>{
	const { email,naam,password } = req.body;
	if (!naam || !email || !password){
		return res.status(400).json("formulier onjuist ingevuld");
	}
	const hash =bcrypt.hashSync(password);
	database.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('gebruikers')
			.returning('*')
			.insert({
				naam: naam,
				email: loginEmail[0],
				joined: new Date()
			    })
			.then(gebruiker =>{
				res.json(gebruiker[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>{
		res.status(400).json('kan niet registreren')
	})
};

module.exports ={
	regHandler,
	emailCheck
};