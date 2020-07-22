---
title: "Creando un web crawler para extraer información de un sitio web"
date: 2020-07-22
slug: /articulo/creando-un-web-crawler-para-extraer-informacion-de-un-sitio-web
image: ./image.jpg
altImage: Una araña en una telaraña
keywords: 
 - web scraping
 - crawler
 - got
 - jsdom
---
![Una araña en una telaraña](./image.jpg)

Un web crawler, spider o indexador web es un programa para acceder a un sitio web y recolectar determinado contenido. El crawler comienza con una lista de URL, busca los hipervínculos en esas páginas, lo agrega a su lista de URL y vuelve a buscar otros hipervínculos. Este procedimiento crea un sistema de navegación recurrente en la web y es configurado con ciertas condiciones para establecer sus reglas; como la profundidad máxima del sitio, hipervínculos internos y externos, buscar determinado patrón de URL, controlar la cantidad de conexiones simultáneas y otras ya establecidas, incluso las reglas que se te puedan ocurrir y que estén acorde al problema a resolver.

En este artículo muestro como crear un simple web crawler en Node.js para explorar un sitio web en busca de determinada información. Es un web crawler sencillo, solo la base de su funcionamiento y la aplicación de una regla de profundidad máxima del sitio.

Los web crawlers suelen ser genéricos y adaptables a cualquier sitio. En este artículo me centraré en un problema específico para crear un ejemplo práctico. ¡Empecemos!

## Lo necesario para empezar

Es necesario tener instalado Node.js y el gestor de paquetes npm o yarn. Inicializo el npm usando `npm init`. Luego instalo las dependencias de los paquetes que necesito. 

El proceso de un web crawler lo divido en dos etapas.

