import express from "express"
import engine from "ejs-mate"

import homeRoutes from "./routes/home.js"
import parkRoutes from "./routes/park.js"

const app = express()
const port = 3000

//Set Middleware
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

//Set Routes
app.use("/", homeRoutes)
app.use("/parks", parkRoutes)

//Start Server
app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
