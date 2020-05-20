---
title: Cómo hacer web scraping con javascript y nodejs.
date: 2020-05-21
slug: /articulo/como-hacer-web-scraping-con-javascript-y-nodejs
image: ./image.jpg
altImage: Un robot haciendo web scraping
keywords: 
 - Web Scraping
 - Javascript
 - puppeteer
 - jsdom
---
![Un robot haciendo web scraping](./image.jpg)

Internet es el lugar donde más información existe en el mundo. La mayoría de esta información está distribuida en un formato entendible para el consumo de las personas (sitios web); pero con cierta dificultad para acceder a ella de forma programada. Si tuviéramos acceso a una API REST de dicha información o a la base de datos donde la guardan, consumirla de manera programada resultaría relativamente fácil.

Cuando tienes este tipo de problema a solucionar, es decir, extraer información de sitios web sin acceso a una API REST o base de datos. Para solucionarlo, existe una técnica llamada web scraping, que consiste en crear código para extraer información de estos sitios web. Estos programas llegan a simular a una persona navegando en la web.

## El web scraping se encuentra por todo el internet

El web scraping es usado en infinidades de tareas en el internet. Son llamados de diferentes formas dependiendo de su función (crawlers, spiders, scrapers, bots), estos son los responsables de generar el mayor tráfico en el internet.

- Google y otros motores de búsquedas utilizan esta técnica para navegador por toda la web, indexan los sitios que encuentren y estos son mostrados en los resultados de búsqueda.

- Automatización de tareas repetitivas en la web, como comprar en un sitio de ventas cuando un producto tenga un precio determinado.

- Recopilación de información de diferentes sitios, organizarla y mostrarla en formato estructurado para un posterior análisis o consumo. Esta es la base de los comparadores de precios y la mayoría de los servicios para analizar otros sitios web de la competencia.

**Importante aclarar**. El web scraping dada su naturaleza, puede ir en contra de los términos legales y el modo de usar la información de algunos sitios web. Sugiero informarte bien sobre este tema antes de empezar a realizar tus programas de scraping.

## ¿Qué necesito para hacer un web scraping?

Hacer web scraping a un sitio web no tiene mucha complejidad, al menos uno sencillo, como el que haremos aquí usando javascript y nodejs. Los scrapers pueden llegar a ser bien complejos, dependendiendo de su funcionalidad y de los sitios web que tengas como objetivos.

Lo primero que necesitamos es una librería que pueda hacer peticiones mediante el protocolo HTTP, que es el usado por los sitios web. Aquí existen dos variantes a tener en cuenta.

- [got](https://www.npmjs.com/package/got) es una librería de peticiones HTTP. Esta librería nos dará el html devuelto por del servidor. Muchos sitios web modernos usan javascript para renderizar parte del html que ves en el sitio web, en este caso, esta librería no podrá obtener el html final. Si necesitamos el html renderizado por el javascript y por el servidor necesitamos un headless browser.

- [puppeteer](https://www.npmjs.com/package/puppeteer) es un [headless browser](https://es.wikipedia.org/wiki/Navegador_sin_interfaz_gr%C3%A1fica) basado en Chromium, capaz de obtener el html generado por el servidor y por el javascript. En este ejemplo usaremos puppeteer.

Lo segundo será una librería para parsear el html que devuelva el sitio web. Para este ejemplo usaremos [jsdom](https://www.npmjs.com/package/jsdom).

## Extrayendo el título de los resultados orgánicos de google

En este sencillo ejemplo buscaremos en google resultados de [libros de web scraping](https://www.google.com/search?q=web+scraping+libros) y mostraremos los títulos por consola.

Dentro de un directorio iniciamos un proyecto npm el comando con `npm init --yes`. Luego instalamos nuestras dependencias con el comando `npm install --save puppeteer jsdom`. Con esto tenemos lo necesario para crear nuestro primer scraper. ¡Vamos al código!

Creamos un archivo llamado `google-scraper.js` y dentro escribimos el siguiente código. 

``` javascript{numberLines: true}
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

(async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto('https://www.google.com/search?q=web+scraping+libros');
    const body = await response.text();

    // Creamos una instancia del resultado de puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);

    // Seleccionamos los titulos y lo mostramos en consola
    document.querySelectorAll('.g h3')
      .forEach(element => console.log(element.textContent));

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
```

Si sabes javascript y entiendes cómo funcionan las promesas con `async` y `await` no deberias tener ningun problema para entender el código. De todas formas te dejo una breve explicación para que entiendas el proceso por líneas. Solo explicaré las líneas que pertenecen a la funcionalidad del ejemplo.

- `7, 8, 9 y 10` creo una instancia de puppeteer. Este abre el navegador chromium en segundo plano, accede a la url y el resultado html lo asigna a la constante `body`.

- `13` crea una instancia del jsdom a partir del resultado de `body`. Al crear la instancia podrás manipular el [DOM](https://es.wikipedia.org/wiki/Document_Object_Model) de la misma forma que puedes hacerlo con javascript en el navegador.

- `16` es la clave de todo. Usando el método `document.querySelectorAll('.g h3')` puedes acceder a los títulos de los resultados orgánicos que muestra google en la página. Google muestra sus títulos en una etiqueta `<h3>` que esta dentro una etiqueta `<div class="g">` con una clase `g` que hace referencia al bloque de los resultados orgánicos. Esto lo puedes comprobar si exploras el html usando el inspector de google chrome u otra herramienta similar si estas en otro navegador. En este enlace puedes saber mas como funciona el método [document.querySelectorAll()](https://developer.mozilla.org/es/docs/Web/API/Document/querySelector)

- `17`. Del resultado obtenido por `document.querySelectorAll('.g h3')` itero sobre los elemento e imprimes el resultado en consola. Usando la propiedad `element.textContent` muestra el texto dentro de la etiqueta `<h3>`.

- `20` cierra la instancia creada con puppeteer para liberar la memoria ya que esto es un navegador ejecutado en segundo plano.

Una vez terminado, ejecutamos el comando `node google-scraper.js` para ejecutar el scraper. Si todo sale correcto, debería mostrar un listado de todos los títulos de los resultados orgánicos de [libros de web scraping](https://www.google.com/search?q=web+scraping+libros) en la primera página de google.

Espero que este artículo te ayudara a entender que es el web scraping y como funciona con un ejemplo en javascript y nodejs. Con este punto de partida ya puedes seguir estudiando sobre esta poderosa técnica. Cuando tengas dominio de ella puedes usarla para solucionar algunos de tus problemas como desarrollador de aplicaciones web donde puedas aplicar web scraping.