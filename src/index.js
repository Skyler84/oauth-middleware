import Express from 'express'
import * as cors from 'cors'


const HOST=process.env.HOST || "0.0.0.0"
const PORT=process.env.PORT || 8000

let app = Express()
app.use(cors())

let authorizations = {};

app.get('/authorized', (req, res) => {
    let code = req.query['code'];
    let state = req.query['state'];
    authorizations[state] = code;
    res.sendStatus(200);
})

app.get('/authorization', (req, res) => {
    let state = req.query['state'];
    if (!state in authorizations){
        res.sendStatus(404);
        return;
    }
    res.send({code: authorizations[state]});
    authorizations.delete(state);
})

app.listen(PORT, HOST, ()=>{console.log(`Listening on ${HOST}:${PORT}`)})