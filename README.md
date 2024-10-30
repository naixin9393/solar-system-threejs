# **Sistema solar**

Sistema solar hecho con la librería THREE.js

![Overview](/public/assets/doc/overview.png)

[Vídeo demo](https://alumnosulpgc-my.sharepoint.com/:v:/g/personal/naixin_chen101_alu_ulpgc_es/EUbw5NCZGkFIqT9DJBFkP2ABy2QKjTXDWawMw8CY5twHzg?e=0qf496)

## Introducción

Este proyecto tiene objetivo ofrecer una experiencia interactiva por el sistema solar a través de una simulación.
Con texturas y animaciones realistas, esta simulación permite navegar por el espacio, observando las características únicas de cada planeta. También se incluye algunos datos como distancia al Sol, diámetro, periodo de rotación, etc.

## Funcionalidades

### Navegación

En esta simulación es posible navegar a través del sistema solar en dos modos:
- Modo vuelo: permite al usuario navegar libremente por la escena en un estilo similar a un vuelo en primera persona.

- Modo mapa: ofrece una vista más estructurada y topográfica de la escena, similar a un mapa.

### Interacción

Es posible añadir objetos al sistema solar a través de la interfaz de usuario, los parámetros que se pueden modificar son: 
- Nombre
- Radio
- Distancia al sol
- Periodo de traslación
- Periodo de rotación
- Semieje mayor de la órbita
- Semieje menor de la órbita

## Controles

Espacio: Pausar/Reanudar

T: Cambiar modo de la cámara (Fly/Map)

### Modo Fly

- Botón izquierdo del ratón: acercarse
- Botón derecho del ratón: alejarse
- Movimiento del ratón: rotar la cámara

### Modo Map

- Botón izquierdo del ratón: desplazarse con un gesto de arrastre
- Botón derecho del ratón: rotar la cámara
- Rueda del ratón: acercar/alejarse

## Limitaciones

En este proyecto, se ha intentado representar el sistema solar a escala real; sin embargo, no se ha logrado debido a las enormes distancias que separan a los cuerpos celestes. Por esta razón, las distancias y tamaños no se pueden representar fielmente, ya que son mucho mayores de lo que se muestra en la simulación.

A pesar de estas limitaciones, se han podido representar con precisión el período de rotación y el período de traslación de cada planeta. En esta simulación, 1 segundo equivale a 5-6 días terrestres, lo que permite observar el movimiento de los planetas de manera más dinámica.

## Referencias

Para crear el efecto de brillo del Sol se ha utilizado la librería [Fake Glow](https://github.com/ektogamat/fake-glow-material-threejs)

Las texturas que se ha utilizado se encuentran [aquí](https://planetpixelemporium.com/planets.html)
