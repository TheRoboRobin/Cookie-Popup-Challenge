const cookiePopup = function () {
  //////////////////////////
  // Selectors

  const section1 = document.querySelector(".rest");

  //////////////////////////
  // Create Element

  const getCookie = function (name) {
    const cookie = decodeURIComponent(document.cookie);
    const cookieArr = cookie.split("; ");
    let result = null;

    cookieArr.forEach((c) => {
      if (c.indexOf(name) === 0) result = c.substring(name.length + 1);
    });
    return result;
  };

  if (getCookie("cookieAllow") === "yes") return;

  let cookieContainer = document.createElement("div");

  cookieContainer.classList.add("cookie");
  cookieContainer.innerHTML = `
        <div class="cookie__icons">
          <svg class="cookie__icon cookie__icon--cross">
            <use href="/SVG/cross.svg"></use>
          </svg>
          <svg class="cookie__icon cookie__icon--gear">
            <use href="/SVG/cog.svg"></use>
          </svg>
        </div>
        <p class="cookie__text">
          We use cookies to improve your user experience.
        </p>
        <div class="cookie__buttons">
          <button class="cookie__button">I Accept</button>
          <button class="cookie__button cookie__button--trash">
            <svg class="cookie__icon cookie__icon--trash">
              <use href="/SVG/trash.svg"></use>
            </svg>
          </button>
        </div>
  `;
  section1.after(cookieContainer);

  //////////////////////////
  // Functions

  const closePopup = function () {
    cookieContainer.remove();
  };

  const setCookie = function (name, value, maxAge) {
    if (typeof maxAge === "number") {
      document.cookie = `${name}=${value}; max-age=${
        maxAge * 24 * 60 * 60
      }; path=/;`;
      console.log(document.cookie);
    }
  };

  const deleteCookie = function (name) {
    setCookie(name, null, 0);
  };

  //////////////////////////
  // Event Listeners

  document
    .querySelector(".cookie__icon--cross")
    .addEventListener("click", closePopup);

  document
    .querySelector(".cookie__button")
    .addEventListener("click", function () {
      setCookie("cookieAllow", "yes", 7);
      closePopup();
    });

  document
    .querySelector(".cookie__button--trash")
    .addEventListener("click", function () {
      deleteCookie("cookieAllow");
    });
};

const init = function () {
  cookiePopup();
};

//////////////////////////
// Initialization

init();
