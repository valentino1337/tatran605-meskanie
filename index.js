// import req libraries
const axios = require('axios')
const cheerio = require('cheerio')

const link = "https://meskanievlakov.info/vlak/expres/605/tatran/" //rýchlik z BA do KE (príchod 14:53)
const selector_meskanie = '#banner > div > div > div.col-10.col-12-small > div > div.col-9.col-12-medium > table > tbody > tr:nth-child(3) > td:nth-child(2)' //selector path na text na meskanie
const selector_stanica = '#banner > div > div > div.col-10.col-12-small > div > div.col-9.col-12-medium > table > tbody > tr:nth-child(1) > td:nth-child(2)'

axios.get(link)//fetchuje html data a parsuje ich, extrahuje meskanie. musi to byt v ".then", lebo je to async funkcia.
  .then(response => {
    const htmlContent = response.data; 
    const loaded = cheerio.load(htmlContent)//nacita html content a hodi do variable

    const meskanie = loaded(selector_meskanie).text().trim()
    const stanica = loaded(selector_stanica).text().trim()

    console.log(`Naposledy v stanici ${stanica} meškal ${meskanie}`)
  })

.catch(error => {
  //error je saved v "error" var
})
