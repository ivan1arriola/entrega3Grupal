const NASA_API = 'https://images-api.nasa.gov/search?q=';
let data = [];

const getJSONData = async (input) => {
    const result = await fetch(NASA_API + input); //probar input de dos palabras
    if (result.ok) {
        const response = await result.json();
        data = response.collection.items;
    } else {
        console.log('ERROR :( ')
    }
}

const showResult = (result) => {
    let html = "";
    result.forEach(item => {
        html += `
        <div class="result">
     
        <div class="flex">
        
        <div class="img-result block">
          <img src=${item.links[0].href} alt="${item.data[0].description_508}"  >
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