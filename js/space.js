const NASA_API = 'https://images-api.nasa.gov/search?q=';
const MEDIA_TYPE = '&media_type=image'; 
// Se agrego un parametro para pedir que solo devuelva imagenes (excluyendo videos y audios de las respuestas)
let data = [];

const getJSONData = async (input) => {
    console.log(NASA_API + input + MEDIA_TYPE)
    const result = await fetch(NASA_API + input + MEDIA_TYPE);
    if (result.ok) {
        const response = await result.json();
        data = response.collection.items;
    } else {
        console.log('ERROR :( ')
    }
}

const showResult = (result) => {
    
    let html = `<div class="card-deck card-group">`;
    result.forEach((item, index) => {

        const imgLink = item.links[0].href.replace(/\s+/g, '%20'); 
        // uso replace para reemplazar los espacios en blanco del link por %20 para que el navegador lo interprete adecuadamente

        html += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${imgLink} alt="${index}">
            <div class="card-body">
                <h5 class="card-title">${item.data[0].title}</h5>
                <p class="card-text">${item.data[0].description}</p>
            </div>
        </div>
        `
        
        if(index!= 0 && index % 4 == 3) {
            html += `
            </div>
            <div class="card-deck card-group">
            `
        }
    });

    html += `</div>`;


    document.getElementById('contenedor').innerHTML = html;

}

document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar')

    btnBuscar.addEventListener('click', async () => {
        const inputBuscar = document.getElementById('inputBuscar').value;
        await getJSONData(inputBuscar);
        showResult(data);

    })

})