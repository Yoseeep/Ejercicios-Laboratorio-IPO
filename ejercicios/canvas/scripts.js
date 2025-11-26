"use strict";

const botonStart = document.getElementById("button-start");
const header = document.getElementById("header");

botonStart.addEventListener("click", () => {
    header.classList.toggle("header--hidden");
});