import * as Rx from "rxjs";

function print(value) {
  let element = document.createElement("p");
  element.innerText = value;
  document.body.appendChild(element);
}

let nums = [2, 2, 4, 6, 8];
let observableNums$ = Rx.from(nums);
let evenNums$ = Rx.Observable.create((subscriber) => {
  for (let currentNum of nums) {
    if (currentNum % 2 === 0) subscriber.next(currentNum);
    else subscriber.error(`Value is not even`);
  }
  subscriber.complete("Done");
});
let observer = {
  next: (value) => print(`value from observable: ${value}`),
  error: (error) => console.error(error),
  complete: () => print(`All Done`),
};
observableNums$.subscribe(observer);
evenNums$.subscribe(observer);
