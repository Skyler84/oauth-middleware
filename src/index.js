import Express from 'express'

const HOST="0.0.0.0"
const PORT=8000

let app = Express()

let authorizations = {};

app.get('/authorized', (req, res) => {
    let code = req.query['code'];
    let state = req.query['state'];
    authorizations[state] = code;
})

app.get('/authorization', (req, res) => {
    let state = req.query['state'];
    if (!state in authorizations){
        res.status(404);
        return;
    }
    res.send({code: authorizations[state]});
    authorizations.remove(state);
})

app.listen(PORT, HOST, ()=>{console.log(`Listening on ${HOST}:${PORT}`)})