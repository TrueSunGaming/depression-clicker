const getEl = (e) => document.querySelector(e);

const elementSelectors = {
    screen: "#screen",
    side: "#side",
    depressionContainer: "#depressionContainer",
    depressionCounter: "#depressionCounter",
    dpsCounter: "#dpsCounter",
    shop: "#shop",
    shopItems: "#shopItems",
    depressionImg: "#depressionImg",
    hardReset: "#hardReset",
    upgrades: "#upgrades",
    depressionStat: "#depression",
    dpsStat: "#depressionPerSecond",
    dpcStat: "#depressionPerClick",
    depressionEverStat: "#depressionEver",
    prestigeButton: "#prestigeButton",
    importMod: "#importMod",
    globalMultiplierStat: "#globalMultiplier",
    depressionSpentStat: "#depressionSpent",
    modlist: "#modlist",
    prestigeLevelStat: "#prestigeLevel",
    prestigeGainStat: "#prestigeGain",
    depressionThisPrestigeStat: "#depressionThisPrestige"
};

function el(name) {
    return getEl(elementSelectors[name]);
}