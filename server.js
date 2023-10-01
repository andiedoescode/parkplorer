const express = require("express")
const bodyParser = require("body-parser")
const engine = require("ejs-mate")
const homeRoutes = require("./routes/home.js")
const parkRoutes = require("./routes/park.js")
require("dotenv").config({ path: "./config/.env" })
// dotenv.config({ path: "./config/.env" })

const app = express()
const port = 3000

//Set Middleware
app.engine('ejs', engine)
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

//Set Routes
app.use("/", homeRoutes)
app.use("/parks", parkRoutes)

//Start Server
app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
