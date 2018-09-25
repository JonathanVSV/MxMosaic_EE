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
  width: 25px;
  height: 25px;
  background-size: 25px 25px;
  position: absolute;
  bottom: 20px;
  left: 10px;
}
</style>
Tutorial uso rutina GEE para hacer mosaicos
===========================================

Pantalla de inicio
------------------

Elementos básicos son: - Pantalla de rutinas - Pantalla de repositorios
- Inspector, Consola, Trabajos - Mapa

<img src="Img/1.png" width="1000px" />

Correr la rutina
----------------

Irse al ícono de polígono.

<img src="Img/2.png" width="1000px" />

Aparece el siguiente menú.
<img src="Img/3.png" width="1000px" />

Dar click en "new layer"
<img src="Img/4.png" width="1000px" /> y aparece geometría nueva (p.ej. 2).

<img src="Img/5.png" width="1000px" />

Apagar la capa de arriba (flechita de la izquierda).

<img src="Img/6.png" width="1000px" />

<img src="Img/7.png" width="1000px" />

Ir a la pantalla del mapa. <img src="Img/8.png" width="1000px" />

Dar click sobre el área de interés. Aparece un punto blanco.

<img src="Img/9.png" width="1000px" />

Mover el cursor para delimitar el área de interés.
<img src="Img/10.png" width="1000px" />

Dar click en otro vértice. <img src="Img/11.png" width="1000px" />

Continuar con el mismo procedimiento colocando vértices.
<img src="Img/12.png" width="1000px" />

Continuar colocando vertices. <img src="Img/13.png" width="1000px" />

Hasta cerrar la figura y que aparezca el relleno con color.
<img src="Img/14.png" width="1000px" />

Notar que en la parte superior de la pantalla de rutinas, aparece la
variable geometry2. Está localizada en la parte inferior de la pantalla
de definición de variables. <img src="Img/15.png" width="1000px" />

Dar click en el nombre (en morado) y da la opción de renombrar la
variable a como uno quiera. En este caso dejaré el nombre igual, como
geometry2.

<img src="Img/16.png" width="1000px" />

A continuación, en la parte de la rutina se busca la variable polygon =
areaInteres.

<img src="Img/17.png" width="1000px" />

Se cambia areaInteres por el nombre del polígono que dibujó el usuario,
es decir, geometry 2.

<img src="Img/18.png" width="1000px" />

De esta manera queda así. A continuación le damos click en Run.

<img src="Img/19.png" width="1000px" />

Durante el proceso en la pantalla del mapa en la esquina superior
derecha se verán barritas cargando.

<img src="Img/20.png" width="1000px" />

Una vez cargadas las barras grises aparece la imagen dentro del área de
interés.

<img src="Img/22.png" width="1000px" />

Se hace zoom al área de interés con el scroll del mouse o utilizando los
botones de + y - de la pantalla del mapa en la esquina superior izquierda.

<img src="Img/23.png" width="1000px" />

<img src="Img/24.png" width="1000px" />

Le damos click en donde dice geometry imports.

<img src="Img/25.png" width="1000px" />

Apagamos las capas que tengamos activadas (dar click en la felchita del
lado izquierdo).

<img src="Img/26.png" width="1000px" />

Podemos ver el mosaico.

<img src="Img/26.png" width="1000px" />

Inspeccionar valores de pixeles
-------------------------------

En la pantalla superior derecha podemos inspeccionar el valor de los
pixeles en el mapa. Dar click en la pestaña Inspector.

<img src="Img/28.png" width="1000px" />

Se debería ver así.

<img src="Img/29.png" width="1000px" />

Ir al mapa.

<img src="Img/30.png" width="1000px" />

Dar clck en alguna región donde haya información de algún pixel.

<img src="Img/31.png" width="1000px" />

Aparece el valor del pixel en las bandas.
<img src="Img/32.png" width="1000px" />

Si se da click en otra área se actualizan los valores.
<img src="Img/33.png" width="1000px" />

Exportar resultados
-------------------

Ir a la pestaña de Tasks (marcada en naranja) y darle click.

<img src="Img/33.png" width="1000px" />

Aparece esta pantalla, dar click en Run.
<img src="Img/34.png" width="1000px" />

Aparece la siguiente pantalla con la información del archivo a guardar
en tu Google Drive, nombre del trabajo, tamaño de pixel, folder donde lo
va a guardar y nombre del archivo.
<img src="Img/35.png" width="1000px" />

Dar click en Run. <img src="Img/36.png" width="1000px" />

Aparece un engranito al lado del trabajo que se corrió. Dar click en Run.
<img src="Img/38.png" width="1000px" />

Esperar hasta que aparezca una palominta en donde se ve el engrane y
aparecerá en tu drive la imagen descargada.

Parámetros del código
-------------------

carpeta: Corresponde al nombre de la carpeta en donde deseas guardar la imagen creada en tu google drive.

nombreImag: Nombre del archivo de la imagen que se va a guardar

polygon: Corresponde al polígono del área de interés

maxCCL: Corresponde al porcentaje máximo de nubosidad deseado en una imagen para incluirla en la creación del mosaico anual.

y1: Año inicial del periodo de análisis

m1: Mes y día inicial del periodo de análisis

y2: Año final del periodo de análisis

m2: Mes y día final del periodo de análisis

yTot: Un término calculado automáticamente que contiene el total de años a analizar.

allSensors: Término para elegir si se quieren utilizar todos los sensores Landsat o únicamente alguno de ellos.

funcion: Variable para elegir la función con la cual se va a construir el mosaico. Hay 6 opciones: media, moda, mediana, máximo, mínimo y media por intervalo. En caso de elegir esta última, se pueden indicar los percentiles inferior y superior con lo que se desea calcular la media. 