document.addEventListener('DOMContentLoaded', () => {
    let select = document.querySelector('.select'),
        selectedValue = document.getElementById('selected-value'),
        optionsViewButton = document.getElementById('options-view-button'),
        inputsOptions = document.querySelectorAll('.option input');

    inputsOptions.forEach(input => {
        input.addEventListener('click', event => {
            selectedValue.textContent = input.dataset.label;

            const isMouseOrTouch = 
                event.pointerType === "mouse" || 
                event.pointerType === "touch" || 
                event.type === "click";

            if (isMouseOrTouch) {
                optionsViewButton.click();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let select = document.querySelector('.select2'),
        selectedValue = document.getElementById('selected-value2'),
        optionsViewButton = document.getElementById('options-view-button2'),
        inputsOptions = document.querySelectorAll('.option2 input');

    inputsOptions.forEach(input => {
        input.addEventListener('click', event => {
            selectedValue.textContent = input.dataset.label;

            const isMouseOrTouch = 
                event.pointerType === "mouse" || 
                event.pointerType === "touch" || 
                event.type === "click";

            if (isMouseOrTouch) {
                optionsViewButton.click();
            }
        });
    });
});