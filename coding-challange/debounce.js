const btnWihtoutDebounce = document.querySelector(".btn--without-debounce");
const btnWithDebounce = document.querySelector(".btn--with-debounce");

// without debounce
btnWihtoutDebounce.addEventListener("click", function (event) {
  console.log("clicked wihtout debounce");
});

// with debounce
function debounce(handler, timeout) {
  let timeoutInstance;
  return function () {
    if (timeoutInstance) {
      clearTimeout(timeoutInstance);
    }
    timeoutInstance = setTimeout(handler, timeout);
  };
}

btnWithDebounce.addEventListener(
  "click",
  debounce(function (event) {
    console.log("clicked with debounce");
  }, 500)
);
