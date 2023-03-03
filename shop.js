class ShopItem {
    constructor(name = "", basePrice = 0, baseDps = 0, upgrades = []) {
        this.name = name;
        this.basePrice = basePrice;
        this.baseDps = baseDps;
        this.upgrades = upgrades;
        this.count = 0;
        this.index = -1;
    }

    static fromRaw({name = "", basePrice = 0, baseDps = 0, upgrades = []}) {
        return new ShopItem(name, basePrice, baseDps, upgrades);
    }

    get price() {
        return Math.round(this.basePrice * 1.15 ** this.count);
    }

    get dps() {
        let d = this.baseDps;
        for (const i of data.purchasedUpgrades) {
            const s = upgradeList[i].multipliers.shop;
            if (s[this.index]) d *= s[this.index];
        }
        return d;
    }

    get totalDps() {
        return this.dps * this.count;
    }

    get element() {
        const el = document.createElement("div");
        el.classList.add("shopItem");
        el.addEventListener("mouseup", () => this.buy());
        const title = document.createElement("h2");
        title.innerHTML = `${this.name} (x${this.count})`;
        el.append(title, `Gain: ${formatNumber(Math.floor(this.dps * getGlobalMultiplier()))} Depression/s`, document.createElement("br"), `Cost: ${formatNumber(this.price)} Depression`);
        return el;
    }

    buy() {
        if (data.depression >= this.price) {
            addDepression(-this.price);
            this.count++;
            data.shopItems[this.index] = this.count;
            writeData();
            updateShop();
        } else popupText("Cannot afford", mousex, mousey);
    }
}

const shopList = [
    {
        name: "Clicker",
        basePrice: 10,
        baseDps: 1
    },

    {
        name: "Lonely",
        basePrice: 150,
        baseDps: 10
    },

    {
        name: "Loss",
        basePrice: 5000,
        baseDps: 150
    },

    {
        name: "Injury",
        basePrice: 5e4,
        baseDps: 1000
    },

    {
        name: "Dead Dog",
        basePrice: 2.5e7,
        baseDps: 1.5e5
    },

    {
        name: "Divorce",
        basePrice: 7.5e9,
        baseDps: 2.5e6
    },

    {
        name: "No More Fortnite",
        basePrice: 1e11,
        baseDps: 5e8
    },

    {
        name: "Bankrupt",
        basePrice: 5e13,
        baseDps: 2.5e10
    },

    {
        name: "Depression Machine",
        basePrice: 2.5e16,
        baseDps: 5e13
    },

    {
        name: "Hacked Depression",
        basePrice: 5e20,
        baseDps: 2.5e17
    }
].sort((a, b) => a.basePrice - b.basePrice);

