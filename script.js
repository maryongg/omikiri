function navigateTo(page) {
    window.location.href = `${page}.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndRenderLists();
    loadData();
});

function fetchDataAndRenderLists() {
    fetch('/api/menList')
        .then(response => response.json())
        .then(menList => {
            const menListContainer = document.getElementById('menList');
            if (menListContainer) {
                menList.forEach(man => {
                    const div = document.createElement('div');
                    div.textContent = man.name;
                    div.onclick = () => showDetail(man);
                    div.id = `men-${man.id}`;
                    menListContainer.appendChild(div);
                });
            }
        });

    fetch('/api/omikiriList')
        .then(response => response.json())
        .then(omikiriList => {
            const omikiriListContainer = document.getElementById('omikiriList');
            if (omikiriListContainer) {
                omikiriList.forEach(man => {
                    const div = document.createElement('div');
                    div.textContent = man.name;
                    div.onclick = () => showDetail(man);
                    omikiriListContainer.appendChild(div);
                });
            }
        });
}

function showDetail(man) {
    localStorage.setItem('detail', JSON.stringify(man));
    navigateTo('detail');
}

function removeFromMenList(itemId) {
    // アイテムを進行中メズから削除
    const item = document.getElementById(itemId);
    document.getElementById('menList').removeChild(item);

    // お見切りリストにアイテムを追加
    document.getElementById('dismissedList').appendChild(item);
}

if (detailContainer) {
    const man = JSON.parse(localStorage.getItem('detail'));
    if (man) {
        detailContainer.innerHTML = `
            <p>名前: ${man.name}</p>
            <p>ふりがな: ${man.nickname}</p>
            <p>年齢: ${man.age}</p>
            <p>出身: ${man.origin}</p>
            <p>年収: ${man.income}</p>
            <p>出会いの手段: ${man.meetingMethod}</p>
            <p>デート費用: ${man.dateCost}</p>
        `;
    }
}

// new.htmlにおけるデータ保存の例
function saveData() {
    const data = document.getElementById('inputField').value;
    localStorage.setItem('mensData', data);
}

// mensList.htmlにおけるデータ読み込みの例
function loadData() {
    const mensData = JSON.parse(localStorage.getItem('mensData'));
    if (mensData) {
        const listContainer = document.getElementById('listContainer');
        mensData.forEach(data => {
            const listItem = document.createElement('li');
            listItem.textContent = `名前: ${data.name}, ふりがな: ${data.furigana}, ニックネーム: ${data.nickname}, 収入: ${data.income}, 出会い方: ${data.meetingMethod}, デート費用: ${data.dateCost}`;
            listContainer.appendChild(listItem);
        });
    }
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルト送信を防止

    const formData = {
        name: document.querySelector('[placeholder="名前"]').value,
        furigana: document.querySelector('[placeholder="ふりがな"]').value,
        nickname: document.querySelector('[placeholder="ニックネーム"]').value,
        income: document.getElementById('income').value,
        meetingMethod: document.getElementById('meetingMethod').value,
        dateCost: document.getElementById('dateCost').value
    };

    let mensData = JSON.parse(localStorage.getItem('mensData')) || [];
    mensData.push(formData);
    localStorage.setItem('mensData', JSON.stringify(mensData));

    document.getElementById('registerForm').reset();
});

document.addEventListener('DOMContentLoaded', function() {
    fetchCounts();
});

function fetchCounts() {
    // ここでサーバーからデータを取得するAPIを呼び出します
    // 以下はダミーのデータとしていますが、実際にはサーバーからのレスポンスに置き換えてください
    const mensCount = 6; // 例: APIから取得した進行中メンズの数
    const omikiriCount = 2; // : APIから取得したお見切りの数

    document.getElementById('mensCount').textContent = `進行中メンズ: ${mensCount}人`;
    document.getElementById('omikiriCount').textContent = `お見切り: ${omikiriCount}人`;
}

document.addEventListener('DOMContentLoaded', function() {
    const ageSelect = document.getElementById('ageSelect');
    const originSelect = document.getElementById('originSelect');

    // 年齢の選択肢を追加

});

// mensList.htmlのスクリプト部分
document.addEventListener('DOMContentLoaded', loadData);

