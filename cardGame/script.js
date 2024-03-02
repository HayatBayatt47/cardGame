const icerikler = [
    { id: 1, value: "BEŞİKTAŞ" },
    { id: 2, value: "BEŞİKTAŞ" },
    { id: 3, value: "FENERBAHÇE" },
    { id: 4, value: "FENERBAHÇE" },
    { id: 5, value: "GALATASARAY" },
    { id: 6, value: "GALATASARAY" },
    { id: 7, value: "İSTANBUL" },
    { id: 8, value: "İSTANBUL" },
    { id: 9, value: "BAŞAKŞEHİR" },
    { id: 10, value: "BAŞAKŞEHİR" },
    { id: 11, value: "KASIMPAŞA" },
    { id: 12, value: "KASIMPAŞA" },
    { id: 13, value: "KARAGÜMRÜK" },
    { id: 14, value: "KARAGÜMRÜK" },
    { id: 15, value: "PENDİK" },
    { id: 16, value: "PENDİK" }
];

const kapsayici = document.getElementById("container");
const zamanGoster = document.getElementById("timer");
let sayac = 0;
let kart1 = null;
let kart2 = null;
let timer = null; // Zamanlayıcıyı global olarak tanımlayın

function karistir(icerikler) {
    for (let i = 0; i < icerikler.length; i++) {
        const rastgeleSayi = Math.floor(Math.random() * (i + 1));
        [icerikler[i], icerikler[rastgeleSayi]] = [icerikler[rastgeleSayi], icerikler[i]];
    }
}

function zamanlayici() {
    // Başlangıç değeri
    let countDown = 60;

    // Her saniye bir çalışacak fonksiyon
    timer = setInterval(() => {
        // Eğer sayacı sıfıra düşürdüysek, zamanlayıcıyı durdur
        if (countDown <= 0) {
            clearInterval(timer);
            alert("Zaman doldu!");
            kapsayici.innerHTML = "";
            zamanGoster.innerHTML = "...";
        } else {
            // Sayacı azalt
            countDown--;

            zamanGoster.innerHTML = countDown + " saniye içinde bitiriniz!";
        }
    }, 1000); // Her bir saniyede bir çalışacak (1000 ms)
}

function oyunOlustur() {
    kapsayici.innerHTML = "";
    sayac = 0;
    clearInterval(timer);
    karistir(icerikler);
    icerikler.forEach((icerik) => {
        const yeniKart = document.createElement("div");
        yeniKart.innerHTML = "?";
        yeniKart.dataset.value = icerik.value;
        kapsayici.appendChild(yeniKart);
        yeniKart.addEventListener("click", kartAc);
    });
    zamanlayici();
}

function kartAc() {
    sayac++;
    console.log(sayac);
    if (sayac == 1) {
        kart1 = this;
        kart1.innerHTML = kart1.dataset.value;
    } else if (sayac == 2) {
        kart2 = this;
        kart2.innerHTML = kart2.dataset.value;
        kartKarsilastir();
    }
}

function kartKarsilastir() {
    console.log(kart1, kart2);
    if (kart1.innerHTML == kart2.innerHTML) {
        kart1.classList.add("eslesenler");
        kart2.classList.add("eslesenler");
    } else {
        setTimeout(() => {
            kart1.innerHTML = "?";
            kart2.innerHTML = "?";

        }, 1000);
    }
    sayac = 0;
    const eslesenler = document.getElementsByClassName("eslesenler");
    console.log(eslesenler);
    if (eslesenler.length == 16) {
        alert("Oyunu kazandınız!!!");
        kapsayici.innerHTML = "";
        clearInterval(timer);
        console.log("Zamanlayıcı durduruldu!");
        zamanGoster.innerHTML = "...";
    }
}
