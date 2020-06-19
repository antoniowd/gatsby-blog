---
title: "5 aplicaciones web para practicar tus habilidades"
date: 2020-06-19
slug: /articulo/aplicaciones-web-para-practicar-tus-habilidades
image: ./image.jpg
altImage: Una persona trabajando en la computadora
keywords: 
 - Desarrollo web
 - Web scraping
 - API REST
---
![Una persona trabajando en la computadora](./image.jpg)

El truco para dominar lo aprendido en la programación de aplicaciones web es la practica. Un desarrollador web gasta más tiempo leyendo documentación o estudiando un tema en concreto, que escribiendo código. Después de consumir tanta información, para consolidar ese conocimiento, es necesario practicar creando proyectos web reales o haciendo ejercicios prácticos.

En este artículo te recomiendo 5 proyectos web con los que puedes practicar tus conocimientos como desarrollador web. Cada proyecto aborda un problema específico a resolver. Estos problemas, a mi entender, son unos de los más comunes en el desarrollo web.

## 1. Crea tu propia API REST de direcciones de tu país

Las API REST son el sistema de comunicación más  común entre los servicios de internet. En un proyecto web de una forma u otra, tendrás que interactuar con una API. Un proyecto interesante para practicar tus habilidades como desarrollador web sería crear una API para consultar direcciones de un determinado país, y esta consulta te devuelva la información de la ubicación encontrada.

La idea principal de este proyecto es crear una API REST que permita buscar una determinada ubicación pasando como parámetro el código postal. Puede ser una API pública pero también puedes agregar un sistema de autenticación usando web tokens.

Existe cantidad de documentación y tutoriales de como crear tu propia API REST en infinidades de frameworks y lenguajes de programación. Si dominas los fundamentos básicos de la tecnología que estás usando, te será facil crear una API REST.

**Recursos y ejemplos:**

- [Que es una API REST](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional)
- [Ejemplo de Perú](https://github.com/jmcastagnetto/ubigeo-peru)
- [Ejemplo de Argentina](https://github.com/jcodagnone/localidades-ar)
- [Ejemplo de México](https://github.com/acrogenesis/API-Codigos-Postales)
- [Ejemplo de España](https://github.com/inigoflores/ds-codigos-postales-ine-es)

## 2. Aplicación para encontrar la mejor imagen

Esta aplicación se basa en mostrar dos imágenes al usuario, y este debe seleccionar la que más le gusta. Tienes un grupo de imágenes y vas presentando estas imágenes en pares aleatorios al usuario. Cuando el usuario selecciona la imagen que le gusta, guardas ese “me gusta” asociado a la imagen.

Puedes crear una sección donde se muestre la cantidad de “me gusta” de las imágenes, desde la más a la menos popular. El objetivo de esta aplicación es crear un sistema de votación de imágenes y así encontrar la imagen que más gusta a determinado grupo de usuarios.

**Recursos y ejemplos:**

- [API pública de imágenes](https://picsum.photos/)
- [Ejemplo](https://codepen.io/FlorinPop17/full/rNBRYKZ)

## 3. Clonando la aplicación de Instagram

Que mejor proyecto web para practicar que clonar uno existente. Crear una copia de [Instragram](https://www.instagram.com/) es un proyecto que cubre muchas de las funcionalidades más importante a dominar en el desarrollo web. Algunas de estas funcionalidades son registro, autenticación y autorización de usuarios, publicación de posts, seguir a otros usuarios para ver los posts que ellos publican. Para realizarlo es necesario tener conocimientos de frontend, backend y base de datos.

Haz un análisis con las funcionalidades mínimas que quieres copiar de [Instagram](https://www.instagram.com/). Esto te dará una idea de como ir creando un sistema complejo partiendo de una base sencilla y funcional. Una vez tengas la aplicación básica funcionando puedes optar por seguir copiando el Instragram o agregar tus propias ideas creando una red social con un enfoque diferente y apuntando a un público específico.

Te dejo un minicurso de como puedes crear esta aplicación: [Cómo crear una aplicación web como Instagram](https://www.youtube.com/watch?v=M76SUpBf_3o)

## 4. Simulador de un elevador

Una excelente forma para practicar tus habilidades de HTML, CSS y JavaScript es creando un simulador de un elevador. El objetivo y reto principal de esta aplicación es la de manejar los eventos cuando una persona solicite el elevador en un determinado piso. La aplicación debe simular a varias personas solicitando el elevador en diferentes pisos y el elevador debe responder a las solicitudes, según su orden, y teniendo en cuenta que si pasa por un piso solicitado (no cumpliendo el orden de solicitud) debe parar en ese piso.

Basta con hacer una simulación sencilla que solo responda las solicitudes, pero puedes agregarle más funcionalidades; como transportar a las personas, donde estas, dicen a que piso quieren ir. Incluso, también podrías limitar la cantidad de personas, teniendo en cuenta la capacidad máxima establecida en el elevador. Este [ejemplo](https://codepen.io/nibalAn/pen/prWdjq) es un buen punto de partida para comenzar.

## 5. Sitio web sobre reseñas de películas

Encuentra la próxima película que quieres ver o haz una lista de favoritas, creando un sitio sobre reseñas de películas. En la página inicial puedes tener un listado de las últimas películas organizadas por fecha, agregar filtros básicos y un buscar. Al dar click en una película del listado te debe mostrar el detalle de esa película; aquí puedes agregar la reseña, sinopsis, actores, fotos, o cualquier otra información relevante que necesites agregar.

Para obtener la información de las películas puedes usar una API especializada en el tema. Puedes consultarla directamente o crear una base de datos y alimentarla a partir de la API. Existen varias API con las que puedes hacer esto, [themoviedb.org](https://www.themoviedb.org/documentation/api) es una de las mejores que he visto.

Estos dos ejemplos pueden servirte de apoyo:

- [Movie Database App w/ React by Oliver Gomes](http://phobic-heat.surge.sh/)
- [Movie Browser App w/ React&Redux&Bootstrap by Nataliia Pylypenko](https://api-cinema-10d15.firebaseapp.com/)

Otra funcionalidad que puedes agregar es la de implementar un sistema de comentario, donde los usuarios puedan dar su opinión sobre determinada película. Para hacer esto tienes dos opciones, la primera es implementarlo de forma programada por ti y la segunda es usando un servicio especializado para dicha tarea, como [disqus](https://disqus.com/).

## Crea un web scraper para automatizar una tarea en la web (Bono)

Como bono adicional y si te interesa el mundo del web scraping, puedes crear un scraper o bot que te ayude a realizar alguna tarea en la web que sueles hacer con regularidad. Aquí te dejo algunos ejemplos que podrías considerar hacer.

- Crear un monitor de precio para rastrear determinado artículo que quieras comprar.
- Un bot de Twitter que de “me gusta” a las respuestas de tus tweets.
- Un web crawler o web spider que busque correos y/o teléfonos en un sitio web.

No sabes que es el web scraping, ni por donde empezar. Tengo un artículo donde explico [cómo hacer web scraping con javascript y nodejs](/articulo/como-hacer-web-scraping-con-javascript-y-nodejs). Es una introducción al web scraping y viene con un ejemplo sencillo que puedes hacer.

## Nunca olvides esto cuando aprendes desarrollo web

> *El que aprende y aprende y no practica lo que sabe, es como el que ara y ara y no siembra. Platón*

Sigue aprendiendo y sigue practicando, porque es la única manera de dominar el desarrollo web. Esto aplica para todos, no importa si eres un principiante o un profesional con muchos años de experiencia. ¡Éxitos a todos!
