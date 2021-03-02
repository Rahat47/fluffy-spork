const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadinSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

async function getQuotes() {
    showLoadinSpinner()
    const proxyURL = 'https://pure-inlet-02907.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try {
        const response = await fetch(proxyURL + apiUrl)
        const data = await response.json()

        //! IF AUTHOR IS BLANK
        if (data.quoteAuthor === '') {
            authorText.textContent = 'Unknown'
        } else {
            authorText.textContent = data.quoteAuthor
        }
        //!REDUCE FONT SIZE FOR LONG QUOTE
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = data.quoteText

        //Stop loader show the quote
        removeLoadingSpinner()
        // throw new Error('ulala')
    } catch (error) {
        quoteText.textContent = "woops! something went wrong"
        authorText.textContent = "Error-404"
        removeLoadingSpinner()
    }
}

//Tweet Quote Function

function tweetQuote() {
    const quote = quoteText.textContent
    const author = authorText.textContent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)

//onLoad
getQuotes();
