const transInterfaceLayout = document.createElement("div");
transInterfaceLayout.classList.add("translate-interface-layout")

const dropdownContainer = document.createElement("div");
dropdownContainer.classList.add("dropdown-container");

const translateContainer = document.createElement("div")
translateContainer.classList.add("translate-container")

const translateTo = document.createElement('select')
translateTo.classList.add("translateTo-select")
translateTo.innerHTML = `
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="de">German</option>
    <option value="it">Italian</option>
    <option value="pt">Portuguese</option>
    <option value="ru">Russian</option>
    <option value="zh">Chinese</option>
    <option value="ja">Japanese</option>
    <option value="ko">Korean</option>
    <option value="ar">Arabic</option>
    <option value="hi">Hindi</option>
    <option value="bn">Bengali</option>
    <option value="ur">Urdu</option>
    <option value="pa">Punjabi</option>
    <option value="id">Indonesian</option>
    <option value="nl">Dutch</option>
    <option value="sv">Swedish</option>
    <option value="no">Norwegian</option>
    <option value="da">Danish</option>
    <option value="fi">Finnish</option>
    <option value="pl">Polish</option>
    <option value="tr">Turkish</option>
    <option value="th">Thai</option>
    <option value="vi">Vietnamese</option>
    <option value="el">Greek</option>
    <option value="he">Hebrew</option>
    <option value="fa">Persian</option>
    <option value="ro">Romanian</option>
    <option value="cs">Czech</option>
    <option value="hu">Hungarian</option>
    <option value="uk">Ukrainian</option>
    <option value="ms">Malay</option>
    <option value="ta">Tamil</option>
    <option value="te">Telugu</option>
    <option value="mr">Marathi</option>
    <option value="gu">Gujarati</option>
`;

const textInput = document.createElement("textarea")
textInput.classList.add("text-input")
textInput.id = "text-input"
textInput.placeholder = 'Enter text to translate...';

// Create translate output div
const translateOutput = document.createElement('div');
translateOutput.classList.add("translate-output")
translateOutput.id = 'translate-output';

const translateButton = document.createElement('button');
translateButton.classList.add("translate-button")
translateButton.id = 'translate-button';
translateButton.textContent = 'Translate';


translateButton.addEventListener('click', async function() {
    const data = textInput.value;
    try {
        const result = await callGoogleTranslateAPI(data, translateTo.value);
        translateOutput.textContent = `${result}`;
    } catch (error) {
        console.error('Error translating:', error);
    }
})