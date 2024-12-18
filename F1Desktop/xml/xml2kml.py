# 02010-XPath.py
# # -*- coding: utf-8 -*-
""""
Volcado de datos de coordenadas de .xml

@version 1 28/10/2024
@author: Laura Labrada Campos
"""

import xml.etree.ElementTree as ET

def xPathaCoordenadas():
    xpathTramos = "*//{http://www.uniovi.es}coordenadas"
    xpathInicial = "{http://www.uniovi.es}coordenadas"
    archivoXML = "circuitoEsquema.xml"

    coordenada=""
    coordenadas = []

    try:
        
        arbol = ET.parse(archivoXML)
        
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        return []
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        return []
       
    raiz = arbol.getroot()
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(xpathInicial): # Expresión XPath para sacar las coordenadas iniciales a un string
        coordenada = hijo.attrib["longitud"]+","+ hijo.attrib["latitud"]+","+ hijo.attrib["altitud"]+'\n'
        coordenadas.append(coordenada)
    for hijo in raiz.findall(xpathTramos): # Expresión XPath para sacar las coordenadas de los tramos a un string
        coordenada = hijo.attrib["longitud"]+","+ hijo.attrib["latitud"]+","+ hijo.attrib["altitud"]+'\n'
        coordenadas.append(coordenada)
    return coordenadas 


def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")


def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

def main():
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.kml) = ")

    try:
        salida = open(nombreSalida + ".kml",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()


    # Escribe la cabecera del archivo de salida
    prologoKML(salida,nombreSalida)

    # Lectura de datos de xml a kml
    coordenadas =xPathaCoordenadas()
    for i in range(len(coordenadas)):
        salida.write(coordenadas[i])

    
    # Escribe el epilogo del archivo de salida
    epilogoKML(salida)
    salida.close()

   

 
if __name__ == "__main__":
    main()    

