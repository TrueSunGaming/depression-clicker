function debug() {
    const multiply = document.createElement("button");
    multiply.innerHTML = "10x Depression";
    multiply.addEventListener("mouseup", () => addDepression(data.depression * 9));
    el("depressionContainer").appendChild(multiply);
}