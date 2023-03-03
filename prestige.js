function prestige() {
    const prestige = nextPrestigeGain();
    if (!confirm(`Are you sure you want to prestige? You will lose all of your things and gain ${formatNumber(prestige)} prestige levels (+${formatNumber(prestige)}% global multiplier)`)) return;
    data.depressionPrestiged += data.depression;
    data.prestige += prestige;
    data.depression = 0;
    data.depressionThisPrestige = 0;
    data.shopItems = [];
    data.purchasedUpgrades = [];
    writeData();
}

function totalPrestige() {
    return Math.floor(Math.cbrt(data.depressionEver / 1e12));
}

function nextPrestigeGain() {
    return totalPrestige() - data.prestige;
}