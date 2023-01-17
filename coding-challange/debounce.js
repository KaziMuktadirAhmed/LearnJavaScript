const btnWihtoutDebounce = document.querySelector(".btn--without-debounce");
const btnWithDebounce = document.querySelector(".btn--with-debounce");

// without debounce
btnWihtoutDebounce.addEventListener("click", function (event) {
  console.log("clicked wihtout debounce");
});

// with debounce
function debounce(handler, time_before_call, ...params) {
  let timeoutInstance;
  return function () {
    if (timeoutInstance) {
      clearTimeout(timeoutInstance);
    }
    timeoutInstance = setTimeout(() => handler(...params), time_before_call);
  };
}

btnWithDebounce.addEventListener(
  "click",
  debounce(demo, 250, 45, "hello", 78.9, { ok: "okla" })
);

function demo() {
  console.log("clicked with debounce");
  console.log(`list of params that were passed here: `);
}
