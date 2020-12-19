const { IncomingWebhook } = require('@slack/webhook');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.disable('x-powered-by')

const port = process.env.PORT
const webhookUrl = process.env.WEBHOOK
const webhook = new IncomingWebhook(webhookUrl);

app.get('/', (req, res) => {
    res.send('OK')
})

app.post('/', (req, res) => {
    const response = {}
    if (req.body.challenge) {
        response.challenge = req.body.challenge;
    }
    else if (req.body.event) {
        const event = req.body.event
        switch (event.type) {
            case 'message':
                webhook.send({
                    text: `Parroting message: ${event.text}`
                })
                break;
            default:
                console.log(event.type)
                break;
        }
    }
    else {
        console.log(req.body);
    }
    res.send(response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})