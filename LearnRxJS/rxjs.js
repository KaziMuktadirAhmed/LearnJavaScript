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
  console.log(event);
  let readersDiv = document.getElementById("readers");
  for (let reader of allReaders) {
    readersDiv.innerHTML += reader.name + `<br>`;
  }
});

let buttonAjax = document.getElementById("readersAjaxButton");
Rx.fromEvent(buttonAjax, "click").subscribe((event) => {
  console.log(event);
  RxAjax.ajax("https://www.boredapi.com/api/activity").subscribe((resAjax) => {
    console.log(resAjax);
    let { response } = resAjax;
    for (const key in response) {
      print(`${key}: ${response[key]}`);
    }
  });
});
