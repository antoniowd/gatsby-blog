---
title: Como eliminar duplicados de un array en PHP.
date: 2020-05-15
slug: /articulo/como-eliminar-duplicados-en-un-array-usando-php
image: ./image.jpeg
altImage: Imagen de ubuntu mate
keywords: 
 - PHP
 - Javascript
 - Node.js
---
![Hopper the rabbiy](./image.jpeg)

Aunque PHP tiene ya una función llamada `array_unique` para eliminar duplicados en un array, esta no funciona correctamente en algunos casos. Cuando se trata de eliminar duplicados de un array multidimensional o un array de objetos, `array_unique` deja de ser útil. En este post creare una función que me permita eliminar duplicados de un array sin importar si es un array simple, multidimensional o de objetos.

## Primero un poco de teoría

Casi todas las operaciones que tienen que ver con un array requieren una iteración sobre este. Para esta iteración usare `array_reduce` que permite reducir un array en un único valor (incluso otro array). Cuando se trata de transformar un array en otro valor no creo que hay mejor función a usar que `array_reduce`.

Teniendo el `array_reduce` como función para transformar el array en su versión final sin duplicados, ahora, necesitamos crear la parte en donde buscamos y comparamos si hay duplicidad. Para lograrlo tenemos la función `array_filter`, la cual hace una búsqueda y te devuelve un nuevo array aplicando un criterio de filtrado que definas.

Con estas dos funciones propias del php y otra que veremos más adelante ya podremos crear nuestra propia función para eliminar duplicados de un array sin importar su tipo.

## Lo que a todos nos gusta. ¡La práctica!

Empecemos con una primera versión para explicar la base, de ahí seguiremos agregando funcionalidad hasta llegar a la versión final.

```php
function eliminarDuplicados($array) {
  return array_reduce(
    $array,
    fn($acumulador, $valor) => array_merge(
      array_filter($acumulador, fn($item) => $item !== $valor),
      [$valor]
    ),
    []
  );
}
```

¡Paremos aquí un momento! Primero es necesario saber que hace esta función. Importante, estoy usando una de las nuevas características incluidas en php 7.4, que es el uso de funciones flecha (arrow functions). El uso de funciones flechas ahorra mucho código, aunque sigue siendo perfectamente válido hacerlo con las funciones anónimas normales, por lo que puede adaptarse y funcionar en versiones anteriores de php.

Usando el `array_reduce` voy creando mi resultado acumulado ($acumulador) del array pasado como parámetro (`$array`). En cada iteración tengo ese resultado acumulado junto con el elemento actual del array (`$valor`); aquí es donde aplico el `array_filter`. El `array_filter` lo que hace es devolverme todos los elementos que son diferentes al elemento actual del array ($item !== $valor), a esto le llamaremos el criterio de filtro, ya que lo usaremos más adelante para extender la funcionalidad de `eliminarDuplicados()`. Llegados a este punto, tengo mi resultado acumulado sin ningún elemento igual al elemento actual del array, es decir, que en $acumulado no tengo ningún elemento igual a $valor. Ahora, uso `array_merge` para agregar $valor al $acumulado; Si se fijan, paso $valor como segundo parámetro en `array_merge` convertido en un `array ([$valor]` o `array($valor)`). Al terminar la iteración de array_reduce tendré en $acumulado todos los elementos únicos del array pasado como parámetro en `eliminarDuplicados($array)`.

## Definiendo el criterio del filtro

Llegados a este punto tenemos una versión de `eliminarDuplicados()` muy parecida a `array_unique`. La principal diferencia es que `array_unique` mantiene el primer elemento y elimina los siguientes duplicado, y `eliminarDuplicados()` mantiene el último elemento eliminando los primeros.

Hasta ahora el criterio del filtro (`$item !== $valor`) solo compara el valor en duro, aún no determina si se trata de un objeto o array multidimensional. Tanto un array de objetos o multidimensional, su valor puede ser accedido mediante sus keys, por lo que agregaremos un segundo parámetro en `eliminarDuplicados()` para definir que key usaremos para el criterio del filtro.

```php
function eliminarDuplicados($array, $key = '') {
  return array_reduce(
    $array,
    fn($acumulador, $valor) => array_merge(
      array_filter($acumulador, fn($item) => getValor($item, $key) !== getValor($valor, $key)),
      [$valor]
    ),
    []
  );
}
```

Aquí agregamos una nueva función `getValor($item, $key)` para determinar el tipo del elemento (objeto, array o simple) y devolvemos su respectivo valor según su key.

```php
// Devuelvo el valor según su tipo
function getValor($valor, $key = null)
{
  switch (gettype($valor)) {
    case 'object':
      return $valor->{$key};
    case 'array':
      return $valor[$key];
    default:
      return $valor;
  }
}
```

Ahora si tenemos una función que nos permite eliminar duplicados de un array sin importar su tipo. Ya da para usar pero todavía podemos mejorar su funcionamiento.

## Extendiendo el funcionamiento

Si queremos una solución más completa, digamos que quisiera que el criterio de filtro aceptara más de una key en el caso de un array de objetos o multidimensional, o definir el nivel de comparación ( != o !== ). Para esto, les dejo el código completo de `eliminarDuplicados()`.
