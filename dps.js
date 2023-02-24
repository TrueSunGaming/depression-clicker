function getDps() {
    let d = 0;
    for (const i of generateShopItems()) d += i.totalDps;
    d *= getGlobalMultiplier();
    return Math.floor(d);
}

function getDpc() {
    let c = 1;
    c += getClickAddition();
    for (const i of data.purchasedUpgrades) c *= upgradeList[i].multipliers.click;
    c *= getGlobalMultiplier();
    return Math.floor(c);
}

function getClickAddition() {
    let d = 0;
    for (const i of data.purchasedUpgrades) d += upgradeList[i].multipliers.clickDps;
    return Math.floor(d * getDps());
}

function getGlobalMultiplier() {
    let d = 1 + data.prestige / 100;
    for (const i of data.purchasedUpgrades) d *= upgradeList[i].multipliers.global;
    return d;
}