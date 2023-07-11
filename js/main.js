document.addEventListener("DOMContentLoaded", async () =>{
    // Realizar la solicitud HTTP a la API
    const respuesta = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y&locale=es');
    const respuestaGlobal = await fetch('https://api.coingecko.com/api/v3/global');
    const respuestaTrending = await fetch('https://api.coingecko.com/api/v3/search/trending');

    const datos = await respuesta.json();
    const datosGlobales = await respuestaGlobal.json();
    const trending = await respuestaTrending.json()

    //Trending
    let posicion = 1;
    trending.coins.forEach((coin, index) => {
        const destacadosTrading = document.querySelector(".destacados_trading");
        if(posicion <= 5){
            destacadosTrading.innerHTML += `
                <div class="trading">
                <p><span class="numero">${posicion}</span></p>
                <img src="${coin.item.small}" alt="${coin.item.name}">
                <p>${coin.item.name}</p>
                <p class="simbolo">${coin.item.symbol.toUpperCase()}</p>
                </div>
            `;
            posicion++
        }else{
            return;
        };
    });

    //Todas las monedas
    const coins = document.querySelector(".verCoins");
    datos.forEach((coin, index) => {
        const fila = document.createElement('tr');
        fila.classList.add(coin.id)

        const rank = document.createElement("th");
        rank.textContent = coin.market_cap_rank;
        rank.classList.add("cryptoTop");
        fila.appendChild(rank)

        const cryptoNombre = document.createElement("td");
        cryptoNombre.classList.add("cryptoNombre");
        fila.appendChild(cryptoNombre);

        const imgNombre = document.createElement("img");
        imgNombre.src = coin.image;
        imgNombre.alt = coin.name;
        cryptoNombre.appendChild(imgNombre);

        const nombreResaltado = document.createElement("p");
        nombreResaltado.classList.add("letraResaltada");
        nombreResaltado.textContent = coin.name;
        cryptoNombre.appendChild(nombreResaltado);
        
        const simbolo = document.createElement("p");
        simbolo.classList.add("symbolCrypto");
        simbolo.textContent = coin.symbol.toUpperCase();
        cryptoNombre.appendChild(simbolo);

        const cryptoPrecio = document.createElement("td");
        cryptoPrecio.classList.add("cryptoPrecio");
        cryptoPrecio.textContent = comprobarDatoEur(coin.current_price);
        fila.appendChild(cryptoPrecio);
        
        const precio1h = document.createElement("td");
        precio1h.classList.add("crypto1h");
        precio1h.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_1h_in_currency));
        precio1h.textContent = comprobarDatoPor(coin.price_change_percentage_1h_in_currency);
        fila.appendChild(precio1h);
        
        const precio24h = document.createElement("td");
        precio24h.classList.add("crypto24h");
        precio24h.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_24h_in_currency));
        precio24h.textContent = comprobarDatoPor(coin.price_change_percentage_24h_in_currency);
        fila.appendChild(precio24h);
        
        const precio7d = document.createElement("td");
        precio7d.classList.add("crypto7d");
        precio7d.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_7d_in_currency));
        precio7d.textContent = comprobarDatoPor(coin.price_change_percentage_7d_in_currency);
        fila.appendChild(precio7d);

        const cryptoCap = document.createElement("td");
        cryptoCap.classList.add("cryptoCap");
        cryptoCap.textContent = comprobarDatoEur(coin.market_cap);
        fila.appendChild(cryptoCap);

        coins.appendChild(fila)
    });

    //Datos globales
    const globalCap = document.querySelector(".globalCap");
    const globalVar = document.querySelector(".globalVar span");
    const globalVol = document.querySelector(".globalVol");
    const globalCriptos = document.querySelector(".globalCriptos");
    const globalInter = document.querySelector(".globalInter");

    globalCap.textContent = `Cap del mercado: ${datosGlobales.data.total_market_cap.eur.toLocaleString('es-ES')} €`;
    globalVar.textContent = `${datosGlobales.data.market_cap_change_percentage_24h_usd.toFixed(2)} %`;
    globalVar.classList.add(comprobarDatoPorcentaje(datosGlobales.data.market_cap_change_percentage_24h_usd))
    globalVol.textContent = `Volumen últimas 24h: ${datosGlobales.data.total_volume.eur.toLocaleString('es-ES')} €`;
    globalCriptos.textContent = `Criptomonedas: ${datosGlobales.data.active_cryptocurrencies.toLocaleString('es-ES')}`;
    globalInter.textContent = `Intercambios: ${datosGlobales.data.markets.toLocaleString('es-ES')}`;

    //Dominancia
    const destacadosDominio = document.querySelector(".destacados_dominio");
    let posicion2 = 1;
    for (const coin in datosGlobales.data.market_cap_percentage) {
        if(posicion2 <= 5){
            destacadosDominio.innerHTML += `
            <p><span class="numero">${posicion2}</span> ${coin.toUpperCase()}: ${datosGlobales.data.market_cap_percentage[coin].toFixed(2)}%</p>
            `;
            posicion2++;
        }else{
            break;
        }
    }

    const infoCrypto = document.querySelector(".infoCrypto");
    const infoNumero = document.querySelector(".infoNumero");
    const infoImg = document.querySelector(".infoImg");
    const infoNombre = document.querySelector(".infoNombre");
    const infoPrecio = document.querySelector(".infoPrecio");
    const infoCap = document.querySelector(".infoCap");
    const infoVolumen = document.querySelector(".infoVolumen");
    const infoPrecio1h = document.querySelector(".parrafoInfo.p1h .infoPrecio1h");
    const infoPrecio24h = document.querySelector(".parrafoInfo.p24h .infoPrecio24h");
    const pMax = document.querySelector(".pMax");
    const pMin = document.querySelector(".pMin");
    const infoPrecio7d = document.querySelector(".parrafoInfo.p7d .infoPrecio7d");
    const infoPrecio30d = document.querySelector(".parrafoInfo.p30d .infoPrecio30d");
    const infoPrecio1y = document.querySelector(".parrafoInfo.p1y .infoPrecio1y");
    const sCirculante = document.querySelector(".sCirculante");
    const mCirculante = document.querySelector(".mCirculante");
    const precioMax = document.querySelector(".precioMax");
    const precioMin = document.querySelector(".precioMin");
    //Más Info
    listadoCoins.querySelectorAll("tr").forEach((fila) => {
        fila.addEventListener("click", () => {
            const idMoneda = fila.className;

            infoCrypto.style.transition = "left 0.5s";
            infoCrypto.style.left = "1000px";

            setTimeout(() => {
                datos.forEach(coin => {
                    if(coin.id === idMoneda){
                        infoNumero.textContent = "#" + coin.market_cap_rank;
                        infoImg.src = coin.image;
                        infoImg.alt = coin.name;
                        infoNombre.innerHTML = `${coin.name} <span class="infoAbreviatura">${coin.symbol.toUpperCase()}</span>`;
                        infoPrecio.innerHTML = `${comprobarDatoEur(coin.current_price)} <span class="infoPrecio1h fondo${comprobarDatoPorcentaje(coin.price_change_percentage_1h_in_currency)}">${comprobarDatoPor(coin.price_change_percentage_1h_in_currency)}</span>`;
                        infoCap.textContent = comprobarDatoEur(coin.market_cap);
                        infoVolumen.textContent = comprobarDatoEur(coin.total_volume);
                        infoPrecio1h.classList.remove("verde", "rojo", "blanco");
                        infoPrecio1h.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_1h_in_currency));
                        infoPrecio1h.textContent = comprobarDatoPor(coin.price_change_percentage_1h_in_currency.toLocaleString('es-ES'));
                        infoPrecio24h.classList.remove("verde", "rojo", "blanco");
                        infoPrecio24h.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_24h_in_currency));
                        infoPrecio24h.textContent = comprobarDatoPor(coin.price_change_percentage_24h_in_currency.toLocaleString('es-ES'));
                        pMax.textContent = comprobarDatoEur(coin.high_24h);
                        pMin.textContent = comprobarDatoEur(coin.low_24h);
                        infoPrecio7d.classList.remove("verde", "rojo", "blanco");
                        infoPrecio7d.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_7d_in_currency));
                        infoPrecio7d.textContent = comprobarDatoPor(coin.price_change_percentage_7d_in_currency);
                        infoPrecio30d.classList.remove("verde", "rojo", "blanco");
                        infoPrecio30d.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_30d_in_currency));
                        infoPrecio30d.textContent = comprobarDatoPor(coin.price_change_percentage_30d_in_currency)
                        infoPrecio1y.classList.remove("verde", "rojo", "blanco");
                        infoPrecio1y.classList.add(comprobarDatoPorcentaje(coin.price_change_percentage_1y_in_currency));
                        infoPrecio1y.textContent = comprobarDatoPor(coin.price_change_percentage_1y_in_currency);
                        sCirculante.textContent = comprobarDatoEur(coin.circulating_supply);
                        mCirculante.textContent = comprobarDatoEur(coin.max_supply);
                        precioMax.textContent = comprobarDatoEur(coin.ath);
                        precioMin.textContent = comprobarDatoEur(coin.atl);
                        infoCrypto.style.left = "0";
                    }
                })
            }, 500);
        })
    })
});

