import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import dotenv from "dotenv"

const app = express()
const port = 3000

dotenv.config({ path: "./config/.env" })
const config = { headers: { "X-Api-Key": `${process.env.npsKey}` } }

const API_URL = "https://developer.nps.gov/api/v1"
const findByCode = "https://developer.nps.gov/api/v1/parks?parkCode="

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

//Async function to filter only National Parks, Seashores, and Rec Areas
async function getParks() {
	try {
		const response = await axios.get(`${API_URL}/parks?limit=600`, config)
		let result = response.data.data
		const targetParks = [
			"National Park",
			"National Seashore",
			"National Recreation Area",
			"National Park & Preserve",
		]
		return result.filter((park) => targetParks.includes(park.designation))
	} catch (e) {
		console.log("Failed to make request: ", e.message)
	}
}

app.get("/", (req, res) => {
	res.render("index.ejs")
})

//GET complete list of filtered parks
app.get("/parks", async (req, res) => {
	try {
		let filteredResult = await getParks()
		res.render("allparks.ejs", { data: filteredResult })
	} catch (err) {
		console.error("Failed to make request: ", err.message)
		res.render("allparks.ejs", {
			error: err.message,
		})
	}
})

//GET info for individual park by assigned park code
app.get("/park/:id", async (req, res) => {
	const { id } = req.params
	try {
		const response = await axios.get(`${findByCode}${id}`, config)
		const park = response.data.data[0]
		const parkHours = park.operatingHours[0].standardHours
		res.render("park.ejs", { data: park, parkHrs: parkHours })
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
