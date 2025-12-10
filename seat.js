// ランダムな番号を生成する関数（未使用番号リストから1つ取り出す）
function genran(list) {
    const index = Math.floor(Math.random() * list.length);
    return list.splice(index, 1)[0];  // ランダム位置の値を返しつつリストから削除
}

let rock = [];   // { seat: X, student: Y } を入れる

// -----------------------------------
// rock に固定席を追加する関数（HTML ボタン）
// -----------------------------------
function addRock() {
    const seat = parseInt(document.getElementById("addSeat").value);
    const student = parseInt(document.getElementById("addStudent").value);

    if (!seat || !student || seat < 1 || seat > 42 || student < 1 || student > 42) {
        alert("1〜42 の番号を入力してください");
        return;
    }

    // 同じ席番号がすでに固定されている場合
    if (rock.some(r => r.seat === seat)) {
        alert(seat + "番席はすでに固定されています");
        return;
    }

    // 同じ生徒番号がすでに使われている場合（重複チェック）
    if (rock.some(r => r.student === student)) {
        alert("生徒番号 " + student + " はすでに固定席に使われています");
        return;
    }

    // rock に追加
    rock.push({ seat: seat, student: student });

    // 表示更新
    updateRockList();

    // 入力欄クリア
    document.getElementById("addSeat").value = "";
    document.getElementById("addStudent").value = "";
}

// -----------------------------------
// rock（固定席一覧）の表示を更新
// -----------------------------------
function updateRockList() {
    const listElem = document.getElementById("rockList");

    if (rock.length === 0) {
        listElem.textContent = "なし";
    } else {
        listElem.textContent = rock
            .map(r => `${r.seat}番席 → ${r.student}`)
            .join(" / ");
    }
}


let p = 42;  // 席数

function seat() {
    // まず 1〜p の番号リストを作成（＝配置する生徒番号）
    let candidates = [];
    for (let i = 1; i <= p; i++) candidates.push(i);

    // ---- 固定席に指定された番号は先に埋めて candidates から除外 ----
    rock.forEach(fixed => {
        const elem = document.getElementById(fixed.seat);
        elem.textContent = fixed.student;

        // 使った番号を candidates から除外
        const index = candidates.indexOf(fixed.student);
        if (index !== -1) candidates.splice(index, 1);
    });

    // ---- 残りの席をランダムに埋める ----
    for (let seatNum = 1; seatNum <= p; seatNum++) {

        // rock に含まれる seat はスキップ
        if (rock.some(fixed => fixed.seat === seatNum)) continue;

        const elem = document.getElementById(seatNum);

        // まだ使われていない番号からランダムに取得
        const student = genran(candidates);

        elem.textContent = student;
    }
}