const inputBuscar = document.querySelector('#buscar');
const listadoCoins = document.querySelector('.verCoins');

//Buscador
function buscarMoneda () {
    const nombreMoneda = inputBuscar.value.trim().toLowerCase();

    listadoCoins.querySelectorAll("tr").forEach((fila) => {
        const nombreMonedaFila = fila.querySelector(".letraResaltada").textContent.toLowerCase();
        const symbolCrypto = fila.querySelector(".symbolCrypto").textContent.toLowerCase();
        if (nombreMonedaFila.includes(nombreMoneda) || symbolCrypto.includes(nombreMoneda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    })
}

inputBuscar.addEventListener("input", buscarMoneda);


function comprobarDatoEur(dato){
    if(dato === null || dato === undefined){
        return "Sin datos..."
    }else{
        return dato.toLocaleString('es-ES', {maximumFractionDigits: 10}) + "€";
    }
}
function comprobarDatoPor(dato){
    if(dato === null || dato === undefined){
        return "Sin datos..."
    }else{
        return dato.toLocaleString('es-ES') + "%";
    }
}

function comprobarDatoPorcentaje(dato){
    if(dato > 0){
        console.log(dato + "El dato es mayor que 0")
        return "verde";
    }else if(dato < 0){
        return "rojo";
    }else{
        console.log(dato + "El dato es igual que 0")
        return "blanco";
    }
}