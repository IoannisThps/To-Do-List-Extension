const myBtn = document.getElementById("myBtn");
const place = document.getElementById("place");

window.addEventListener("load", () => {
    const savedInputs = JSON.parse(localStorage.getItem("inputs")) || [];
    savedInputs.forEach(obj => addInput(obj.text, obj.checked));
});

myBtn.addEventListener("click", () => {
    addInput("");
    saveInputs();
});

function addInput(value, checked = false) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.placeholder = "Add something...";
    input.style.borderRadius = "15px";
    input.style.border = "1px solid";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginLeft = "10px";
    checkbox.checked = checked;

    const img = document.createElement("img");
    img.src = "bin.png";
    img.alt = "Delete";
    img.style.marginLeft = "10px";
    img.style.width = "30px";
    img.style.cursor = "pointer";

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.marginTop = "10px";

    wrapper.appendChild(checkbox);
    wrapper.appendChild(input);
    wrapper.appendChild(img);
    place.appendChild(wrapper);

    input.addEventListener("input", saveInputs);
    checkbox.addEventListener("change", saveInputs);

    img.addEventListener("click", () => {
        wrapper.remove();
        saveInputs();
    });
}


function saveInputs() {
    const allWrappers = place.querySelectorAll("div");
    const values = Array.from(allWrappers).map(wrapper => {
        const input = wrapper.querySelector("input[type='text']");
        const checkbox = wrapper.querySelector("input[type='checkbox']");
        return {
            text: input.value,
            checked: checkbox.checked
        };
    });
    localStorage.setItem("inputs", JSON.stringify(values));
}

