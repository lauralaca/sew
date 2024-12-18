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

    coordenada={}
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
    recorrido=1
    expresionXPath = "*//{http://www.uniovi.es}coordenadas"
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(xpathInicial): # Expresión XPath para sacar las coordenadas iniciales a un string
        coordenada = "1,"+hijo.attrib["altitud"]+'\n'
        coordenadas.append(coordenada)
    for hijo in raiz.findall(xpathTramos): # Expresión XPath para sacar las coordenadas de los tramos a un string
        recorrido +=1
        coordenada = str(recorrido)+","+hijo.attrib["altitud"]+'\n'
        coordenadas.append(coordenada)
    return coordenadas 


def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write('<polyline points=\n"')


def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""
    archivo.write('"\nstyle="fill:black;stroke:red;stroke-width:1" />\n')
    archivo.write('</svg>\n')

def main():
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.svg) = ")

    try:
        salida = open(nombreSalida + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".svg")
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


