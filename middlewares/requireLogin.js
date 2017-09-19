module.exports = (req,res,next) => {
  //middleware pour une route: /api/stripe.
  if(!req.user){ //si quelqu un essaye de tricher avec l url;
    return res.status(401).send({error: 'Vous devez etre enregistré'}) //pour sortir le mechant
  }
    next(); //si y a en effet un user..
};
