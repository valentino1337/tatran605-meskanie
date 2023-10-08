// import req libraries
import axios from 'axios'
import cheerio from 'cheerio'

const link = "https://meskanievlakov.info/vlak/expres/605/tatran/" //rýchlik z BA do KE (príchod 14:53)
const selector_meskanie = '#banner > div > div > div.col-10.col-12-small > div > div.col-9.col-12-medium > table > tbody > tr:nth-child(3) > td:nth-child(2)' //selector path na text na meskanie
const selector_stanica = '#banner > div > div > div.col-10.col-12-small > div > div.col-9.col-12-medium > table > tbody > tr:nth-child(1) > td:nth-child(2)'
const selector_update = '#banner > div > div > div.col-10.col-12-small > div > div.col-9.col-12-medium > p:nth-child(3) > i' //posledna aktualizacia udajov

axios.get(link, {timeout:5000})//fetchuje html data a parsuje ich. vsetko musi byt v ".then", lebo je to async funkcia. whatever.
  .then(response => {
    const htmlContent = response.data; 
    const loaded = cheerio.load(htmlContent)

    const meskanie = loaded(selector_meskanie).text().trim()
    const stanica = loaded(selector_stanica).text().trim()
    const update = loaded(selector_update).text().replace(/\s+/g, ' ').trim()// musel  tam byt regex, aby sa to troska ocistilo od whitespace.

    // console.log(`Naposledy v stanici ${stanica} meškal ${meskanie}`)

    fetch('https://ntfy.fajnyweb.digital/vlakos-test', {
        method: 'POST', // PUT works too
        body: `Vlak Ex 605 Tatran naposledy meškal v stanici ${stanica} ${meskanie} Posledná aktualizácia údajov: ${update}`
    })
})

.catch(error => {
    //console.log(error)
    fetch('https://ntfy.fajnyweb.digital/vlakos-test', {
        method: 'POST', // PUT works too
        body: `${error}`
    })
}) //krajny pripad. snad to nebude potrebne.