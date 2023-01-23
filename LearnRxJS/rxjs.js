import * as Rx from "rxjs";

function print(value) {
  let element = document.createElement("p");
  element.innerText = value;
  document.body.appendChild(element);
}

let nums = [3, 5, 3, 3, 3, 2, 2, 242, 3];
let evenNums$ = Rx.from(nums);
let observer = {
  next: (value) => print(`value from observable: ${value}`),
  error: (error) => console.error(error),
  complete: () => print(`All Done`),
};
evenNums$.subscribe(observer);
