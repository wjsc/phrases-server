
const getById = (phrasesRef) => (req, res, next)=>{
  res.charSet('utf-8'); 
  phrasesRef.child(req.params.id).once("value")
    .then(response=>response.val())
    .then(obj => obj ? obj : {})
    .then(obj => res.send(obj))
    .catch(err => res.send(err));
}

const get = (phrasesRef) => (req, res, next)=>{
  res.charSet('utf-8');
  phrasesRef.once("value")
    .then(response=>response.val())
    .then(obj => obj ? obj : {})
    .then(obj => res.send(obj))
    .catch(err => res.send(err));  
}

const insert = (phrasesRef) => (req, res, next)=>{
  res.charSet('utf-8');
  phrasesRef.push(req.body)
    .then((response)=>res.send(response))
    .catch(err => res.send(err));
}

const update = (phrasesRef) => (req, res, next)=>{
  res.charSet('utf-8');
  phrasesRef.child(req.params.id).set(req.body)
    .then((response)=>res.send(response))
    .catch(err => res.send(err));
}

const remove = (phrasesRef) => (req, res, next)=>{
  res.charSet('utf-8');
  phrasesRef.child(req.params.id).remove()
    .then((response)=>res.send(response))
    .catch(err => res.send(err));
}

module.exports={
  getById,
  get,
  insert,
  update,
  remove
}