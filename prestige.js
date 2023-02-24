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

function nextPrestigeGain() {
    return Math.floor(Math.cbrt(data.depressionThisPrestige / 1e12 / (data.prestige ** 3 + 1)));
}