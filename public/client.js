const convertBtn = document.getElementById('convert-btn');
const inputText = document.getElementById('input-text');
const htmlDisplay = document.querySelector('.html-display');


convertBtn.addEventListener('click', async () => {
    const textToSend = inputText.value;
    const options = {
        method: 'POST',
        body: JSON.stringify({text: `${textToSend}`}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(inputText.value);
    const response = await fetch('/api', options);
    const responseJson = await response.json();
    console.log(responseJson);
    displayHTML(responseJson);
});

function displayHTML(html) {
    let outputText = document.createTextNode(html);

    // Add to DOM after clearing old html
    if (htmlDisplay.innerHTML != '') {
        htmlDisplay.innerHTML = '';
    }
    htmlDisplay.appendChild(outputText);
}