const quote_container = document.querySelector("#theQuote");
const writer_container = document.querySelector("#writer");
const new_quote = document.querySelector("#New_Quote");
const twiter= document.querySelector("#twiter");
function updateTwitterLink(quote, author) {
    const tweetText = `${quote} — ${author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    twitter.setAttribute("href", twitterUrl);
}
async function get_quotes() {
    const url = "https://api.api-ninjas.com/v1/quotes"
    const apiKey = "EDil9XZooJT/vJnYSrAZCQ==b5Ou8EyIngB6Zc08"; 
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); 
        
        if (!data || data.length === 0) {
            throw new Error('No quotes received');
        }

        console.log(data);
        return data;
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}
async function fill_the_qoutes(quote_container,writer_container) {
    const qoutes = await get_quotes();
    console.log(qoutes[0].quote)
    quote_container.textContent = qoutes[0].quote;
    writer_container.textContent = qoutes[0].author;
}
fill_the_qoutes(quote_container,writer_container);

new_quote.addEventListener("click", (event)=>{
    event.preventDefault();
    fill_the_qoutes(quote_container,writer_container);
    updateTwitterLink(quote_container.textContent,writer_container.textContent);
});