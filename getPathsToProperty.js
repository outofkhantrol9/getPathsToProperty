const getPathsToProperty = (wrapperObjectForParameters) => {

  const outputPaths = [];

  const walkedObjects = [];

  const objectStack = [];

  objectStack[0] = {};

  objectStack[0].object = wrapperObjectForParameters.rootObject;

  objectStack[0].stack = "";

  let currentPropertyIsAMatch = false;

  while (objectStack.length > 0) {

    const currentStack = objectStack[objectStack.length - 1];

    objectStack.pop();

    var currentObject = currentStack.object;

    for (const currentKey in currentObject) {

      if (currentObject.hasOwnProperty(currentKey)) {

        currentPropertyIsAMatch = false;

        if (typeof currentObject[currentKey] === 'object' && currentObject[currentKey] !== null) {

          let alreadyFound = false;

          for (let currentIteration = 0, lengthOfWalkedObjects = walkedObjects.length; currentIteration < lengthOfWalkedObjects; ++currentIteration) {

            if (walkedObjects[currentIteration] === currentObject[currentKey]) {

              alreadyFound = true;

              break;

            }

          }

          if (alreadyFound === false) {

            walkedObjects.push(currentObject[currentKey]);

            objectStack.push({

              object: currentObject[currentKey],

              stack: currentStack.stack + "." + currentKey

            });

          }

          if (currentKey === wrapperObjectForParameters.targetProperty) {

            currentPropertyIsAMatch = true;

          }

        } else {

          if (currentKey === wrapperObjectForParameters.targetProperty) {

            currentPropertyIsAMatch = true;

          }

        }

      }

      if (currentPropertyIsAMatch) {

        const currentPath = "rootObject" + currentStack.stack + "." + currentKey;

        if (wrapperObjectForParameters.onlyOnePath) {

          return currentPath;

        }

        outputPaths.push(currentPath);

      }

    }

  }

  return outputPaths;

};
