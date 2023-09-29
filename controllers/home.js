const axios = require("axios")
require("dotenv").config({ path: "./config/.env" })

//API Authorization config
const config = { headers: { "X-Api-Key": `${process.env.npsKey}` } }
const API_URL = "https://developer.nps.gov/api/v1"

let filteredResult = []
let select = ""

module.exports = {
	//GET index page of app
	getIndex: (req, res) => {
		res.render("index.ejs")
	},
	//GET explore (by state) page
	getExplore: (req, res) => {
		res.render("explore.ejs", {
			states: stateList,
			data: filteredResult,
		})
	},
	//POST retrieve parks of user selected state
	findByState: async (req, res) => {
		const state = req.body.stateName

		try {
			const response = await axios.get(
				`${API_URL}/parks?stateCode=${state}`,
				config
			)
			const result = response.data.data
			filteredResult = result.filter((park) =>
				targetParks.includes(park.designation)
			)
			res.redirect("/explore")
		} catch (err) {
			console.error("Failed to make request:", err.message)
			res.redirect("/explore", {
				error: err.message,
			})
		}
	},
}

/* **************************************************************************************************** */
/* **************************************************************************************************** */
/* **************************************************************************************************** */

const stateList = {
	Alabama: "AL",
	Alaska: "AK",
	Arizona: "AZ",
	Arkansas: "AR",
	California: "CA",
	Colorado: "CO",
	Connecticut: "CT",
	Delaware: "DE",
	Florida: "FL",
	Georgia: "GA",
	Hawaii: "HI",
	Idaho: "ID",
	Illinois: "IL",
	Indiana: "IN",
	Iowa: "IA",
	Kansas: "KS",
	Kentucky: "KY",
	Louisiana: "LA",
	Maine: "ME",
	Maryland: "MD",
	Massachusetts: "MA",
	Michigan: "MI",
	Minnesota: "MN",
	Mississippi: "MS",
	Missouri: "MO",
	Montana: "MT",
	Nebraska: "NE",
	Nevada: "NV",
	"New Hampshire": "NH",
	"New Jersey": "NJ",
	"New Mexico": "NM",
	"New York": "NY",
	"North Carolina": "NC",
	"North Dakota": "ND",
	Ohio: "OH",
	Oklahoma: "OK",
	Oregon: "OR",
	Pennsylvania: "PA",
	"Rhode Island": "RI",
	"South Carolina": "SC",
	"South Dakota": "SD",
	Tennessee: "TN",
	Texas: "TX",
	Utah: "UT",
	Vermont: "VT",
	Virginia: "VA",
	Washington: "WA",
	"West Virginia": "WV",
	Wisconsin: "WI",
	Wyoming: "WY",
}

//Array of target park designations
const targetParks = [
	"National Park",
	"National Park & Preserve",
	"National Seashore",
	"National Recreation Area",
]
