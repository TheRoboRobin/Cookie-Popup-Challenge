# Cookie Popup Challenge

This was a challenge at [roadmap.sh](https://roadmap.sh/projects/cookie-consent).

---

## Challenge

This project is designed to introduce you to basic DOM manipulation and event handling in JavaScript.

Many websites display a cookie consent popup to inform users about the use of cookies and to obtain their consent. In this project, you will create a simple cookie consent popup that appears when the user visits the page. The popup will include a message and a button to accept the consent. Once accepted, the popup will disappear.

Bonus points if you persist the user's consent using cookies or local storage and prevent the popup from appearing on subsequent visits.

## My Process

I first started by putting together a basic page that would function to follow the challenge. Building the popup as well so that I can insert it in dynamically later with JS.

I also wanted to do the optional part of this challenge. Persist the user's consent using cookies. So I read up on it on [JavaScript.info](https://javascript.info/cookie) and took notes. I also took some time to test it out as I read up on it. I can't say I know much about encoding or decoding yet but I think I got the gist of it from the tutorial.

And so after commiting the basics of which I had set up, selectors and all, I started in.

First I needed to place the popup HTML inside a variable. Easy. I created popupHTML and copied my HTML for the popup and placing it inside. I commented out the code within my HTML for now as well.

I forgot to select the section after which I'd like to add this html and so I added one to my selectors.

Now came the function. What I probably wanted it to do is to add the add the html to section1.innerHTML only if the cookie does not exist already. But I wanted to get the rest of the functionality down first before adding cookies.

At first while creating the function I was going to use insertAdjacentHTML but I wanted to be able to easily remove the cookie message as well. And so instead I created the div first and then added the popup html to it.

In the end, my function looked like this:

```javascript
const cookiePopup = function () {
  const cookieContainer = document.createElement("div");

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
        <button class="cookie__button">I Accept</button>
  `;
  section1.append(cookieContainer);
};
```

It was here where I realized that my selectors are gonna be a little useless or at least useless where I put it in the document. A problem I encountered before but one that I felt infinitely more prepared to fix this time. If I try to use the selectors at the top of the script. My popup html isn't parsed and created yet. And so I can either select it after the init function or just select it when applying the event listener.

And so when creating the event listener for the exit, I just selected it then. I added it to the end of my cookiePopup function.

```javascript
document
  .querySelector(".cookie__icon--cross")
  .addEventListener("click", function () {
    cookieContainer.remove();
  });
```

Now my popup showed up and closed. Now to create the cookie functionality. First I'll create a function that sets the cookie. I wanted this to be as simple as possible.

I'll just create a setCookie function that takes name, value, and maxAge in days as an argument. Made it verify that maxAge is a number and then sets document.cookie to a template literal that sets the correct settings. After that, I refactored my code a bit and put the callback function from the event listener into a seperate function then called it in both the event listener that closes the popup and the newly created event listener to set the cookie.

I realized to make this function, it needed to be in the cookiePopup function as well.

For testing purposes, I added a button to delete cookies. This function sets the max-age to 0, effectively expiring the cookie.

The next thing I needed to do now that functionality of the cookies was added would be making it so the popup checks for the cookie before loading. I'd probably need to first retrieve the cookie, then get its value from the name value pair. Once I have this I could then use that to see if the value is correct. Making a guard clause that will return the function if the cookie is not present.

The getCookie function worked out alright. Pretty easy to peice together the logic of the function. Retrieve cookie, split by `'; '`, then return a new string with the value of cookieAllow.

Though when making the guard clause, I realized I had the logic backwards.

This is what I originally had:

```javascript
if (getCookie("cookieAllow") !== "yes") return;
```

But I want it to return if the cookie is present. And so really I wanted the operator to be `===` instead.

## What I learned

Overall, I think it was really helpful to learn how cookies work and how we use them. Having worked with Wordpress a lot, having a plugin just do it was the norm. But I feel like I've got a better grasp of what we do and why.
