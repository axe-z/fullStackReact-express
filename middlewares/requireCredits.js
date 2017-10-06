module.exports = (req,res,next) => {
  //middleware pour une route: /api/stripe.
  if(req.user.credits < 1){ //si quelqu un essaye de tricher avec l url;
    return res.status(401).send({error: 'Vous devez avoir assez de credits, veyez faire le plein' }) //pour sortir le mechant
    console.log('Vous devez avoir assez de credits, veyez faire le plein' )
  }
    next(); //si y a en effet un user..
};
