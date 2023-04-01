export default class Controls {
  // --------------------------------
  //---- Constructor / Initializer
  // --------------------------------

  constructor() {
    // Store currently pressed keys
    this.currentKeys = [];
    // Store only the last pressed key
    this.lastKey = "null";

    // Config for defining various actions based on sets of keys
    this.keys = {
      left: ["a", "ArrowLeft"],
      right: ["d", "ArrowRight"],
      up: ["w", "ArrowUp"],
      down: ["s", "ArrowDown"],
      confirm: ["f", " "],
    };

    // --------------------------------
    //---- Event Listeners
    // --------------------------------

    // Keydown event listener
    document.addEventListener("keydown", (e) => {
      // Prevent default action only on certain key presses
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
      }

      // Loop through each array in keys object to check if currently pressed key matches any keys in the array
      // If the key is pressed and not already in currentKeys, add it to the currentKeys array based on Object.keys

      // The purpose of this algorithm is to allow for multiple and simultaneous key presses based on defined configs, and to allow multiple keys to execute the same tasks.
      Object.values(this.keys).forEach((k, i) => {
        if (
          k.includes(e.key) &&
          !this.currentKeys.includes(Object.keys(this.keys)[i])
        ) {
          const newKey = Object.keys(this.keys)[i];
          this.lastKey = newKey;
          this.currentKeys.push(newKey);
        }
      });
    });

    // keyup event listener
    document.addEventListener("keyup", (e) => {
      // Loop through keys object to check for released keys
      // If the key is released and exists in currentKeys, remove it
      Object.values(this.keys).forEach((k, i) => {
        if (k.includes(e.key)) {
          const keyName = Object.keys(this.keys)[i];
          if (this.currentKeys.includes(keyName)) {
            this.currentKeys.splice(this.currentKeys.indexOf(keyName), 1);
          }
        }
      });
    });
  }

  // --------------------------------
  //---- Methods for external objects
  // --------------------------------

  // Return the horizontal axis value based on pressed keys
  horizontalAxis = () => {
    if (this.currentKeys.includes("right")) return 1;
    else if (this.currentKeys.includes("left")) return -1;
    else return 0;
  };

  // Return the vertical axis value based on pressed keys
  verticalAxis = () => {
    if (this.currentKeys.includes("up")) return -1;
    else if (this.currentKeys.includes("down")) return 1;
    else return 0;
  };

  // Return both horizontal and vertical axis values as an object
  // This is the primary method for moving objects around the play field, and nearly all GameObjects utilise it
  axis = () => {
    return { x: this.horizontalAxis(), y: this.verticalAxis() };
  };

  // Check if a specific key is in the currentKeys array and return true or false
  // This allows an external object to listen for a single press every frame by simply calling controls.key("key-name")
  key = (checkedKey) => {
    let returned = false;
    this.currentKeys.forEach((keyPressed) => {
      if (keyPressed === checkedKey) {
        returned = true;
      }
    });
    return returned;
  };
}
