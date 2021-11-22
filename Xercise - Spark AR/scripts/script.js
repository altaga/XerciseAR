const Scene = require('Scene');
const Patches = require("Patches");
const Time = require('Time');
export const Diagnostics = require('Diagnostics');

// Get Distance Between 2 Points
function distance([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Simple get XY coordinates from object

function getSimpleXY(obj) {
  let yy = obj.transform.y.pinLastValue()
  let xx = obj.transform.x.pinLastValue()
  return [xx, yy]
}

// Get Angle Between 3 Points

function find_angle(Ap, Bp, Cp) {
  const A = {
    x: Ap[0],
    y: Ap[1]
  }
  const B = {
    x: Bp[0],
    y: Bp[1]
  }
  const C = {
    x: Cp[0],
    y: Cp[1]
  }
  var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
  var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
  return (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI;
}

// Get ALL XY coordinates from all my objects

function getXY(rh, rk, ra, rs, th, n, ls, la, lk, lh, rha, lha, re, le) {
  let [yrh, yrk, yra, yrs, yth, yn, yls, yla, ylk, ylh, yrha, ylha, yre, yle] =
    [
      rh.transform.y.pinLastValue()
      , rk.transform.y.pinLastValue()
      , ra.transform.y.pinLastValue()
      , rs.transform.y.pinLastValue()
      , th.transform.y.pinLastValue()
      , n.transform.y.pinLastValue()
      , ls.transform.y.pinLastValue()
      , la.transform.y.pinLastValue()
      , lk.transform.y.pinLastValue()
      , lh.transform.y.pinLastValue()
      , rha.transform.y.pinLastValue()
      , lha.transform.y.pinLastValue()
      , re.transform.y.pinLastValue()
      , le.transform.y.pinLastValue()
    ]
  let [xrh, xrk, xra, xrs, xth, xn, xls, xla, xlk, xlh, xrha, xlha, xre, xle] =
    [
      rh.transform.x.pinLastValue()
      , rk.transform.x.pinLastValue()
      , ra.transform.x.pinLastValue()
      , rs.transform.x.pinLastValue()
      , th.transform.x.pinLastValue()
      , n.transform.x.pinLastValue()
      , ls.transform.x.pinLastValue()
      , la.transform.x.pinLastValue()
      , lk.transform.x.pinLastValue()
      , lh.transform.x.pinLastValue()
      , rha.transform.x.pinLastValue()
      , lha.transform.x.pinLastValue()
      , re.transform.x.pinLastValue()
      , le.transform.x.pinLastValue()
    ]
  return {
    "th": [xth, yth],
    "n": [xn, yn],
    "rs": [xrs, yrs],
    "ls": [xls, yls],
    "ra": [xra, yra],
    "la": [xla, yla],
    "rh": [xrh, yrh],
    "lh": [xlh, ylh],
    "rk": [xrk, yrk],
    "lk": [xlk, ylk],
    "rha": [xrha, yrha],
    "lha": [xlha, ylha],
    "re": [xre, yre],
    "le": [xle, yle],
  }
}

// Detect Zero values from array of XY coordinates

function NoZero(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] <= 0 || array[i][1] <= 0) {
      return false
    }
  }
  return true
}

// Get Average value from array

function AvgArray(array) {
  var total = 0;
  var count = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
    count++;
  }
  return total / count;
}

// Delay 1 second

function waitforme(milisec) {
  return new Promise(resolve => {
    Time.setTimeout(() => { resolve('') }, 1000);
  })
}

