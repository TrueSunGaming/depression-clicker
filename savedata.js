let data = JSON.parse(localStorage.TRUESUNGAMING_DEPRESSION_CLICKER_DATA ?? "{}");

function updateData() {
    data = Object.assign({
        version: 1,
        depression: 0,
        shopItems: [],
        lastFrame: Date.now(),
        purchasedUpgrades: [],
        depressionEver: 0,
        mods: [],
        depressionPrestiged: 0,
        prestige: 0,
        depressionThisPrestige: 0
    }, data);

    data.version = 1;
}

updateData();

function writeData() {
    localStorage.TRUESUNGAMING_DEPRESSION_CLICKER_DATA = JSON.stringify(data);
}

function addDepression(x = 0) {
    data.depression += x;
    if (x > 0) {
        data.depressionEver += x;
        data.depressionThisPrestige += x;
    }
}