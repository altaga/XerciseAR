# XerciseAR
 
The Instagram Filter that helps you exercise through AI. It recognizes parts of the body, and the filter guides you through a series of exercises to improve your health, everything based on Instagram. 

<img src="https://i.ibb.co/ZN4WdbD/Whats-App-Image-2021-11-20-at-8-41-21-PM.jpg" width="1000">

If you are a Judge in this link you can test the filter, which is already public for anyone to use.

Link: https://www.instagram.com/ar/251870160174280/

Or you can also scan the QR.

<img src="https://i.ibb.co/hyQckcC/image.png">

Here are the demos of the 3 exercises without editing, only the recordings from Instagram.
Jumping Jacks Demo:

[![Jumping](https://i.ibb.co/SfZm0G3/clock.jpg)](https://youtu.be/GWBVyP5BqS8)

Shoulder Press Demo:

[![Shoulder](https://i.ibb.co/SfZm0G3/clock.jpg)](https://youtu.be/LvTEQ7AaOu4)

Squat Demo:

[![Squat](https://i.ibb.co/SfZm0G3/clock.jpg)](https://youtu.be/OHn_5Ebqn7A)

# Xercise Code:

To develop the filter, the use of a script was essential, which was in charge of all the analysis of the relationships between the points of the body, in order to be able to detect that an exercise was being done well.

Both the script and the patches are commented to facilitate code review.

 ## Spark Script Libraries:

- Scene:
  - Obtaining the X, Y points of each detected part of the body.

- Patches:
  - Communication of the script variables with the elements in the Patches.
  
- Time:
  - Time-based events, such as the 5-second timer at the start and the infinite cycleBridge to track the points on the screen with the body.

## Patches Used:

- Body Finder:
  - Bridge to track the points on the screen with the body.
  
- Audio Player:
  - Used for all effect audio playback.


- Boolean Operators:
  - And, or and not gates are used in order to manipulate the appearance and disappearance of elements such as canvas.


- Visible Block:
  - With this block we handle the appearance and disappearance of canvases and various elements.This specific block has all the instructions in javascript, for more details enter

- Script:
  - This specific block has all the instructions in javascript, for more details enter [Script](./Xercise%20-%20Spark%20AR/scripts/script.js)
