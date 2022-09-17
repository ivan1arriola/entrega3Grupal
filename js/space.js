const NASA_API = 'https://images-api.nasa.gov/search?q=';
const MEDIA_TYPE = '&media_type=image'; // Se agrego un parametro para pedir que solo devuelva imagenes (excluyendo videos de las respuestas)
let data = [];

const getJSONData = async (input) => {
    const result = await fetch(NASA_API + input + MEDIA_TYPE);
    if (result.ok) {
        const response = await result.json();
        data = response.collection.items;
    } else {
        console.log('ERROR :( ')
    }
}

const showResult = (result) => {
    
    let html = "";
    result.forEach((item, index) => {
        html += `
        <div class="result">
     
        <div class="flex">
        
        <div class="img-result block">
          <img src=${item.links[0].href} alt="${index}"  >
        </div>
        
        <div class="block">
            <h1>${item.data[0].title}</h1> 
           <div class="des"><p>${item.data[0].description}</p></div>
        </div>
        </div> 
        
        </div>
        `
    });
    document.getElementById('contenedor').innerHTML = html;

}


document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar')

    btnBuscar.addEventListener('click', async () => {
        const inputBuscar = document.getElementById('inputBuscar').value;
        await getJSONData(inputBuscar);
        showResult(data);





    })
        ;






})