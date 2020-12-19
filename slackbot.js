const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.disable('x-powered-by')
const port = 3000

app.get('/', (req, res) => {
    res.send('OK')
})

app.post('/', (req, res) => {
    const response = {}
    if (req.body.challenge) {
        response.challenge = req.body.challenge;
    }
    else {
        console.log(req.body);
    }
    res.send(response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})