//----------------------------------------------------------------------------
// Define image collections that are going to be used, as well as the region of interest
var l8sr = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    l7sr = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    l5sr = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    l4sr = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR"),
    areaInteres = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-96.24598119041548, 15.204507739741874],
          [-92.18103978416548, 15.501146831330118],
          [-92.04920384666548, 19.23318799521662],
          [-96.48768040916548, 19.15018198097653]]]);

//----------------------------------------------------------------------------
// User defined variables
  //Folder in your Google Drive where results are going to be exported
  var carpeta = 'MosaicoMx',
  //Name of the exported file (cloudless mosaic)
      nombreImag = 'MosaicoLandsat',
  //ROI
      polygon = table,
  //Maximum cloud cover over land of each image to be included in the mosaic construction
      maxCCL = 70,
  //Dates of interest
    //Initial year
      y1 = 2015,
    //Initial month-date
      m1 = '-01-01',
    //Final yeat
      y2 = 2016,
    //Final month-year
      m2 = '-12-31',
    //Number of years to construct annual mosacis
      yTot = y2-y1,
  //Landsat sensors that are going to be used: 
    //1: all
    //4, 5, 7, 8: Landsat 4, 5, 7, 8 respectivuely
      allSensors = 1,
  //Function used to create the annual mosaid
    //1: mean
    //2: mode
    //3: median
    //4: max
    //5: min
    //6: interval mean
      funcion = 3,
        //Only for option 6
        //lower and upper percentile used to calculate the interval mean
        infPerc = 0,
        supPerc = 33;
  
//------------------------------------------------------------------------------
//Functions
//Renaming function, changes names from B1, B2, to B, G, R, NIR, etc.
  var renameFunc = function(image) {
          return image
            .rename('B','G','R','NIR','SWIR1','SWIR2');
          };
  
//Filtering function, removes clouds from each image, select B, G, R, NIR, SWIR1 and SWIR2
//bands from each image and filter by date, ROI
var filterImCol = function(imageCol,sensor,maxCCL,dateInicial,dateFinal,agua){
    //Variables that are going to be used
    var bandas = [],
        fMask = ee.Image().byte(),
        cloudMask = ee.Image().byte(),
        maskClouds = function(){};
    
    if(sensor == 8){
      bandas = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
      
      //Uses pixel_qa band to mask every pixel that is not classified as Clear Land
      //Define maskClouds as a different functino for Landsat 4, 5, 7 and Landsat 8
      maskClouds = function(image) {
        fMask = image.select('pixel_qa');
        var cloudMask = fMask.eq(322)
                            .or(fMask.eq(324));
        return image.updateMask(cloudMask);
      };
      
    }else{
      bandas = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'];
      
      maskClouds = function(image) {
        fMask = image.select('pixel_qa');
        var cloudMask = fMask.eq(66)
                            .or(fMask.eq(68));

        return image.updateMask(cloudMask);
      };
    }
    
    var temp = imageCol 
          //filter by date
          .filterDate(dateInicial,dateFinal)
          //filter by ROI
          .filterBounds(polygon)
          //filter by cloud cover over land property
          .filter(ee.Filter.lte('CLOUD_COVER_LAND',maxCCL))
          //mask clouds of every image
          .map(maskClouds)
          //select the bands of interest
          .select(bandas);
    // return the collection and rename the bands
    return temp.map(renameFunc);
  };

//---------------------------------------------------------------
//Run the previous functions
  var year = y1;
  //Create a string of the dates
  var dateInicial = y1.toString() + m1;
  var dateFinal = y2.toString() + m2;
  
  //Filter image collections
  //Filter Landsat 4
  var l4srAll = filterImCol(l4sr,4,maxCCL,dateInicial,dateFinal);
  //Filter Landsat 5
  var l5srAll = filterImCol(l5sr,5,maxCCL,dateInicial,dateFinal);
  //Filter Landsat 7
  var l7srAll = filterImCol(l7sr,7,maxCCL,dateInicial,dateFinal);
  //Filter Landsat 8
  var l8srAll = filterImCol(l8sr,8,maxCCL,dateInicial,dateFinal);
  
  //Merge image collections
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
  
  //Select the function that is going to be used to construct the mosaic
  var annualM = ee.ImageCollection.fromImages(ee.Image().byte());
  var bandas = [];
    //1: mean
    //2: mode
    //3: median
    //4: max
    //5: min
    //6: interval_mean
    
  //Select function to construct mosaic
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
  
  //Clip image to the ROI
  annualM = annualM.clip(polygon);
  //Add layer to map
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
