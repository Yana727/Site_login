const express = require('express')
const app = express()

const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
//couldn't get the main, so tried this//
app.get('/', (req, res) => {
  console.log('here?')
  res.render('main')
})
//
const authenticate = (req, res, next) => {
  //app.get('/', (req, res, next)//
  console.log('hello world!!')
  if (req.body.password === 'apple' && req.body.name === 'yana') {
    next()
  } else {
    res.redirect('/')
  }
}

app.use(authenticate)

app.get('/login', (req, res) => {
  console.log('logging')
  res.render('login')
})
app.post('/login', (req, res) => {
  console.log("what's happening???", req.body)

  req.checkBody('name', 'We need your name').notEmpty()
  req.checkBody('password', 'Write your password').notEmpty()
  res.render('login')
})
