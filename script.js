var l8sr = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    l7sr = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    l5sr = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    l4sr = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR"),
    areaInteres = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-96.24598119041548, 15.204507739741874],
          [-92.18103978416548, 15.501146831330118],
          [-92.04920384666548, 19.23318799521662],
          [-96.48768040916548, 19.15018198097653]]]),
    table = ee.FeatureCollection("users/JonathanVSV/CuencaMex");

//----------------------------------------------------------------------------
//Definición de constantes del usuario
  //Carpeta corresponde al nombre de la carpeta en tu google drive
  //donde va a guardar la imagen
  var carpeta = 'MosaicoMx',
  //Definir el nombre con el que se va a guardar la imagen
      nombreImag = 'MosaicoLandsat',
  //Polygon define el área de interés 
      polygon = table,
  //Máxima de cobertura de nubes sobre superficie terrestre deseada
      maxCCL = 70,
  //Fecha de interés
    //Año inicial
      y1 = 2015,
    //Mes-día inicial
      m1 = '-01-01',
    //Año final
      y2 = 2016,
    //Mes día final,
      m2 = '-12-31',
    //Total de años, útil para realizar la misma consulta en diversos años
      yTot = y2-y1,
  //Poner 1 si se desean utilizar todos los sensores, sino
  //poner el número del sensor landsat, es decir, 4, 5, 7 u 8.
      allSensors = 1,
  //Elegir la función para crear el mosaico
    //1: media
    //2: moda
    //3: mediana
    //4: máx
    //5: min
    //6: media por intervalo
      funcion = 3,
        //Para opción 6
        //Percentiles inferior y superior para construir la imagen promedio
        infPerc = 0,
        supPerc = 33;
  
//------------------------------------------------------------------------------
//Definición de funciones
//Esta función permite renombrar las bandas a abreviaturas más fáciles de 
// interpretar
  var renameFunc = function(image) {
          return image
            .rename('B','G','R','NIR','SWIR1','SWIR2');
          };
  
//Esta función va a seleccionar las 6 bandas de interés, filtrar por fecha,
// y enmascarar para cada banda las cateogr´ías que no son de inter´és.
var filterImCol = function(imageCol,sensor,maxCCL,dateInicial,dateFinal,agua){
    //Definir variables
    var bandas = [],
        fMask = ee.Image().byte(),
        cloudMask = ee.Image().byte(),
        maskClouds = function(){};
    
    if(sensor == 8){
      bandas = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
      
      // Esta función enmascara todo lo que no sea de la categoría: land o water
      // en la banda pixel_qa
      maskClouds = function(image) {
        fMask = image.select('pixel_qa');
        var cloudMask = fMask.eq(322)
                            .or(fMask.eq(324));
        return image.updateMask(cloudMask);
      };
      
    }else{
      bandas = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'];
      
      // Esta función enmascara todo lo que no sea de la categoría: land o water
      // en la banda pixel_qa
      maskClouds = function(image) {
        fMask = image.select('pixel_qa');
        var cloudMask = fMask.eq(66)
                            .or(fMask.eq(68));

        return image.updateMask(cloudMask);
      };
    }
    
    var temp = imageCol 
          //Filtrar por fecha
          .filterDate(dateInicial,dateFinal)
          //Filtrar por área de interés
          .filterBounds(polygon)
          //Filtrar por nubosidad
          .filter(ee.Filter.lte('CLOUD_COVER_LAND',maxCCL))
          //Enmascarar nubes
          .map(maskClouds)
          //Seleccionar las 6 bandas de interes
          .select(bandas);
    
    return temp.map(renameFunc);
  };

