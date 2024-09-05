async function getWeather() {
    const localizacao= document.getElementById('local').value;
    const apiKey = 'ced8e8140ae1e331de8ef24011df98ea';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById('info-tempo').innerHTML = `
                <h2>Tempo em ${data.name}, ${data.sys.country}</h2>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Condição: ${data.weather[0].description}</p>
            `;
        } else {
            document.getElementById('info-tempo').innerHTML = '<p>Localização não encontrada.</p>';
        }
    } catch (error) {
        document.getElementById('info-tempo').innerHTML = '<p>Erro ao obter dados.</p>';
    }
}

function getLocalizacaoUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'ced8e8140ae1e331de8ef24011df98ea';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            document.getElementById('weather-info').innerHTML = `
                <h2>Tempo em ${data.name}, ${data.sys.country}</h2>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Condição: ${data.weather[0].description}</p>
            `;
        });
    } else {
        alert("Geolocalização não suportada pelo navegador.");
    }
}

setInterval(() => {
    getWeather();
}, 60000);
