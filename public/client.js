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
    const response = await fetch('/api', options);
    const responseJson = await response.json();
    console.log(responseJson);
    const html = responseJson.toString();
    console.log(html);

    // edit html sent back here
    const reStart1 = /<span class="math display">\$?/g;
    const reStart2 = /<span class="math inline">\$?/g;
    const reEnd = /\$?<\/span>/g;
    let editedhtml = html.replace(reStart1, '<span class="math display">\\(');
    editedhtml = editedhtml.replace(reStart2, '<span class="math inline">\\(');
    editedhtml = editedhtml.replace(reEnd, '\\)</span>');
    console.log(editedhtml);
    displayHTML(editedhtml);
});

function displayHTML(html) {
    let outputText = document.createTextNode(html);

    // Add to DOM after clearing old html
    if (htmlDisplay.innerHTML != '') {
        htmlDisplay.innerHTML = '';
    }
    htmlDisplay.appendChild(outputText);
}