- Obtención:  La primera etapa es la obtención del HTML del sitio. Un web crawler se comunica con un sitio de la misma forma que un navegador web, usando peticiones HTTP. Para esto uso una librería llamada [got](https://www.npmjs.com/package/got).

- Extracción: La segunda etapa consiste en procesar el HTML obtenido y extraer la información que se necesita. La librería [jsdom](https://www.npmjs.com/package/jsdom) es una excelente opción para extraer contenido de un archivo HTML usando una forma similar a la del objeto javascript `window.document`.

`npm install got jsdom --save`

## Creando el código base del web crawler

Dentro de una carpeta llamada crawler creo un archivo de javascript `crawly.js`, y dentro, creo una clase llamada `Crawly`, donde escribo toda la lógica del web crawler. El constructor de la clase debe aceptar como parámetro un objeto con las opciones necesarias para inicializar el proceso.

```javascript:title=crawly.js-1
'use strict';
const got = require('got');
const { JSDOM } = require('jsdom');

class Crawly {
  _queue;
  _opts;

  constructor(options) {
    this._queue = []; // Inicializo la cola sin ningun elemento

    // Propago las opciones
    this._opts = {
      delay: 0,
      ...options
    };

    // Verifico que exista la funcion parser() en las opciones 
    if (!this._opts.parser || typeof this._opts.parser !== 'function') {
      throw new Error('Invalid parser() function');
    }
  }
}
```

El crawler funciona con una estructura de datos de tipo cola, la cual inicializo en el constructor y voy agregando las URL mientras navego por los archivos HTML que obtengo. El parámetro `options` acepta una función `parser()`. Esta contiene la estrategia de obtención y extracción del sitio, o los sitios web que tenemos como objetivo. También acepta un parámetro opcional `delay` para determinar el tiempo de espera en milisegundos entre peticiones.

Creo un método `addQueue()`, para cuando encuentre un hipervínculo en los archivos HTML, agregar ese hipervínculo a la cola para que sea procesado.

```javascript:title=crawly.js-2
class Crawly {

  // Codigo anterior (crawly.js-1) ...

  addQueue(url, params) {
    this._queue.push({
      url,
      params: params || {}
    });
}
```

El método `addQueue()` acepta una URL y un objeto `params`. Estas dos propiedades componen la estructura básica de mi cola de hipervínculos. La propiedad `params` es usada para procesar datos adicionales en la función `parser()` (adelante un ejemplo con su uso).

Para finalizar la implementación de la clase `Crawly` creo un método `run()`, este método es el encargado de ejecutar el web crawler, y, que empiece a obtener y extraer hipervínculos para agregar a su cola de ejecución.

```javascript:title=crawly.js-3
class Crawly {

  // Codigo anterior (crawly.js-1) ...

  // Codigo anterior (crawly.js-2) ...

  run(seed, done, params) {

    // Ejecuta la peticion del sitio y llama a parser() con los parametros necesarios
    const request = (item, next) => {
      got(item.url)
        .then((response) => {
          const jsdom = new JSDOM(response.body);
          const res = {
            response,                        // Respuesta del got
            body: response.body,             // El HTML devuelto
            document: jsdom.window.document, // Inicializacion del jsdom
            params: item.params              // Propagacion de los parametros de la url
          };

          // Llamo a la funcion parser() con los parametro correspondientes
          this._opts.parser.call(this, null, res, next);
        })
        .catch((err) => {
          // En caso de error
          this._opts.parser.call(this, err);
        });
    }

    const next = () => {
      const item = this._queue.shift();
      if (item) {
        // Si la cola tiene elementos llamo request(), esperando con el delay configurado
        setTimeout(() => request(item, next), this._opts.delay);
      } else {
        done();
      }
    }

    // Comienzo la ejecucion con la seed proporcionada
    request({
      url: seed,
      params: params || {}
    }, next);
  }
}
```

Los parámetros `seed` y `params` son usados en la llamada de `run()` para empezar la ejecución del proceso. El parámetro `done()` es una [función callback](/articulo/funcion-callback-javascript-guia-completa) que será llamada una vez termine todo el proceso de crawling.

Dentro del método `run()` existen dos funciones usadas para simplificar un poco la complejidad.

La función `request()` es la encargada de la obtención del archivo HTML usando la URL pasada en el objeto cola. Cuando obtiene la información llama a la función `parser()` (pasada en el constructor), la cual tiene el código para procesar el HTML. La función `parser()` tiene 3 parámetros, no estoy contando **this** que lo paso para el contexto de la clase dentro de `parser()`. En el primer parámetro propago el error de la petición, segundo parámetro paso un objeto con una serie de propiedades que serán dentro de `parser()`, y como tercer parámetro paso una [función callback](/articulo/funcion-callback-javascript-guia-completa) que será llamada cuando termine la ejecución de `parser()`.

La función `next()` es ejecutada cada vez que se termine el proceso de `parser()`. Esta función verifica si existe alguna URL pendiente en la cola y en caso de existir vuelve a llamar a la función `request()` para que sea procesada, teniendo en cuenta un tiempo de espera configurado con la opción `delay`. Si la cola está vacía, la función callback `done()` es llamada y terminado el proceso de crawling.

La clase `Crawly` está terminada, ahora uso un problema práctico para probar la funcionalidad del web crawler.

## Problema: Conociendo quienes siguen a quien en GitHub

Dado un determinado usuario de [GitHub](https://github.com), quiero saber a quienes sigue, y luego esas personas, a que otras personas siguen, y así sucesivamente hasta establecer una condición de parada como la cantidad máxima que se repite el proceso.

Para resolver este problema, creo un archivo `example.js`, creo una instancia de la clase `Crawly`, defino el `delay` y la implementación de la función `parser()`. Luego ejecuto el método `run()` de la instancia de mi web crawler pasando la URL del usuario de [GitHub](https://github.com) por el que quiero comenzar.

```javascript:title=example.js-1
const Crawly = require('./crawly');

const crawly = new Crawly({
  delay: 5000, // Establezco 5 segundos de espera entre peticiones
  parser: function (err, res, done) {
    const self = this;
    if (err) {
    // Capturo el error y sigo con la ejecucion del proximo elemento en la cola
      console.log(err);
      done();
    } else {

      const { document, params } = res;
      switch (params.page) {
        // Estrategia de extraccion de la pagina de perfil
        case 'profile': {
          const tabs = document.querySelectorAll('a.link-gray.no-underline.no-wrap');
          if (tabs[1]) {
            // Agrego el hipervinculo de la pagina de quien sigo
            self.addQueue(`https://github.com${tabs[1].href}`, {
              page: 'following',
              deep: params.deep
            });
          }
          break;
        }
        // Extrategia de extraccion de la paginas de quien sigo
        case 'following': {
          const followingList = document.querySelectorAll('.v-align-top.pr-3 > a > span.link-gray.pl-1') || [];
          const username = document.querySelector('.p-nickname').textContent;
          const users = [];
          followingList.forEach((item) => {
            const name = item.textContent;
            if (name) {

              users.push(name);

              // Si no he llegado a la profundidad maxima agrego la cola mas usuarios de gitgub
              if (params.deep < 2) {
                self.addQueue(`https://github.com/${name}`, {
                  page: 'profile',
                  deep: params.deep + 1
                });
              }
            }
          });

          console.log(`${username} is following these users: ${users.join(', ')}\n`);
          break;
        }
      }

      done();
    }
  }
});

// Ejecuto el crawler
crawly.run('https://github.com/antoniowd', () => {
  console.log('END');
}, {
  page: 'profile',
  deep: 0
});
```

Una vez terminado ejecuto `node example.js` y debe salir una serie de mensajes mostrando a quienes sigue un determinado usuario de [GitHub](https://github.com). La clave en mi estrategia de crawling es el uso del parámetro `params` de `addQueue()` (paso sus datos iniciales en `run()`). Con la propiedad `params.page` identifico que archivo HTML (*profile* o *following*) estoy procesando y la `propiedad.deep` determina la profundidad máxima que usaré para navegar entre usuarios hasta finalizar el proceso.

Aquí te dejo el enlace de mi [GitHub - antoniowd](https://github.com/antoniowd) donde está publicado todo el código: [Web crawler](https://github.com/antoniowd/crawly)

Y de esta manera creo un simple web crawler para explorar un sitio web. Espero que este artículo y código te sirva como base o idea general de como implementar tu propia solución o usar una ya existente. No olvides que un web crawler dada su naturaleza, puede ir en contra de los términos legales y el modo de usar la información de algunos sitios web. Sugiero informarte bien sobre este tema antes de empezar a realizar tus programas de web scraping.
