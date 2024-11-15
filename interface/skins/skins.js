function createSkinButton(text, className = "interface-ui-skin-btn", imgSrc = null) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.setAttribute('data-name', text);

    if (imgSrc) {
        button.setAttribute('data-img-src', imgSrc);

        const catFrame = document.createElement("div");
        catFrame.classList.add("cat-frame")

        const img = document.createElement("img");
        img.classList.add("catBG")
        
        img.src = chrome.runtime.getURL(imgSrc);
        img.alt = text; // Set an alt attribute for accessibility
        
        button.appendChild(catFrame);
        catFrame.appendChild(img)

    } else {
        button.textContent = text;
    }

    return button;
}

const pink = createSkinButton("pink", "interface-ui-skin-btn", "./assets/pink.png");
const orange = createSkinButton("orange", "interface-ui-skin-btn", "./assets/orange.png");
const gold = createSkinButton("gold", "interface-ui-skin-btn", "./assets/gold.png");
const indigo = createSkinButton("indigo", "interface-ui-skin-btn", "./assets/indigo.png");

const calico_0 = createSkinButton("calico_0", "interface-ui-skin-btn","./assets/calico_0.png");
const red_0 = createSkinButton("red_0", "interface-ui-skin-btn", "./assets/red_0.png")
const grey_1 = createSkinButton("grey_1", "interface-ui-skin-btn", "./assets/grey_1.png")
const black_1 = createSkinButton("black_1", "interface-ui-skin-btn", "./assets/black_1.png")

const skinsList = [
    pink,
    orange,
    gold,
    indigo,
    calico_0,
    red_0,
    grey_1,
    black_1
]

// Function to assign a click event to each button in the skinsList
skinsList.forEach((button) => {
    button.addEventListener("click", () => {
        const catImg = chrome.runtime.getURL(button.getAttribute('data-img-src'));
        const skinText = "--" + button.getAttribute('data-name');
        interfaceContainer.style.backgroundColor = `var(${skinText}-primary)`
        

        if (catImg) {
            characterSprite.style.backgroundImage = `url(${catImg})`;

            chrome.storage.local.set({ 
                selectedSkin: button.getAttribute('data-img-src'),
                primary: "--" + button.getAttribute('data-name') + "-primary",
                secondary: "--" + button.getAttribute('data-name') + "-secondary",
                tertriary: "--" + button.getAttribute('data-name') + "-tertriary"
            }, () => {
                // console.log(`Skin ${button.getAttribute('data-img-src')} saved`);
            });
        } else {
            console.log('No image source available for this button');
        }
    });
});

// Function to load the saved skin when the page loads
window.addEventListener("load", () => {
    chrome.storage.local.get(["selectedSkin", "primary", "secondary", "tertiary"], (result) => {
        
        if (result.selectedSkin) {
            const savedImg = chrome.runtime.getURL(result.selectedSkin);
            characterSprite.style.backgroundImage = `url(${savedImg})`;
            interfaceContainer.style.backgroundColor = `var(${result.primary})`

        } else {
            console.log('No saved skin found');
        }
    });
});