(async function () {

  // Setup all interations with patches
  await Patches.inputs.setBoolean("dis", true)
  await Patches.inputs.setBoolean("start1", false)
  await Patches.inputs.setBoolean("start2", false)
  await Patches.inputs.setBoolean("start3", false)
  await Patches.inputs.setString("selection", "Select Xercise")
  await Patches.inputs.setString("extra", "")
  await Patches.inputs.setBoolean("sjj", false)

  // Get all objects

  const [rh, rk, ra, rs, th, n, ls, la, lk, lh, canvas, hand, rha, lha, re, le] = await Promise.all([
    Scene.root.findFirst('rectangle13'),
    Scene.root.findFirst('rectangle12'),
    Scene.root.findFirst('rectangle11'),
    Scene.root.findFirst('rectangle10'),
    Scene.root.findFirst('rectangle0'),
    Scene.root.findFirst('rectangle1'),
    Scene.root.findFirst('rectangle2'),
    Scene.root.findFirst('rectangle7'),
    Scene.root.findFirst('rectangle6'),
    Scene.root.findFirst('rectangle5'),
    Scene.root.findFirst('canvas0'),
    Scene.root.findFirst("rectangle3"),
    Scene.root.findFirst("rectangle14"),
    Scene.root.findFirst("rectangle15"),
    Scene.root.findFirst("rectangle17"),
    Scene.root.findFirst("rectangle16")
  ]);

  // Setup all global variables

  let screen = [canvas.width.pinLastValue(), canvas.height.pinLastValue()]
  let myboolean = false;
  let startScript = true;
  let selector = 0;
  let minrel1 = 1000000;
  let maxrel1 = 0;
  let minrel2 = 1000000;
  let maxrel2 = 0;
  let Counter = 0;
  let doe = true
  let right = true
  let angleArray = [];
  let angle;
  let Subcounter = 0;
  let times = 5

  // Wait 5 seconds before starting
  await Patches.inputs.setString("extra", times.toString())
  for (let i = 0; i < 5; ++i) {
    await waitforme(1000);
    times = times - 1
    await Patches.inputs.setString("extra", times.toString())
  }

  await Patches.inputs.setString("extra", "")

  // Start Script, this function is like a main loop

  Time.setInterval(async function () {
    // Waith for user to select Xercise
    if (startScript) {
      const handpos = getSimpleXY(hand)
      // Shoulder Press Selection
      if (handpos[0] > 0 && handpos[0] < screen[0] * 0.33 && handpos[1] < screen[1] * 0.3) {
        await Patches.inputs.setBoolean("dis", false)
        await Patches.inputs.setBoolean("start1", true)
        await Patches.inputs.setString("selection", "Shoulder Press")
        startScript = false
        selector = 1
      }
      // Squat Selection
      else if (handpos[0] > screen[0] * 0.33 && handpos[0] < screen[0] * 0.66 && handpos[1] < screen[1] * 0.3) {
        await Patches.inputs.setBoolean("dis", false)
        await Patches.inputs.setBoolean("start2", true)
        await Patches.inputs.setString("selection", "Squat")
        startScript = false
        selector = 2
      }
      // Jumping Jacks Selection
      else if (handpos[0] > screen[0] * 0.66 && handpos[0] < screen[0] && handpos[1] < screen[1] * 0.3) {
        await Patches.inputs.setBoolean("dis", false)
        await Patches.inputs.setBoolean("start3", true)
        await Patches.inputs.setString("selection", "Jumping Jacks")
        startScript = false
        selector = 3
      }
    }
    else {
      // Goku Mode when reach 8 reps
      if (Subcounter > 7) {
        await Patches.inputs.setBoolean("start1", false)
        await Patches.inputs.setBoolean("start2", false)
        await Patches.inputs.setBoolean("start3", false)
        await Patches.inputs.setBoolean("sjj", true)
        await Patches.inputs.setString("extra", "")
      }
      else {
        if (selector === 1) { // Shoulder Press routine
          if (doe) {
            await Patches.inputs.setString("d1", "UP")
            await Patches.inputs.setString("counter", "0")
            doe = false;
          }
          let myjson = getXY(rh, rk, ra, rs, th, n, ls, la, lk, lh, rha, lha, re, le)
          let flag;
          if (right) { // Right hand routine
            angle = find_angle(myjson["rs"], myjson["re"], myjson["rha"])
            await Patches.inputs.setString("extra", "L")
            flag = NoZero([myjson["rs"], myjson["re"], myjson["rha"]])
          }
          else { // Left hand routine
            angle = find_angle(myjson["ls"], myjson["le"], myjson["lha"])
            await Patches.inputs.setString("extra", "R")
            flag = NoZero([myjson["ls"], myjson["le"], myjson["lha"]])
          }
          // Check if angle is valid
          if (angle > 0 && angle < 200 && flag) {
            if (angleArray.length < 10) {
              angleArray.push(angle)
            }
            else {
              angleArray.push(angle)
              angleArray.shift()
            }
            // Get Average of 10 angles
            angle = AvgArray(angleArray)
            // Check Up or Down movement
            if (myboolean) {
              if (angle < 100) {
                myboolean = !myboolean
                await Patches.inputs.setString("counter", Counter.toString())
                if (Counter >= 4) {
                  Counter = 0
                  if (right) {
                    await Patches.inputs.setString("extra", "L")
                    right = !right
                  }
                  else {
                    await Patches.inputs.setString("extra", "R")
                    right = !right
                  }
                }
                await Patches.inputs.setString("d1", "UP")
              }
            }
            else {
              if (angle > 100) {
                myboolean = !myboolean
                Counter = Counter + 1
                Subcounter = Subcounter + 1
                await Patches.inputs.setString("d1", "DOWN")
              }
            }
          }
        }
        else if (selector === 2) { // Squat routine
          if (doe) {
            await Patches.inputs.setString("d1", "UP")
            await Patches.inputs.setString("counter", "0")
            doe = false;
          }
          // Get XY coordinates of the joints
          let myjson = getXY(rh, rk, ra, rs, th, n, ls, la, lk, lh, rha, lha, re, le)
          // Normalize the XY values to 0-1
          let laTemp = [myjson["la"][0] / screen[0], myjson["la"][1] / screen[1]]
          let lhTemp = [myjson["lh"][0] / screen[0], myjson["lh"][1] / screen[1]]
          let raTemp = [myjson["ra"][0] / screen[0], myjson["ra"][1] / screen[1]]
          let rlTemp = [myjson["rh"][0] / screen[0], myjson["rh"][1] / screen[1]]
          // Get the distance between hip and ankle
          let distance1 = distance(laTemp, lhTemp);
          let distance2 = distance(raTemp, rlTemp);
          // Avoid distance to be negative, zero or plus than one
          if (distance1 !== 0 && distance2 !== 0 && distance1 < 1 && distance2 < 1) {
            minrel1 = Math.min(distance1, minrel1)
            maxrel1 = Math.max(distance1, maxrel1)
            minrel2 = Math.min(distance2, minrel2)
            maxrel2 = Math.max(distance2, maxrel2)
          }
          // Up and Down detector
          if (myboolean) { // up
            if (distance1 > (maxrel1 - .05) && distance2 > (maxrel2 - .05)) {
              myboolean = !myboolean
              Counter = Counter + 1
              Subcounter = Subcounter + 1
              await Patches.inputs.setString("counter", Counter.toString())
              await Patches.inputs.setString("d1", "DOWN")
            }
          }
          else { // down
            if (distance1 < (maxrel1 - .13) && distance2 < (maxrel2 - .13)) {
              myboolean = !myboolean
              await Patches.inputs.setString("d1", "UP")
            }
          }
        }
        else if (selector === 3) { // Jumping Jacks routine
          if (doe) {
            await Patches.inputs.setString("d1", "UP")
            await Patches.inputs.setString("counter", "0")
            doe = false;
          }
          // Get XY coordinates of the joints
          let myjson = getXY(rh, rk, ra, rs, th, n, ls, la, lk, lh, rha, lha, re, le)
          angle = find_angle(myjson["ra"], myjson["rh"], myjson["la"])
          let flag = NoZero([myjson["ra"], myjson["rh"], myjson["la"]])
          // Check if angle is valid and take the average of 10 angles
          if (angle > 0 && angle < 90 && flag) {
            if (angleArray.length < 10) {
              angleArray.push(angle)
            }
            else {
              angleArray.push(angle)
              angleArray.shift()
            }
            angle = AvgArray(angleArray)
            // Check repetitions checking if the angle of the legs is less than 40 or plus than 40
            if (myboolean) {
              if (angle > 40) {
                myboolean = !myboolean
                await Patches.inputs.setString("counter", Counter.toString())
                await Patches.inputs.setString("d1", "UP")
              }
            }
            else {
              if (angle <= 40) {
                myboolean = !myboolean
                Counter = Counter + 1
                Subcounter = Subcounter + 1
                await Patches.inputs.setString("d1", "DOWN")
              }
            }
          }
        }
      }
    }
  }, 100); // Repeat every 100ms
})(); 
