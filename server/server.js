import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbmessages.js'
import Pusher from 'pusher'
import cors from 'cors'
import path from 'path'

const port = process.env.PORT || 4000

const app = express();

app.use(cors());

const pusher = new Pusher({
    appId: "1234753",
    key: "45e7faadfee8e6fce5a2",
    secret: "6e759f981873e2206f4d",
    cluster: "ap2",
    useTLS: true
});

const connection_URL = 'mongodb+srv://viking22:12345qwert@cluster0.chb5z.mongodb.net/Whatsappdb?retryWrites=true&w=majority';


mongoose.connect(connection_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`DB is connected!`);

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);


        if (change.operationType == 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timespan: messageDetails.timespan,
                    received: messageDetails.received
                });

        } else {
            console.log("Error triggering Pusher");
        }
    });
});


app.use(express.json());

app.get('/', (req, res) => {
res.send("Hello World");
});

app.get('/messages/show', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
