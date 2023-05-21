const display = document.getElementById("display");
const calc = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
};

let num = 0,
  operator;
// numpad
[...document.getElementsByClassName("numKey")].forEach((key) =>
  key.addEventListener(
    "click",
    () =>
      (display.value =
        display.value == num ? key.value : display.value + key.value)
  )
);

// clear
const clear = () => {
  num = 0;
  display.value = "0";
  operator = null;
  updateOperationKey();
};
document.getElementById("clearKey").addEventListener("click", clear);

// operation keys
const operationKeys = [...document.getElementsByClassName("operationKey")];

const updateOperationKey = () => {
  operationKeys.forEach(
    (key) =>
      (key.classList =
        operator === key.id ? "operationKey active" : "operationKey")
  );
};

const operate = () => {
  num = calc[operator](+num, +display.value);
  operator = null;
  updateOperationKey();
};

operationKeys.forEach((key) => {
  key.addEventListener("click", () => {
    if (operator && display.value !== num) {
      operate();
      display.value = num;
    }
    operator = key.id;
    updateOperationKey();
    num = display.value;
  });
});

document.getElementById("equalsKey").addEventListener("click", () => {
  operate();
  display.value = num;
});
