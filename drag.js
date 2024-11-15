// Function to check if the click is on the edge of the container
function isOnEdge(e, element, edgeDistance = 40) {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    // Get the computed margin values
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginRight = parseFloat(computedStyle.marginRight);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    const marginLeft = parseFloat(computedStyle.marginLeft);
    
    // Expand the edge distance by the margin sizes
    const withinLeftEdge = e.clientX >= rect.left - marginLeft && e.clientX <= rect.left + edgeDistance;
    const withinRightEdge = e.clientX <= rect.right + marginRight && e.clientX >= rect.right - edgeDistance;
    const withinTopEdge = e.clientY >= rect.top - marginTop && e.clientY <= rect.top + edgeDistance;
    const withinBottomEdge = e.clientY <= rect.bottom + marginBottom && e.clientY >= rect.bottom - edgeDistance;

    return withinLeftEdge || withinRightEdge || withinTopEdge || withinBottomEdge;
}

// Function to start dragging on mousedown if clicking on the edge
function mouseDown(e) {

    if (isOnEdge(e, interfaceContainer) || isOnEdge(e, transInterfaceLayout) || isOnEdge(e, interfaceLayout)) {
        e.preventDefault(); // Prevent default behavior for a smoother drag

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }
}

function mouseMove(e) {
    const newX = startX - e.clientX;
    const newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    // Get the current position and dimensions of the container
    const containerRect = interfaceContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the new position
    let newTop = interfaceContainer.offsetTop - newY;
    let newLeft = interfaceContainer.offsetLeft - newX;

    // Apply boundary constraints to prevent overscrolling
    if (newTop < 0) newTop = 0; // Prevent moving above the viewport
    if (newLeft < 0) newLeft = 0; // Prevent moving left off the viewport
    if (newTop + containerHeight > viewportHeight) newTop = viewportHeight - containerHeight; // Prevent moving below viewport
    if (newLeft + containerWidth > viewportWidth) newLeft = viewportWidth - containerWidth; // Prevent moving right off the viewport

    // Update the position of the main container
    interfaceContainer.style.top = `${newTop}px`;
    interfaceContainer.style.left = `${newLeft}px`;
}


function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}

