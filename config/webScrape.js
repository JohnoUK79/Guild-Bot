const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://brightdata.com",
        headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    const $ = cheerio.load(axiosResponse.data)
    // retrieving the list of industry cards
    const industryCards = $(".elementor-element-7a85e3a8").find(".e-container")
    // iterating over the list of industry cards
    $(".elementor-element-7a85e3a8")
    .find(".e-container")
    .each((index, element) => {
        // scraping logic...
    })

// initializing the data structure
// that will contain the scraped data
const industries = []

// scraping the "Learn how web data is used in your market" section
$(".elementor-element-7a85e3a8")
    .find(".e-container")
    .each((index, element) => {
        // extracting the data of interest
        const pageUrl = $(element).attr("href")
        const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
        const name = $(element).find(".elementor-image-box-content .elementor-image-box-title").text()

        // filtering out not interesting data
        if (name && pageUrl) {
            // converting the data extracted into a more
            // readable object
            const industry = {
                url: pageUrl,
                image: image,
                name: name
            }

            // adding the object containing the scraped data
            // to the industries array
            industries.push(industry)
        }
    })

    const marketLeaderReasons = []

    // scraping the "What makes Bright Data
    // the undisputed industry leader" section
    $(".elementor-element-ef3e47e")
        .find(".elementor-widget")
        .each((index, element) => {
            const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
            const title = $(element).find(".elementor-image-box-title").text()
            const description = $(element).find(".elementor-image-box-description").text()

            const marketLeaderReason = {
                title: title,
                image: image,
                description: description,
            }

            marketLeaderReasons.push(marketLeaderReason)
        })

        const customerExperienceReasons = []
        // scraping the "The best customer experience in the industry" section
        $(".elementor-element-288b23cd .elementor-text-editor")
            .find("li")
            .each((index, element) => {
                const title = $(element).find("strong").text()
                // since the title is part of the text, you have
                // to remove it to get only the description
                const description = $(element).text().replace(title, "").trim()

                const customerExperienceReason = {
                    title: title,
                    description: description,
                }

                customerExperienceReasons.push(customerExperienceReason)
            })
            
// trasforming the scraped data into a general object
const scrapedData = {
    industries: industries,
    marketLeader: marketLeaderReasons,
    customerExperience: customerExperienceReasons,
}

// converting the scraped data object to JSON
const scrapedDataJSON = JSON.stringify(scrapedData)
console.log(scrapedDataJSON)

}
performScraping()
