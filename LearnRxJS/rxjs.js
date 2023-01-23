import * as Rx from "rxjs";

const observable = new Rx.Observable((observer) => {
  observer.next("inside");
  observer.next("observable");
  observer.next("I have no idea what this does");
});
observable.subscribe((val) => print(val));

const clicks = Rx.fromEvent(document, "click");
clicks.subscribe((click) => console.log(click));

function print(value) {
  let element = document.createElement("p");
  element.innerText = value;
  document.body.appendChild(element);
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 1000);
});

const observePromise = Rx.from(promise);
observePromise.subscribe((result) => print(result));

const timer = Rx.timer(1000);
timer.subscribe((done) => print("ding!!~~~"));

const interval = Rx.interval(1000);
// interval.subscribe((int) => console.log(new Date().getSeconds()));

const mashup = Rx.of("anything", ["ok", "what is this"], 23, true, {
  wut: "why is this even allowed ?",
});
mashup.subscribe((val) => print(val));

// Hot vs Cold observable
const cold = new Rx.Observable((observer) => {
  observer.next(Math.random());
});

// const hot = Rx.publish(cold);

cold.subscribe((sub) => print(`Subscirber A: ${sub}`));
cold.subscribe((sub) => print(`Subscirber B: ${sub}`));

// hot.connect();

// hot.subscribe((sub) => print(`Subscirber A: ${sub}`));
// hot.subscribe((sub) => print(`Subscirber B: ${sub}`));
