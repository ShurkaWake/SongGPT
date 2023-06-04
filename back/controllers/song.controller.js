var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const { Configuration, OpenAIApi } = require("openai");

exports.addSong = async (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT Token"
            })

        return
    }

    if (req.body.theme === undefined || req.body.songLength == undefined) {
        res.status(400)
            .send({
                message: "Fields `theme` and `songLength` must be specified"
            })

        return
    }

    if (typeof req.body.theme != "string" || typeof req.body.songLength != "number") {
        res.status(400)
            .send({
                message: "Use correct data types (`number` for `songLength`, `string` for `theme`)"
            })

        return
    }

    if (req.body.songLength < 50 || req.body.songLength > 2048) {
        res.status(400)
            .send({
                message: "`songLength should be beetween 50 and 2048`"
            })

        return
    }

    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: "Create a song lyrics about: " + req.body.theme,
                }
            ],
            max_tokens: req.body.songLength,
        });

        const song = {
            theme: req.body.theme,
            text: completion.data.choices[0].message.content,
        }

        User.findById(req.user._id)
            .exec()
            .then((user) => {
                user.songs.push(song)
                user.save();
                res.status(201)
                    .send({ message: "Song was added" })
            })
            .catch((err) => {
                res.status(500)
                    .send({
                        message: err.message
                    })
                return;
            })
    } catch (error) {
        console.log(error)
        if (error.response) {
            res.status(error.response.status)
                .send(error.response.data)
            return;
        } else {
            res.status(400)
                .send(error);
            return;
        }
    }
}

exports.getSongs = async (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT Token"
            })

        return
    }

    User.findById(req.user._id)
        .exec()
        .then((user) => {
            res.status(200)
                .send(user.songs)
            return
        })
        .catch((err) => {
            res.status(400)
                .send({
                    message: "Something went wrong"
                })
            return
        })
}

exports.deleteSong = async (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT Token"
            })

        return
    }

    const id = req.params.id;
    let song

    User.findById(req.user._id)
        .exec()
        .then((user) => {
            user.songs.find((value, index) => {
                if (value._id == id) {
                    song = value
                    user.songs.splice(index, 1)
                    user.save()
                    res.status(200)
                        .send({
                            message: "Song succesfully deleted",
                            instance: JSON.stringify(song)
                        })
                    return true
                }
            })
            if (song === undefined){
                throw new Error("Not Found")
            }
        })
        .catch((err) => {
            res.status(400)
                .send({
                    message: "Song with specified id not found"
                })
        })
}

exports.updateSong = async (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT Token"
            })

        return
    }

    if (!req.body.text){
        res.status(400)
            .send({
                message: "You need to specify `text`"
            })

        return
    }

    const id = req.params.id;
    let song

    User.findById(req.user._id)
        .exec()
        .then((user) => {
            user.songs.find((value, index) => {
                console.log(value._id)
                if (value._id == id) {
                    console.log(1)
                    song = value
                    song.text = req.body.text
                    user.save()
                    res.status(200)
                        .send({
                            message: "Song succesfully updated",
                            instance: song
                        })
                    return true
                }
            })  
            if (song === undefined){
                throw new Error("Not Found")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400)
                .send({
                    message: "Song with specified id not found"
                })
        })
}

exports.getSong = async (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT Token"
            })

        return
    }

    const id = req.params.id;
    let song

    User.findById(req.user._id)
        .exec()
        .then((user) => {
            user.songs.find((value, index) => {
                if (value._id == id) {
                    song = value
                    res.status(200)
                        .send(song)
                    return true
                }
            })

            if (song === undefined){
                throw new Error("Not Found")
            }
        })
        .catch((err) => {
            res.status(400)
                .send({
                    message: "Song with specified id not found"
                })
        })
}
