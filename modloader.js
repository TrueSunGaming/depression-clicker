function runMods() {
    for (const i of data.mods) eval(i.script);
}

function removeMod(name) {
    data.mods.splice(data.mods.findIndex((v) => v.name == name), 1);
}

function modElement(mod) {
    const el = document.createElement("div");
    const title = document.createElement("h2");
    title.innerHTML = mod.name;
    const remove = document.createElement("button");
    remove.innerHTML = `Remove ${mod.name}`;
    remove.addEventListener("mouseup", () => removeMod(mod.name));
    el.append(title, remove);
    return el;
}