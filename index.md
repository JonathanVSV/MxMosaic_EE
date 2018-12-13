<style type="text/css">

body{ /* Normal  */
      font-size: 28px;
      color: #606060;
  }
ul{ /* Bullet  */
      font-size: 28px;
      color: #606060;
  }
td {  /* Table  */
  font-size: 28px;
  color: #505050;
}
h1.title {
  font-size: 44px;
  color: #404040;
}
h1 { /* Header 1 */
  font-size: 44px;
  color: #404040;
}
h2 { /* Header 2 */
    font-size: 40px;
    color: #404040;
}
h3 { /* Header 3 */
  font-size: 36px;
  color: #404040;
}
code.r{ /* Code block */
    font-size: 22px;
    color: #606060;
}
pre { /* Code block - determines code spacing between lines */
    font-size: 22px;
    color: #606060;
}
slides > slide:not(.nobackground):before {
  width: 35px;
  height: 25px;
  background-size: 35px 25px;
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
Tutorial uso rutina GEE para hacer mosaicos
===========================================

Pantalla de inicio
------------------

Elementos básicos son: - Pantalla de rutinas - Pantalla de repositorios
- Inspector, Consola, Trabajos - Mapa

<img src="Img/1.png" width="2560" />

Abrir el código
---------------

Dentro de la pantalla de repositorios irse a la sección "Reader" y
seleccionar MX\_6B\_Mosaic. Dar click y debería aparecer lo siguiente:

<img src="Img/0.png" width="1369" />

Correr la rutina
----------------

Irse al ícono de polígono

<img src="Img/2.png" width="2560" />

Aparece el siguiente menú <img src="Img/3.png" width="1200px" />

Dar click en new layer <img src="Img/4.png" width="1200px" /> y aparece
geometría nueva (p.ej. 2)

<img src="Img/5.png" width="1200px" />

Apagar la capa de arriba (flechita de la izquierda)

<img src="Img/6.png" width="1200px" />

<img src="Img/7.png" width="1200px" />

Ir a la pantalla del mapa <img src="Img/8.png" width="1200px" />

Dar click sobre el área de interés, aparece un punto blanco

<img src="Img/9.png" width="1200px" />

Mover el cursos para delimitar el área de interés
<img src="Img/10.png" width="1200px" />

Dar click en otro vértice <img src="Img/11.png" width="1200px" />

Continuar con el mismo procedimiento colocando vértices
<img src="Img/12.png" width="1200px" />

Continuar colocando vértices <img src="Img/13.png" width="1200px" />

Hasta cerrar la figura y que aparezca el relleno con color
<img src="Img/14.png" width="1200px" />

Notar que en la parte superior de la pantalla de rutinas, aparece la
variable geometry2 Está localizada en la parte inferior de la pantalla
de definición de variables <img src="Img/15.png" width="1200px" />

Dar click en el nombre (en morado) y da la opción de renombrar la
variable a como uno quiera. En este caso dejaré el nombre igual, como
geometry2

<img src="Img/16.png" width="1200px" />

A continuación, en la parte de la rutina se busca la variable polygon =
areaInteres.

<img src="Img/17.png" width="1200px" />

Se cambia areaInteres por el nombre del polígono que dibujó el usuario,
es decir, geometry 2.

<img src="Img/18.png" width="1200px" />

De esta manera queda así. A continuación le damos click en Run

<img src="Img/19.png" width="1200px" />

Durante el proceso en la pantalla del mapa en la esquina superior
derecha se verán barritas cargando.

<img src="Img/20.png" width="1200px" />

Una vez cargadas las barras grises aparece la imagen dentro del área de
interés

<img src="Img/22.png" width="1200px" />

Se hace zoom al área de interés con el scroll del mouse o utilizando los
botones de + y - de la pantalla del mapa en la esquina superior
izquierda.

<img src="Img/23.png" width="1200px" />

<img src="Img/24.png" width="1200px" />

Le damos click en donde dice geometry imports

<img src="Img/25.png" width="1200px" />

Apagamos las capas que tengamos activadas (dar click en la felchita del
lado izquierdo).

<img src="Img/26.png" width="1200px" />

Podemos ver el mosaico

<img src="Img/26.png" width="1200px" />

Inspeccionar valores de pixeles
-------------------------------

En la pantalla superior derecha podemos inspeccionar el valor de los
pixeles en el mapa. Dar click en la pestaña Inspector

<img src="Img/28.png" width="1200px" />

Se debería ver así

<img src="Img/29.png" width="1200px" />

Ir al mapa

<img src="Img/30.png" width="1200px" />

Dar clck en alguna región donde haya información de algún pixel

<img src="Img/31.png" width="1200px" />

Aparece el valor del pixel en las bandas
<img src="Img/32.png" width="1200px" />

Si se da click en otra área se actualizan los valores
<img src="Img/33.png" width="1200px" />

Exportar resultados
-------------------

Ir a la pestaña de Tasks (marcada en naranja) y darle click

<img src="Img/33.png" width="1200px" />

Aparece esta pantalla, dar click en Run
<img src="Img/34.png" width="1200px" />

Aparece la siguiente pantalla con la información del archivo a guardar
en tu Google Drive, nombre del trabajo, tamaño de pixel, folder donde lo
va a guardar y nombre del archivo
<img src="Img/35.png" width="1200px" />

Dar click en Run <img src="Img/36.png" width="1200px" />

Aparece un engranito al lado del trabajo que se corrió Dar click en Run
<img src="Img/38.png" width="1200px" />

Esperar hasta que aparezca una palominta en donde se ve el engrane y
aparecerá en tu drive la imagen descargada.

En caso de que durante alguno de los procesos ocurra un error, éste será
indicado en la pestaña de la consola. Se recomienda leer la sección de
Debugging de la plataforma, disponible en la siguiente liga:
<https://developers.google.com/earth-engine/debugging>

Algunos de los errores más comunes incluyen: 
1. La falta de definición
de los nombres de todas las variables (var). 
2. Sobrepasar el límite por
default de pixeles a descargar. 
3. No poseer de suficiente espacio en el
Google Drive personal. 
4. La falta de ; al final de cada comando. 
5.
Errores ortográficos. 
6. Sobrepasar el límite de procesamiento.a 
7.
Sobrepasar el límite de procesamiento.b

Las soluciones a cada uno de estos problemas son los siguientes: 
1.
Revisar que todas las variables hayan sido declaradas con la función
var. 
2. En la línea final de exportación de la imagen cambiar el valor
de maxPixels. 
3. Borrar archivos que no se utilicen en el Google Drive.
4. Revisar que todos los comandos finalicen con ;. 
5. Revisar los
nombres de las variables y funciones (cuidando mayúsculas y minúsculas).
6. Cuando ocurre esto normalmente se debe a que se quiere visualizar el
resultado de un procesamiento tardado. La solución sencilla es no
visualizar el resultado en el visualizador de la plataforma, sino sólo
descargarlo. Google Earth Engine permite una mayor capacidad de
procesamiento cuando se exportan los resultados que cuando se quiere
visualizarlos. 
7. A veces se puede sobrepasar el límite de procesamiento
por utilizar códigos redundantes. Este tipo de errores se pueden
solucionar leyendo cuál es el método más apropiado para la función que
el usuario desea realizar.
