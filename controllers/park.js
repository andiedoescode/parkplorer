const axios = require("axios")
require("dotenv").config({ path: "./config/.env" })

//API Authorization config
const config = { headers: { "X-Api-Key": `${process.env.npsKey}` } }
const API_URL = "https://developer.nps.gov/api/v1"

module.exports = {
	//GET complete list of filtered target parks
	getAllParks: async (req, res) => {
		try {
			const parks = await getParks()
			res.render("allparks.ejs", { data: parks })
		} catch (err) {
			console.error("Failed to make request: ", err.message)
			res.render("allparks.ejs", {
				error: err.message,
			})
		}
	},
	//GET parks by state code, filtered for target parks
	getByState: async (req, res) => {
		const { id } = req.params
		try {
			const response = await axios.get(
				`${API_URL}/parks?stateCode=${id}`,
				config
			)
			const result = response.data.data
			let filteredResult = result.filter((park) =>
				targetParks.includes(park.designation)
			)
			res.render("allparks.ejs", { data: filteredResult })
		} catch (err) {
			console.error("Failed to make request:", err.message)
			res.render("allparks.ejs", {
				error: err.message,
			})
		}
	},
	//GET info for individual park by assigned park code
	getPark: async (req, res) => {
		const { id } = req.params
		try {
			const response = await axios.get(
				`${API_URL}/parks?parkCode=${id}`,
				config
			)
			const park = response.data.data[0]
			const parkHours = park.operatingHours[0].standardHours
			res.render("park.ejs", { data: park, parkHrs: parkHours })
		} catch (err) {
			console.error("Failed to make request:", err.message)
			res.render("park.ejs", {
				error: err.message,
			})
		}
	},
}

/* **************************************************************************************************** */
/* **************************************************************************************************** */
/* **************************************************************************************************** */

//Async function to retrieve all target park designations
async function getParks() {
	try {
		const response = await axios.get(`${API_URL}/parks?limit=600`, config)
		let result = response.data.data
		return result.filter((park) => targetParks.includes(park.designation))
	} catch (err) {
		console.log("Failed to make request: ", err.message)
	}
}

//Array of target park designations
const targetParks = [
	"National Park",
	"National Park & Preserve",
	"National Seashore",
	"National Recreation Area",
]
