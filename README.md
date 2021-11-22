# XerciseAR
 
The Instagram Filter that helps you exercise through AI. It recognizes parts of the body, and the filter guides you through a series of exercises to improve your health, everything based on Instagram. 

<img src="https://i.ibb.co/ZN4WdbD/Whats-App-Image-2021-11-20-at-8-41-21-PM.jpg" width="1000">

Si eres Juez en este link puedes probar el filtro, el cual ya es publico para que cualquiera lo use.

Link: https://www.instagram.com/ar/251870160174280/

O tambien puedes escanear el QR.

<img src="https://i.ibb.co/hyQckcC/image.png">

Aqui los demos de los 3 ejercicios sin edicion, solo la grabacion desde Instagram.

Jumping Jacks Demo:

[![Jumping](https://i.ibb.co/ZN4WdbD/Whats-App-Image-2021-11-20-at-8-41-21-PM.jpg)](https://youtu.be/GWBVyP5BqS8)

Shoulder Press Demo:

[![Shoulder](https://i.ibb.co/ZN4WdbD/Whats-App-Image-2021-11-20-at-8-41-21-PM.jpg)](https://youtu.be/LvTEQ7AaOu4)

Squat Demo:

[![Squat](https://i.ibb.co/ZN4WdbD/Whats-App-Image-2021-11-20-at-8-41-21-PM.jpg)](https://youtu.be/OHn_5Ebqn7A)

# Xercise Code:

Para el desarrollo del filtro fue indispensable el uso de un script, el cual se encargo de todo el analisis de las relaciones entre los puntos del cuerpo, con el fin de poder detectar que se estaba haciendo bien un ejercicio.

Tanto el script y los patches estan comentados para facilitar la revision del codigo.

 ## Spark Script Libraries:

- Scene:
  - Obtencion de los puntos X,Y de cada parte detectada del cuerpo.

- Patches:
  - Comunicacion de las variables del script con los elementos en los Patches.
  
- Time:
  - Eventos basados en tiempo, como lo son el timer de 5 segundos al inicio y el ciclo infinito

## Patches Used:

- Body Finder:
  - Puente para realizar el tracking de los puntos en pantalla con el cuerpo.
  
- Audio Player:
  - Se utiliza para toda la reproduccion de audio del efecto.


- Boolean Operators:
  - Se utilizan compuertas and, or y not con el fin de manipular la aparicion y desaparicion de elementos como canvas.


- Visible Block:
  - Con este bloque manejamos la aparicion y desaparicion de los canvas y elementos varios.

- Script:
  - Este bloque en especifico tiene todas las instrucciones en javascript, para mas detalles entrar en [Script](./Xercise%20-%20Spark%20AR/scripts/script.js)