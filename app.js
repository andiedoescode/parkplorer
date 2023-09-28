import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import dotenv from "dotenv"

const app = express()
const port = 3000

dotenv.config({ path: "./config/.env" })
const config = { headers: { "X-Api-Key": `${process.env.npsKey}` } }

const API_URL = "https://developer.nps.gov/api/v1"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	res.render("index.ejs")
})

app.get("/park", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/parks?parkCode=acad`, config)
		const result = response.data.data[0]
		res.render("park.ejs", { data: result })
	} catch (err) {
		console.error("Failed to make request:", err.message)
		res.render("park.ejs", {
			error: err.message,
		})
	}
})

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
