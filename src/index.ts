// const express = require('express')
import express, { Application, Request, Response } from "express"


const apiService: Application = express()
const socketService: Application = express()
const portAPI: Number = 3000
const portSocket: Number = 3001

apiService.get('/', (req: Request, res: Response) => {
    res.send('Hello World! API')
})

socketService.get("/", (req: Request, res: Response) => {
    res.send('Hello World! Socket')
})

apiService.listen(portAPI, () => {
    console.log(`Example app listening at http://localhost:${portAPI}`)
})




socketService.listen(portSocket, () => {
    console.log(`Example app listening at http://localhost:${portSocket}`)
})