//---------------------------------------------------------------
//Esto ya es el correr las funciones anteriores en un ciclo
  var year = y1;
  //Fechas, crea un string de la fecha
  var dateInicial = y1.toString() + m1;
  var dateFinal = y2.toString() + m2;
  
  //Filtro de colecciones
  //Filtro Landsat 4
  var l4srAll = filterImCol(l4sr,4,maxCCL,dateInicial,dateFinal);
  //Filtro Landsat 5
  var l5srAll = filterImCol(l5sr,5,maxCCL,dateInicial,dateFinal);
  //Filtro Landsat 7
  var l7srAll = filterImCol(l7sr,7,maxCCL,dateInicial,dateFinal);
  //Filtro Landsat 8
  var l8srAll = filterImCol(l8sr,8,maxCCL,dateInicial,dateFinal);
  
  //Une todas las colecciones según su fecha o elige
  //sólo las imagenes de un sensor
  var lSrAll = ee.ImageCollection.fromImages(ee.Image().byte());
  if (allSensors == 1){
    if(year<1984){
      lSrAll = l4srAll;
    }else{
        if(year>=1984 & year<=1993){
            lSrAll = l4srAll.merge(l5srAll);
          }else{
              if(year>1993 & year<1999){
                  lSrAll = l5srAll;
                }else{
                    if(year>=1999 & year <=2012){
                        lSrAll = l5srAll.merge(l7srAll);
                      }else{
                        if(year>=2013){
                            lSrAll = l7srAll.merge(l8srAll);
                          }else{
                              print("año inválido: "+year);
                          }
                    }
                }
          }
    }
  }else{
      if (allSensors == 4){
        lSrAll = l4srAll;
      }else{
          if (allSensors == 5){
            lSrAll = l5srAll;
          }else{
              if (allSensors == 7){
                lSrAll = l7srAll;
              }else{
                  if (allSensors == 8){
                    lSrAll = l8srAll;
                  }else{
                      print("Opción de sensor no valida: " + allSensors);
                  }
              }
          }
      }
  }
  
  //Algoritmo a utilizar para reducir la imagen
  var annualM = ee.ImageCollection.fromImages(ee.Image().byte());
  var bandas = [];
  //1: media
    //2: moda
    //3: mediana
    //4: máx
    //5: min
    //6: media por intervalo
    
  //Para elegir el algoritmo para reducir la imagen
  if (funcion == 1){
    bandas = ['B_mean','G_mean','R_mean'];
    annualM = ee.ImageCollection(lSrAll)
                    .reduce(ee.Reducer.mean());
  }else{
      if (funcion == 2){
        bandas = ['B_mode','G_mode','R_mode'];
        annualM = ee.ImageCollection(lSrAll)
                        .reduce(ee.Reducer.mode());
      }else{
          if (funcion == 3){
            bandas = ['B_median','G_median','R_median'];
            annualM = ee.ImageCollection(lSrAll)
                            .reduce(ee.Reducer.median());
          }else{
              if (funcion == 4){
                bandas = ['B_max','G_max','R_max'];
                annualM = ee.ImageCollection(lSrAll)
                                .reduce(ee.Reducer.max());
              }else{
                  if (funcion == 5){
                    bandas = ['B_min','G_min','R_min'];
                    annualM = ee.ImageCollection(lSrAll)
                                    .reduce(ee.Reducer.min());
                  }else{
                      if (funcion == 6){
                          bandas = ['B_mean','G_mean','R_mean'];
                          annualM = ee.ImageCollection(lSrAll)
                                        .reduce(ee.Reducer.intervalMean(infPerc,supPerc));
                        }else{
                            print("Opción de función no valida: " + funcion);
                        }
                  }
              }
          }
      }
  }
  
  //Corte de la imagen al área de interés
  annualM = annualM.clip(polygon);
  Map.addLayer(annualM, {bands: bandas,min:100,max:1200},'RGB');
  
  //Export image
  Export.image.toDrive({
              image: annualM,
              description: nombreImag+year,
              scale: 30,
              region: polygon,
              fileFormat: 'GeoTIFF',
              maxPixels: 11603978400,
              folder: carpeta
            }); 