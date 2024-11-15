const sizeInterfaceLayout = document.createElement("div");
sizeInterfaceLayout.classList.add("size-interface-layout");

const bottomInterfaceLayout = document.createElement("div");
bottomInterfaceLayout.classList.add("size-interface-layout")

const slideContainerSize = document.createElement("div");
slideContainerSize.classList.add("slider-container");

const slideContainerBottom = document.createElement("div");
slideContainerBottom.classList.add("slider-container")

slideScaleValue.style.color = "black";
slideScaleValue.style.fontSize = "16px";
slideScaleValue.style.display = "inline-block";

slideBottomValue.style.color = "black";
slideBottomValue.style.fontSize = "16px";
slideBottomValue.style.display = "inline-block";

const slideSizeInput = Object.assign(document.createElement("input"), {
    type: "range",
    min: "3",
    max: "50",
    value: initialScaleValue,
    className: "slider"
});
slideSizeInput.id = "rangeSizeSlider";

const slideHeightInput = Object.assign(document.createElement("input"), {
    type: "range",
    min: "-10",
    max: "200",
    value: initialBottomValue,
    className: "slider"
});
slideHeightInput.id = "rangeHeightSlider";

slideSizeInput.addEventListener('input', function() {
    const scaleValue = parseFloat(this.value);

    characterContainer.style.transform = `scale(${scaleValue})`;

    const scaleValueElement = shadowRoot.getElementById('sliderScaleValue');
    if (scaleValueElement) {
        scaleValueElement.textContent = `Scale: ${scaleValue}`;
    }

    // Save scale value to chrome.storage
    chrome.storage.local.set({ scaleValue }, () => {
        //debugging
        // console.log(`Scale value ${scaleValue} saved`);
    });
});

slideHeightInput.addEventListener('input', function() {
    const bottomValue = parseFloat(this.value);

    characterContainer.style.bottom = `${bottomValue}px`;

    const bottomValueElement = shadowRoot.getElementById('sliderBottomValue');
    if (bottomValueElement) {
        bottomValueElement.textContent = `Bottom: ${bottomValue}px`;
    }

    // Save bottom value to chrome.storage
    chrome.storage.local.set({ bottomValue }, () => {
        //debugging
        // console.log(`Bottom value ${bottomValue} saved`);
    });
});




// Load saved values on page load
window.addEventListener("load", () => {
    chrome.storage.local.get(["scaleValue", "bottomValue"], (result) => {

        let scaleValue = result.scaleValue !== undefined ? result.scaleValue : 8; // Default to 8 if not found
        let bottomValue = result.bottomValue !== undefined ? result.bottomValue : 5; // Default to 5 if not found

        // Apply both styles together
        characterContainer.style.transform = `scale(${scaleValue})`;
        characterContainer.style.bottom = `${bottomValue}px`;

        // Update slider inputs and display text
        slideSizeInput.value = scaleValue;
        slideHeightInput.value = bottomValue;
        document.getElementById('sliderScaleValue').textContent = `Scale: ${scaleValue}`;
        document.getElementById('sliderBottomValue').textContent = `Bottom: ${bottomValue}px`;
        
    });
});