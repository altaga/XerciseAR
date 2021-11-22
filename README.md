# XerciseAR
 
The Instagram Filter that helps you exercise through AI. It recognizes parts of the body, and the filter guides you through a series of exercises to improve your health, everything based on Instagram. 

<img src="https://i.ibb.co/xsMKQGM/x1-1.png" width="1000">

If you are a Judge in this link you can test the filter, which is already public for anyone to use.

Link: https://www.instagram.com/ar/251870160174280/

Or you can also scan the QR.

<img src="https://i.ibb.co/hyQckcC/image.png">

Here are the demos of the 3 exercises without editing, only the recordings from Instagram.
Jumping Jacks Demo:

[![Jumping](https://i.ibb.co/sP08Dgh/x2.png)](https://youtu.be/GWBVyP5BqS8)

Shoulder Press Demo:

[![Shoulder](https://i.ibb.co/sP08Dgh/x2.png)](https://youtu.be/LvTEQ7AaOu4)

Squat Demo:

[![Squat](https://i.ibb.co/sP08Dgh/x2.png)](https://youtu.be/OHn_5Ebqn7A)

# Xercise Code:

To develop the filter, the use of a script was essential, which was in charge of all the analysis of the relationships between the points of the body, in order to be able to detect that an exercise was being done well.

Both the script and the patches are commented to facilitate code review.

 ## Spark Script Libraries:

- Scene:
  - Obtaining the X, Y points of each detected part of the body.

https://sparkar.facebook.com/ar-studio/learn/reference/classes/SceneModule

- Patches:
  - Communication of the script variables with the elements in the Patches.

https://sparkar.facebook.com/ar-studio/learn/reference/classes/PatchesModule
  
- Time:
  - Time-based events, such as the 5-second timer at the start and the infinite cycleBridge to track the points on the screen with the body.

https://sparkar.facebook.com/ar-studio/learn/reference/classes/TimeModule

## Patches Used:

- Body Finder:
  - Bridge to track the points on the screen with the body.

https://sparkar.facebook.com/ar-studio/learn/patch-editor/body-landmark-patches
  
- Audio Player:
  - Used for all effect audio playback.

https://sparkar.facebook.com/ar-studio/learn/patch-editor/audio-patches/audio-player-patch/

- Boolean Operators:
  - And, or and not gates are used in order to manipulate the appearance and disappearance of elements such as canvas.

https://sparkar.facebook.com/ar-studio/learn/patch-editor/logic-patches/

- Visible Block:
  - With this block we handle the appearance and disappearance of canvases and various elements.This specific block has all the instructions in javascript, for more details enter

https://sparkar.facebook.com/ar-studio/learn/tutorials/making-objects-appear/

- Script:
  - This specific block has all the instructions in javascript, for more details enter [Script](./Xercise%20-%20Spark%20AR/scripts/script.js)

https://sparkar.facebook.com/ar-studio/learn/scripting/scripting-basics/