const upgradeList = {
    megaClick: {
        name: "Megaclick",
        description: "Clicking and clickers are twice as effective",
        cost: 100,
        validation: () => data.shopItems[0] >= 5,
        multipliers: {
            shop: [2],
            global: 1,
            click: 2,
            clickDps: 0
        }
    },

    gigaClick: {
        name: "Gigaclick",
        description: "Clicking and clickers are twice as effective",
        cost: 500,
        validation: () => data.shopItems[0] >= 15,
        multipliers: {
            shop: [2],
            global: 1,
            click: 2,
            clickDps: 0
        }
    },

    syncedClicker1: {
        name: "Synced Clicker I",
        description: "Clickers are twice as effective and clicking gains +1% of your DPS",
        cost: 1000,
        validation: () => data.shopItems[0] >= 25,
        multipliers: {
            shop: [2],
            global: 1,
            click: 1,
            clickDps: 0.01
        }
    },

    syncedClicker2: {
        name: "Synced Clicker II",
        description: "Clickers are twice as effective and clicking gains +1% of your DPS",
        cost: 1e5,
        validation: () => data.shopItems[0] >= 50,
        multipliers: {
            shop: [2],
            global: 1,
            click: 1,
            clickDps: 0.01
        }
    },

    syncedClicker3: {
        name: "Synced Clicker III",
        description: "Clickers are twice as effective and clicking gains +1% of your DPS",
        cost: 1e7,
        validation: () => data.shopItems[0] >= 100,
        multipliers: {
            shop: [2],
            global: 1,
            click: 1,
            clickDps: 0.01
        }
    },

    ultimateClicker1: {
        name: "Ultimate Clicker I",
        description: "Clickers are 10 times as effective and clicking gains +3% of your DPS",
        cost: 5e10,
        validation: () => data.shopItems[0] >= 150,
        multipliers: {
            shop: [10],
            global: 1,
            click: 1,
            clickDps: 0.03
        }
    },

    ultimateClicker2: {
        name: "Ultimate Clicker II",
        description: "Clickers are 10 times as effective and clicking gains +3% of your DPS",
        cost: 1e14,
        validation: () => data.shopItems[0] >= 200,
        multipliers: {
            shop: [10],
            global: 1,
            click: 1,
            clickDps: 0.03
        }
    },

    ultimateClicker3: {
        name: "Ultimate Clicker III",
        description: "Clickers are 10 times as effective and clicking gains +3% of your DPS",
        cost: 2e17,
        validation: () => data.shopItems[0] >= 250,
        multipliers: {
            shop: [10],
            global: 1,
            click: 1,
            clickDps: 0.03
        }
    },

    depression1: {
        name: "Depression I",
        description: "x1.1 global multiplier",
        cost: 5e4,
        validation: () => data.depressionThisPrestige >= 1e5,
        multipliers: {
            shop: [],
            global: 1.1,
            click: 1,
            clickDps: 0
        }
    },

    depression2: {
        name: "Depression II",
        description: "x1.1 global multiplier",
        cost: 5e6,
        validation: () => data.depressionThisPrestige >= 1e7,
        multipliers: {
            shop: [],
            global: 1.1,
            click: 1,
            clickDps: 0
        }
    },

    depression3: {
        name: "Depression III",
        description: "x1.1 global multiplier",
        cost: 5e8,
        validation: () => data.depressionThisPrestige >= 1e9,
        multipliers: {
            shop: [],
            global: 1.1,
            click: 1,
            clickDps: 0
        }
    },

    depression4: {
        name: "Depression IV",
        description: "x1.1 global multiplier",
        cost: 5e10,
        validation: () => data.depressionThisPrestige >= 1e11,
        multipliers: {
            shop: [],
            global: 1.1,
            click: 1,
            clickDps: 0
        }
    },

    depression5: {
        name: "Depression V",
        description: "x1.1 global multiplier",
        cost: 5e12,
        validation: () => data.depressionThisPrestige >= 1e13,
        multipliers: {
            shop: [],
            global: 1.1,
            click: 1,
            clickDps: 0
        }
    },

    noFriends1: {
        name: "No Friends I",
        description: "Lonely is twice as effective",
        cost: 1000,
        validation: () => data.shopItems[1] >= 5,
        multipliers: {
            shop: [1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    noFriends2: {
        name: "No Friends II",
        description: "Lonely is twice as effective",
        cost: 1e5,
        validation: () => data.shopItems[1] >= 25,
        multipliers: {
            shop: [1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    noFriends3: {
        name: "No Friends III",
        description: "Lonely is twice as effective",
        cost: 1e6,
        validation: () => data.shopItems[1] >= 50,
        multipliers: {
            shop: [1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lostEverything1: {
        name: "Lost Everything I",
        description: "Loss is twice as effective",
        cost: 5e4,
        validation: () => data.shopItems[2] >= 5,
        multipliers: {
            shop: [1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lostEverything2: {
        name: "Lost Everything II",
        description: "Loss is twice as effective",
        cost: 1e6,
        validation: () => data.shopItems[2] >= 25,
        multipliers: {
            shop: [1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lostEverything3: {
        name: "Lost Everything III",
        description: "Loss is twice as effective",
        cost: 5e7,
        validation: () => data.shopItems[2] >= 50,
        multipliers: {
            shop: [1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    brokenBones1: {
        name: "Broken Bones I",
        description: "Injuries are twice as effective",
        cost: 1e6,
        validation: () => data.shopItems[3] >= 5,
        multipliers: {
            shop: [1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    brokenBones2: {
        name: "Broken Bones II",
        description: "Injuries are twice as effective",
        cost: 1.5e7,
        validation: () => data.shopItems[3] >= 25,
        multipliers: {
            shop: [1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    brokenBones3: {
        name: "Broken Bones III",
        description: "Injuries are twice as effective",
        cost: 2e8,
        validation: () => data.shopItems[3] >= 50,
        multipliers: {
            shop: [1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lmdify1: {
        name: "Let Me Do It For You I",
        description: "Dead dogs are twice as effective",
        cost: 1e8,
        validation: () => data.shopItems[4] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lmdify2: {
        name: "Let Me Do It For You II",
        description: "Dead dogs are twice as effective",
        cost: 5e9,
        validation: () => data.shopItems[4] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    lmdify3: {
        name: "Let Me Do It For You III",
        description: "Dead dogs are twice as effective",
        cost: 2.5e11,
        validation: () => data.shopItems[4] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    argument1: {
        name: "Argument I",
        description: "Divorce is twice as effective",
        cost: 1e11,
        validation: () => data.shopItems[5] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    argument2: {
        name: "Argument II",
        description: "Divorce is twice as effective",
        cost: 5e12,
        validation: () => data.shopItems[5] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    argument3: {
        name: "Argument III",
        description: "Divorce is twice as effective",
        cost: 8e13,
        validation: () => data.shopItems[5] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    tooMuchVbucks1: {
        name: "Too Much V-Bucks I",
        description: "No More Fortnite is twice as effective",
        cost: 1e12,
        validation: () => data.shopItems[6] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    tooMuchVbucks2: {
        name: "Too Much V-Bucks II",
        description: "No More Fortnite is twice as effective",
        cost: 1.5e13,
        validation: () => data.shopItems[6] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    tooMuchVbucks3: {
        name: "Too Much V-Bucks III",
        description: "No More Fortnite is twice as effective",
        cost: 1e15,
        validation: () => data.shopItems[6] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    noMoney1: {
        name: "$💀 I",
        description: "Bankrupt is twice as effective",
        cost: 1.5e15,
        validation: () => data.shopItems[7] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    noMoney2: {
        name: "$💀 II",
        description: "Bankrupt is twice as effective",
        cost: 2e16,
        validation: () => data.shopItems[7] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    noMoney3: {
        name: "$💀 III",
        description: "Bankrupt is twice as effective",
        cost: 2.5e18,
        validation: () => data.shopItems[7] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    overclock1: {
        name: "Overclock I",
        description: "Depression Machines are twice as effective",
        cost: 3e18,
        validation: () => data.shopItems[8] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    overclock2: {
        name: "Overclock II",
        description: "Depression Machines are twice as effective",
        cost: 2e19,
        validation: () => data.shopItems[8] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    overclock3: {
        name: "Overclock III",
        description: "Depression Machines are twice as effective",
        cost: 5e20,
        validation: () => data.shopItems[8] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    depressionPlusPlus1: {
        name: "depression++ I",
        description: "Hacked Depression is twice as effective",
        cost: 1.5e22,
        validation: () => data.shopItems[9] >= 5,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    depressionPlusPlus2: {
        name: "depression++ II",
        description: "Hacked Depression is twice as effective",
        cost: 5e23,
        validation: () => data.shopItems[9] >= 25,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    },

    depressionPlusPlus3: {
        name: "depression++ III",
        description: "Hacked Depression is twice as effective",
        cost: 2.5e24,
        validation: () => data.shopItems[9] >= 50,
        multipliers: {
            shop: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            global: 1,
            click: 1,
            clickDps: 0
        }
    }
};

function generateShopItems() {
    const items = [];

    for (let i = 0; i < shopList.length; i++) {
        const si = ShopItem.fromRaw(shopList[i]);
        if (data.shopItems.length <= i) data.shopItems.push(0);
        si.count = data.shopItems[i];
        si.index = i;
        items.push(si);
    }

    writeData();

    return items;
}

function updateShop() {
    el("shopItems").innerHTML = "";
    el("upgrades").innerHTML = "";
    for (const i of generateShopItems()) el("shopItems").appendChild(i.element);
    let upgradeCount = 0;
    for (const i of Object.keys(upgradeList)) {
        if (data.purchasedUpgrades.includes(i) || !upgradeList[i].validation()) continue;
        upgradeCount++;
        const ele = document.createElement("div");
        ele.classList.add("shopItem");
        ele.addEventListener("mouseup", () => {
            if (data.depression >= upgradeList[i].cost) {
                addDepression(-upgradeList[i].cost);
                data.purchasedUpgrades.push(i);
                writeData();
                updateShop();
            } else popupText("Cannot afford", mousex, mousey);
        });
        const title = document.createElement("h2");
        title.innerHTML = upgradeList[i].name;
        ele.append(title, upgradeList[i].description, document.createElement("br"), `Cost: ${formatNumber(upgradeList[i].cost)} Depression`);
        el("upgrades").appendChild(ele);
    }
    if (!upgradeCount) el("upgrades").innerHTML = "No upgrades available to purchase :(";
}