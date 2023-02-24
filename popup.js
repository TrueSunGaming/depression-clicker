function popupText(text = "", x = 0, y = 0) {
    const el = document.createElement("p");
    el.innerHTML = text;
    el.style.position = "absolute";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.zIndex = Number.MAX_SAFE_INTEGER;
    el.style.pointerEvents = "none";
    el.style.fontSize = "25px";
    el.style.transform = "translate(-50%, -100%)";
    el.style.whiteSpace = "nowrap";
    el.style.display = "inline";
    el.style.fontWeight = "600";
    document.body.appendChild(el);
    let yp = 0;
    let interval = setInterval(() => {
        yp++;
        if (100 - yp <= 0) {
            el.remove();
            clearInterval(interval);
        }
        el.style.top = `${y - yp}px`;
        el.style.opacity = `${100 - yp}%`
    }, 50/3);
}