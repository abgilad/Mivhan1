
const express = require('express');
const app = express();
const db = require('mongoose');
const bp = require('body-parser');

app.use(express.json())
app.use(bp.urlencoded({ extended: false }))

db.connect('mongodb://localhost:27017/Students', console.log('db connected'))

const studentsSchema = new db.Schema({
    id: String,
    avgGrades: Number,
    courseName: String,
    fullname: String
})

const studensList = db.model('studentsList', studentsSchema);

app.get('/', (req, res) => {
    const addToDB = () => {
        // let temp = {
        //     id: "654987321",
        //     avgGrades: 85,
        //     courseName: 'jsldjf kljlk  daf',
        //     fullname: 'Dani'
        // }
        studensList.insertMany(req.body)
        res.send('ok')
    }
    addToDB()
})


app.get('/allStudents', (req, res) => {

    const getAllStudents = async () => {
        const students = await studensList.find()
        console.log(students)
        res.json(students)
    }
    getAllStudents()
})

app.get('/avgStudents', (req, res) => {
    const avgGrades = async () => {
        const avgStudents = await studensList.find({ "avgGrades": { $gt: 75 } });
        res.json(avgStudents)
    }
    avgGrades()
})

app.get('/addNewStudent', (req, res) => {
    console.log(req.body)
    res.send(req.body)
    res.send('ok')
})


app.listen('3000', () => {
    console.log('server connected')
})