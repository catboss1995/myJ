// 遊戲設定
var games = {
    power: { name: "威力彩", areas: [{ count: 6, max: 38, canRepeat: false }, { count: 1, max: 8, canRepeat: false }] },
    lotto: { name: "大樂透", areas: [{ count: 6, max: 49, canRepeat: false }, { count: 1, max: 49, canRepeat: true }] },
    "539": { name: "今彩539", areas: [{ count: 5, max: 39, canRepeat: false }] }
};

var round = 1;      // 期數
var records = [];   // 所有開獎紀錄都存在這個陣列

// 產生隨機號碼，回傳排序前、排序後的陣列
function getRandomNumbers(count, max, canRepeat) {
    var numbers = [];
    while (numbers.length < count) {
        var num = Math.floor(Math.random() * max) + 1;
        if (canRepeat || numbers.indexOf(num) === -1) {
            numbers.push(num);
        }
    }
    var before = [];
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] < 10) {
            before.push("0" + numbers[i]);
        } else {
            before.push(numbers[i].toString());
        }
    }
    var sorted = [];
    for (var i = 0; i < numbers.length; i++) {
        sorted.push(numbers[i]);
    }
    sorted.sort(function (a, b) { return a - b; });
    var after = [];
    for (var i = 0; i < sorted.length; i++) {
        if (sorted[i] < 10) {
            after.push("0" + sorted[i]);
        } else {
            after.push(sorted[i].toString());
        }
    }
    return { before: before, after: after };
}

// 把陣列的紀錄全部顯示在表格
function renderTable() {
    var table = document.getElementById("historyTable").getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // 每次都先清空

    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>第" + record.round + "期</td>"
            + "<td>" + record.gameName + "</td>"
            + "<td>" + record.sortBefore + "</td>"
            + "<td>" + record.sortAfter + "</td>"
            + "<td>" + record.secNo + "</td>";
        table.appendChild(tr);
    }
}

// 模擬一次開獎
function playGame(gameKey) {
    var game = games[gameKey];
    if (!game) return;

    var sortBefore = "-", sortAfter = "-", secNo = "-";
    var showText = "<b>" + game.name + " 開獎結果：</b><br><hr>";

    // 第1區
    var mainArea = game.areas[0];
    var mainNums = getRandomNumbers(mainArea.count, mainArea.max, mainArea.canRepeat);
    sortBefore = mainNums.before.join(", ");
    sortAfter = mainNums.after.join(", ");
    showText += "排序前（第1區）：" + sortBefore + "<br>";
    showText += "排序後（第1區）：" + sortAfter + "<br>";

    // 第2區（有才產生）
    if (game.areas.length > 1) {
        var secArea = game.areas[1];
        var secNums = getRandomNumbers(secArea.count, secArea.max, secArea.canRepeat);
        secNo = secNums.before.join(", ");
        showText += "第二區號碼：" + secNo + "<br>";
    } else {
        showText += "第二區號碼：-<br>";
    }

    document.getElementById("result").innerHTML = showText;

    // 紀錄本期的資料到陣列
    records.push({
        round: round,
        gameName: game.name,
        sortBefore: sortBefore,
        sortAfter: sortAfter,
        secNo: secNo
    });
    round++;

    renderTable(); // 每次都用陣列畫表格
}

// 清空紀錄
function clearHistory() {
    var ok = confirm("確定要清空紀錄嗎？");
    if(!ok) return;  // 如果按取消就什麼都不做
    records = [];
    round = 1;
    renderTable();
}
