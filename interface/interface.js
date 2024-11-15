// Main container
const interfaceContainer = document.createElement("div");
interfaceContainer.classList.add("interface-container");

const shadowRoot = interfaceContainer.attachShadow({ mode: "open" });

const styleElement = document.createElement("style");

styleElement.textContent = `
    ./* Main interface container */
.interface-container {
  width: 300px; 
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--black_1-primary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: default;
  z-index: 9999;
}

.interface-layout{
  margin: 0px;
  overflow-y: scroll;
  scrollbar-width: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  grid-gap: 10px; /* Space between buttons */
  padding: 40px; /* Adjust padding for spacing */
  cursor: default;
}

.interface-ui-btn {
  background-color: var(--black_1-secondary);
  color: var(--black_1-tertiary);
  cursor: pointer;
  font-weight: 900;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 75px;
}

.back-btn {
  position: absolute;
  color: var(--black_1-tertiary);
  cursor: pointer;
  font-weight: 900;
  border: none;
  border-radius: 2px;
  width: 25px;
  height: 25px;
  margin: 5px;
  justify-content: center;
  z-index: 10;
}


/*aiChat css*/
/* Messages area */
.chatbox-messages {
  flex: 5;
  padding: 10px;
  overflow-y: scroll;
  scrollbar-width: none;
  cursor: default;
}

/* Message styling */
.message_ai {
  padding: 8px;
  margin-bottom: 10px;
  margin-left: 5px;
  background-color: #ffffff;
  border-radius: 4px;
  font-weight: bold;
  width: 60%;
  clear: both;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.message_user {
  padding: 8px;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: #adf3b0;
  border-radius: 4px;
  font-weight: bold;
  float: right;
  width: 60%;
  clear: both;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Input field */
.chatbox-input {
  border: none;
  border-radius: 8px 8px 0 0;
  outline: none;
  flex-grow: 0.5;
  padding: 0px 8px 0px 8px;
  margin: 10px;
  margin-bottom: 0px;
  overflow-y: scroll;
}

/* Send button */
.chatbox-send-btn {
  padding: 10px;
  border: none;
  border-radius: 0 0 8px 8px;
  margin: 10px;
  margin-top: 0px;
  background-color: #5fb0f1;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

/*skin css*/
.interface-ui-skin-btn {
  background-color: var(--black_1-secondary);
  color: var(--black_1-tertiary);
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 75px;
}

.cat-frame {
  background: transparent;
  transform: scale(5);
  width: 16px;
  height: 16px;
  left: 34px;
  background-size: contain;
  position: relative;
  overflow: hidden;
}

.catBG{
  transform: scale(2);
  position: relative;
  bottom: -36px; /*Adjust as needed*/
  right: -94px;
  width: 250px;
  background-size: contain;
  image-rendering: pixelated;
}

/* translate css */
.translate-interface-layout{
    margin: 0px;
    display: grid;
    padding: 20px; /* Adjust padding for spacing */
    cursor: default;
    justify-content: center;
    position: relative;
    height: 100%;
  }

.translate-container {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 285px;
    position: relative;
    top: 20px;
}

.text-input {
    width: 98%;
    height: 90px;
    padding-left: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    resize: none;
    overflow-y: scroll;
    scrollbar-width: none;
}

.translate-output {
    width: 100%;
    height: 90px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    margin-bottom: 10px;
    overflow-y: scroll;
    scrollbar-width: none;
}

.translate-button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
}

.translate-button:hover {
    background-color: #0056b3;
}

.translateTo-select {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.dropdown-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

/* size css*/
.slider-container {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 10px 20px 10px;
    background-color: #ffffff;
    border-radius: 8px;
    bottom: 50px;
    left: -10px;
    position: relative;
    overflow-x: scroll;
    width: 220px;
    scrollbar-width: none;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .slider {
    width: 200px;
    height: 8px;
    background: #d3d3d3;
    border-radius: 5px;
    outline: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px solid #007bff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px solid #007bff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .size-interface-layout{
    margin: 0px;
    scrollbar-width: none;
    border-color: #d32203;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    grid-gap: 10px; /* Space between buttons */
    padding: 40px; /* Adjust padding for spacing */
    cursor: default;
    top: 20px;
  }

   
`;

const interfaceLayout = document.createElement("div");
interfaceLayout.classList.add("interface-layout")
interfaceContainer.appendChild(interfaceLayout)

shadowRoot.appendChild(styleElement);
shadowRoot.addEventListener("mousedown", mouseDown);
shadowRoot.appendChild(interfaceLayout);

const initialTransformValue = characterContainer.style.transform.match(/scale\(([^)]+)\)/);
const initialScaleValue = initialTransformValue ? parseFloat(initialTransformValue[1]) : 8;
const initialBottomValue = parseFloat(characterContainer.style.bottom) || 5;

