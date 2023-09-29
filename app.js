// import express from "express"
// import bodyParser from "body-parser"
// import axios from "axios"
// import dotenv from "dotenv"

// const app = express()
// const port = 3000

// dotenv.config({ path: "./config/.env" })

// //API Authorization config
// const config = { headers: { "X-Api-Key": `${process.env.npsKey}` } }
// const API_URL = "https://developer.nps.gov/api/v1"

// //Array of target park designations
// const targetParks = [
// 	"National Park",
// 	"National Park & Preserve",
// 	"National Seashore",
// 	"National Recreation Area",
// ]

// app.use(express.static("public"))
// app.use(bodyParser.urlencoded({ extended: true }))

// //Async function to retrieve all target park designations
// async function getParks() {
// 	try {
// 		const response = await axios.get(`${API_URL}/parks?limit=600`, config)
// 		let result = response.data.data
// 		return result.filter((park) => targetParks.includes(park.designation))
// 	} catch (err) {
// 		console.log("Failed to make request: ", err.message)
// 	}
// }

// //GET index page
// app.get("/", (req, res) => {
// 	res.render("index.ejs")
// })

// app.get("/explore", (req, res) => {
// 	res.render("explore.ejs", { states: stateList })
// })

// //GET complete list of filtered target parks
// app.get("/parks", async (req, res) => {
// 	try {
// 		let parks = await getParks()
// 		// let parks = getParks(callParks)
// 		res.render("allparks.ejs", { data: parks })
// 	} catch (err) {
// 		console.error("Failed to make request: ", err.message)
// 		res.render("allparks.ejs", {
// 			error: err.message,
// 		})
// 	}
// })

// //GET parks by state code, filtered for target parks
// app.get("/parks/state/:id", async (req, res) => {
// 	const { id } = req.params
// 	try {
// 		const response = await axios.get(`${API_URL}/parks?stateCode=${id}`, config)
// 		const result = response.data.data
// 		let filteredResult = result.filter((park) =>
// 			targetParks.includes(park.designation)
// 		)
// 		res.render("allparks.ejs", { data: filteredResult })
// 	} catch (err) {
// 		console.error("Failed to make request:", err.message)
// 		res.render("allparks.ejs", {
// 			error: err.message,
// 		})
// 	}
// })

// //GET info for individual park by assigned park code
// app.get("/park/:id", async (req, res) => {
// 	const { id } = req.params
// 	try {
// 		const response = await axios.get(`${API_URL}/parks?parkCode=${id}`, config)
// 		const park = response.data.data[0]
// 		const parkHours = park.operatingHours[0].standardHours
// 		res.render("park.ejs", { data: park, parkHrs: parkHours })
// 	} catch (err) {
// 		console.error("Failed to make request:", err.message)
// 		res.render("park.ejs", {
// 			error: err.message,
// 		})
// 	}
// })

// app.listen(port, () => {
// 	console.log(`Server running on port: ${port}`)
// })


// const stateList = {
// 	Alabama: "AL",
// 	Alaska: "AK",
// 	Arizona: "AZ",
// 	Arkansas: "AR",
// 	California: "CA",
// 	Colorado: "CO",
// 	Connecticut: "CT",
// 	Delaware: "DE",
// 	Florida: "FL",
// 	Georgia: "GA",
// 	Hawaii: "HI",
// 	Idaho: "ID",
// 	Illinois: "IL",
// 	Indiana: "IN",
// 	Iowa: "IA",
// 	Kansas: "KS",
// 	Kentucky: "KY",
// 	Louisiana: "LA",
// 	Maine: "ME",
// 	Maryland: "MD",
// 	Massachusetts: "MA",
// 	Michigan: "MI",
// 	Minnesota: "MN",
// 	Mississippi: "MS",
// 	Missouri: "MO",
// 	Montana: "MT",
// 	Nebraska: "NE",
// 	Nevada: "NV",
// 	"New Hampshire": "NH",
// 	"New Jersey": "NJ",
// 	"New Mexico": "NM",
// 	"New York": "NY",
// 	"North Carolina": "NC",
// 	"North Dakota": "ND",
// 	Ohio: "OH",
// 	Oklahoma: "OK",
// 	Oregon: "OR",
// 	Pennsylvania: "PA",
// 	"Rhode Island": "RI",
// 	"South Carolina": "SC",
// 	"South Dakota": "SD",
// 	Tennessee: "TN",
// 	Texas: "TX",
// 	Utah: "UT",
// 	Vermont: "VT",
// 	Virginia: "VA",
// 	Washington: "WA",
// 	"West Virginia": "WV",
// 	Wisconsin: "WI",
// 	Wyoming: "WY",
// }