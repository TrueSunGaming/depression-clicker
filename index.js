setInterval(() => {
    try {
        const dps = getDps();
        el("depressionCounter").innerHTML = `${formatNumber(Math.floor(data.depression))} Depression`;
        el("depressionStat").innerHTML = `${formatNumber(Math.floor(data.depression))} Depression (current)`;
        el("depressionEverStat").innerHTML = `${formatNumber(Math.floor(data.depressionEver))} Depression (lifetime)`;
        el("dpsStat").innerHTML = `${formatNumber(dps)} depression per second`;
        el("dpcStat").innerHTML = `${formatNumber(getDpc())} depression per click`;
        el("globalMultiplierStat").innerHTML = `+${formatNumber((getGlobalMultiplier() - 1) * 100)}% global mutliplier`;
        el("depressionSpentStat").innerHTML = `${formatNumber(Math.floor(data.depressionEver - data.depression - data.depressionPrestiged))} depression spent`;
        el("prestigeLevelStat").innerHTML = `Prestige Level ${formatNumber(data.prestige)} (+${formatNumber(data.prestige)}% global multiplier)`;
        el("prestigeGainStat").innerHTML = `Gain ${formatNumber(nextPrestigeGain())} prestige levels on prestige`;
        el("depressionThisPrestigeStat").innerHTML = `${formatNumber(Math.floor(data.depressionThisPrestige))} depression (this prestige)`
        document.title = `${formatNumber(Math.floor(data.depression))} Depression | Depression Clicker`;
        el("dpsCounter").innerHTML = `${formatNumber(dps)} depression/s`;
        writeData();
        updateShop();
        const container = el("modlist");
        container.innerHTML = "";
        for (const i of data.mods) container.appendChild(modElement(i));
        addDepression(dps * (Date.now() - data.lastFrame) / 1000);
        data.lastFrame = Date.now();
    } catch(e) {
        alert(e);
    }
}, 50/3);

setInterval(writeData, 500);

el("depressionImg").addEventListener("mouseup", () => {
    const c = getDpc();
    addDepression(c);
    popupText(`+${formatNumber(c)}`, mousex, mousey);
});

el("hardReset").addEventListener("mouseup", () => {
    if (!confirm("Are you sure you want to hard reset? This will remove all of your stats and you will get nothing back.")) return;
    const mods = JSON.stringify(data.mods);
    data = {};
    data.mods = JSON.parse(mods);
    updateData();
    writeData();
});

el("importMod").addEventListener("mouseup", () => {
    const json = prompt("Enter mod JSON:");
    const obj = JSON.parse(json);
    if (!obj?.name || !obj?.script) return alert("Invalid mod data.");
    data.mods.push(obj);
    writeData();
});

el("prestigeButton").addEventListener("mouseup", () => prestige());

try {
    runMods();
} catch(e) {
    alert(e);
}