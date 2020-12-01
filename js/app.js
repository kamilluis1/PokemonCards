const burger = document.querySelector(".header__burger");
const content = document.querySelector(".content");
const contentInner = document.querySelector(".content__inner");
const label = document.querySelector(".search__label");
const input = document.querySelector(".search__input");


burger.addEventListener("click", function () {
  console.log("click");
  content.classList.toggle("active");
  contentInner.classList.toggle("active");
  // INPUT
  label.style.right = label.style.right === "0px" ? "-180px" : "0px";
  label.classList.toggle('search__label--active-color')
  input.style.display = input.style.display === "block" ? "none" : "block";
 
  if(label.classList.contains('search__label--active')){
    label.classList.remove('search__label--active')
  }
  input.value = '';
  

});

input.addEventListener("focus", function () {
  console.log("input");
  label.classList.add('search__label--active')
});


