// const express = require('express')
import express, { Application, Request, Response } from "express"
import cors from 'cors';
import * as socketio from 'socket.io';
const apiService: Application = express()
const server = require('http').Server(apiService);
apiService.use(cors())
const io: socketio.Server = new socketio.Server({
    cors: {
        origin: '*',
    }
});
io.attach(server);
const port: Number = 3333


// mongoDB
import dbConfig from "./config/db.config"
import db from "./models"
import { Model } from "mongoose";

interface online_state {
    state: string;
    color: string;
    label: string;
}

interface UserInterfact {
    username: string,
    email: string,
    password: string,
    img_avatar: string,
    roles: String[]
    online_state: online_state

}

const Role: Model<any> = db.role
const User: Model<UserInterfact> = db.user



db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}`, {

        // useNewUrlParser: true,
        // useUnifiedTopology: true

        user: dbConfig.username,
        pass: dbConfig.password,

    })
    .then(async () => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {

    Role.estimatedDocumentCount((err: any, count: number) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save((err: any) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save((err: any) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save((err: any) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

apiService.get('/', async (_: Request, res: Response) => {


    var user = await User.find()
    .populate("roles")
    res.send(user)
});

io.on('connection', (socket: socketio.Socket) => {
    console.log('connection', socket.id);

    socket.emit('welcome', { message: "Hello from socket io", socket_id: socket.id });

    socket.on("ping", (data) => {
        console.log("ping");
        socket.emit("pong", "pong")
    })



    socket.on('disconnect', () => {
        console.log('client disconnected', socket.id);
    })
});



server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

