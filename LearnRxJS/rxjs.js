import * as Rx from "rxjs";
import * as RxAjax from "rxjs/ajax";
import { allReaders, allBooks } from "./data";

function print(value) {
  let element = document.createElement("p");
  element.innerText = value;
  document.body.appendChild(element);
}

let allBooksObservable$ = new Rx.Observable((subscriber) => {
  if (document.title !== "rxjs practice")
    subscriber.error("Incorrect page title");

  for (let book of allBooks) {
    subscriber.next(book);
  }

  setTimeout(() => subscriber.complete(), 2000);
});

allBooksObservable$.subscribe({
  next: (book) => print(`Title: ${book.title}`),
  error: (error) => console.error(error),
  complete: () => print("All done"),
});

let source1$ = Rx.of("lol", "xd", 123, ["la", 09], 2.34);
let source2$ = Rx.from(allReaders);
Rx.concat(source1$, source2$).subscribe((val) => console.log(val));
// source1$.subscribe((val) => console.log(val));

let button = document.getElementById("readersButton");
Rx.fromEvent(button, "click").subscribe((event) => {
  let readersDiv = document.getElementById("readers");
  for (let reader of allReaders) {
    readersDiv.innerHTML += reader.name + `<br>`;
  }
});

let buttonAjax = document.getElementById("readersAjaxButton");
Rx.fromEvent(buttonAjax, "click").subscribe((event) => {
  RxAjax.ajax("https://www.boredapi.com/api/activity").subscribe((resAjax) => {
    let { response } = resAjax;
    for (const key in response) {
      print(`${key}: ${response[key]}`);
    }
  });
});

let buttonTimer = document.getElementById("timerButton");
let buttonStopTimer = document.getElementById("stopTimer");
let timerSubscription;
let timer$ = Rx.interval(1000);
Rx.fromEvent(buttonTimer, "click").subscribe((event) => {
  timerSubscription = timer$.subscribe((value) => console.log(`${value}`));
});

Rx.fromEvent(buttonStopTimer, "click").subscribe((event) => {
  timerSubscription.unsubscribe();
  console.log("timer stopped");
});

let obs$ = new Rx.Observable((subscriber) => {
  subscriber.next(Math.random());
});
let subject$ = new Rx.Subject();

print(`Hot`);
subject$.subscribe((val) => print(`Observer 1: ${val}`));
subject$.subscribe((val) => print(`Observer 2: ${val}`));

obs$.subscribe(subject$);

print(`cold`);
obs$.subscribe((val) => print(`Observer 1: ${val}`));
obs$.subscribe((val) => print(`Observer 2: ${val}`));
// subject$.next("hello");

// RxJS scheduler
console.log("Start script");

let queue$ = Rx.of("queue scheduler (sync)", Rx.queueScheduler);
let asap$ = Rx.of("Asap scheduler (micro task)", Rx.asapScheduler);
let async$ = Rx.of("Async scheduler (async task)", Rx.asyncScheduler);

Rx.merge(async$, asap$, queue$).subscribe((val) => {
  console.log(val);
});

console.log("End Script");