const slideScaleValue = document.createElement("span");
slideScaleValue.id = "sliderScaleValue";
slideScaleValue.textContent = `Scale: ${initialScaleValue}`;

const slideBottomValue = document.createElement("span");
slideBottomValue.id = "sliderBottomValue";
slideBottomValue.textContent = `Height: ${initialBottomValue}px`;

function createButton(text, className = "interface-ui-btn") {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    return button;
}

const aiChatBtn = createButton("AI Chat");
const idleCatBtn = createButton("Sit/Idle");
const aiTranslationBtn = createButton("AI Translate");
const changeCatSkinBtn = createButton("Skins");
const changeCatSizeBtn = createButton("Size");
const runCatBtn = createButton("Run");
const hideCatBtn = createButton("Hide");
const closeInterfaceBtn = createButton("Close");
const backBtn = createButton("◀️", "back-btn");

const buttonList = [
    aiChatBtn,
    aiTranslationBtn,
    changeCatSkinBtn,
    changeCatSizeBtn,
    runCatBtn,
    hideCatBtn,
    closeInterfaceBtn
];

buttonList.forEach(button => interfaceLayout.appendChild(button));

//closeInterfaceBtn -> removes interface
closeInterfaceBtn.addEventListener('click', function() {
    document.body.removeChild(interfaceContainer);
})

//aiChatBtn button -> chatting area
aiChatBtn.addEventListener('click', function(){
    removeAllChildren(shadowRoot)
    removeAllChildren(chatboxMessages)
    
    shadowRoot.appendChild(chatboxMessages);
    shadowRoot.appendChild(chatboxInput);
    shadowRoot.appendChild(chatboxSendBtn);
    shadowRoot.appendChild(backBtn)
    shadowRoot.appendChild(styleElement);
})

//hide button for the cat
hideCatBtn.addEventListener('click', function() {

    if(characterContainer.contains(characterSprite)) {
        characterContainer.removeChild(characterSprite)
        hideCatBtn.textContent = "Show"

    } else if (!characterContainer.contains(characterSprite)) {
        characterContainer.appendChild(characterSprite)
        hideCatBtn.textContent = "Hide"
        
    }
})

//back button to interface
backBtn.addEventListener('click', function() {
    removeAllChildren(interfaceContainer)
    removeAllChildren(interfaceLayout)
    interfaceContainer.appendChild(shadowRoot)
    shadowRoot.appendChild(interfaceLayout)
    buttonList.forEach(button => interfaceLayout.appendChild(button));
    shadowRoot.appendChild(styleElement);
})

//cat skins
changeCatSkinBtn.addEventListener('click', function() {
    removeAllChildren(interfaceContainer)
    removeAllChildren(interfaceLayout)
    shadowRoot.appendChild(backBtn)
    skinsList.forEach(button => interfaceLayout.appendChild(button));
    shadowRoot.appendChild(styleElement);
})

//cat size 
changeCatSizeBtn.addEventListener('click', function() {
    removeAllChildren(interfaceLayout)
    shadowRoot.appendChild(backBtn)
    shadowRoot.appendChild(sizeInterfaceLayout)
    shadowRoot.appendChild(bottomInterfaceLayout)

    bottomInterfaceLayout.appendChild(slideContainerSize)
    sizeInterfaceLayout.appendChild(slideContainerBottom)
    slideContainerSize.appendChild(slideSizeInput);
    slideContainerSize.appendChild(slideScaleValue);
    slideContainerBottom.appendChild(slideHeightInput);
    slideContainerBottom.appendChild(slideBottomValue);
})

//ai translte 
aiTranslationBtn.addEventListener('click', function() {
    removeAllChildren(shadowRoot)
    shadowRoot.appendChild(backBtn)
    shadowRoot.appendChild(transInterfaceLayout)
    transInterfaceLayout.appendChild(translateContainer)
    translateContainer.appendChild(dropdownContainer)
    dropdownContainer.appendChild(translateTo)
    translateContainer.appendChild(textInput)
    translateContainer.appendChild(translateOutput)
    translateContainer.appendChild(translateButton)
    shadowRoot.appendChild(styleElement);
})

//run
runCatBtn.addEventListener('click', function() {

    characterSprite.classList.remove(walkOrRun_left);
    characterSprite.classList.remove(walkOrRun_right);

    if(walkOrRun_right == "walk_right" && walkOrRun_left == "walk_left") {
        walkOrRun_left = "run_left"
        walkOrRun_right = "run_right"
        runCatBtn.textContent = 'Walk'   
    } else if(walkOrRun_right == "run_right" && walkOrRun_left == "run_left") {
        walkOrRun_left = "walk_left"
        walkOrRun_right = "walk_right"
        runCatBtn.textContent = 'Run' 
    }
})

// Function to remove all child elements from a container
function removeAllChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
