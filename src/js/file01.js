"use strict";


const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};




import { fetchProducts } from './functions.js';


// Función flecha para renderizar productos
let renderProducts = () => {

    // Llamar a fetchProducts con la URL indicada
    fetchProducts('https://data-dawm.github.io/datum/reseller/products.json')
        .then(result => {

            // Verificar si la solicitud fue exitosa
            if (result.success) {

                // Obtener el contenedor de productos
                let container = document.getElementById('products-container');
                container.innerHTML = ''; // Limpiar contenido anterior

                // Obtener los primeros 6 productos
                let products = result.body.slice(0, 6);

                // Recorrer cada producto
                products.forEach(product => {

                    // Plantilla base de la tarjeta
                    let productHTML = `
                    <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <img
                            class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                            src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                        <h3
                            class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                            $[PRODUCT.PRICE]
                        </h3>

                        <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
                        <div class="space-y-2">
                            <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                Ver en Amazon
                            </a>
                            <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
                        </div>
                    </div>`;

                    // Reemplazar los marcadores de posición
                    productHTML = productHTML.replaceAll('[PRODUCT.IMGURL]', product.imgUrl);
                    productHTML = productHTML.replaceAll('[PRODUCT.TITLE]', product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title);
                    productHTML = productHTML.replaceAll('[PRODUCT.PRICE]', product.price);
                    productHTML = productHTML.replaceAll('[PRODUCT.PRODUCTURL]', product.productURL);
                    productHTML = productHTML.replaceAll('[PRODUCT.CATEGORY_ID]', product.category_id);

                    // Agregar la tarjeta al contenedor
                    container.innerHTML += productHTML;
                });

            } else {
                // Mostrar mensaje de error si result.success es false
                alert('Error al cargar productos: ' + result.body);
            }
        });
};

// Función de autoejecución
(() => {
    showToast();
    showVideo();
    renderProducts();
})();

