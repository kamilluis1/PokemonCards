gsap.from(".header", { duration: 1, y: "-100%", ease: "bounce" });
gsap.from('.header__img',{duration:1,delay:1,x:'-200%', rotate:-360})
gsap.from(".jumbotron__img", { 
    // opacity: 0,
      duration: 1,
      scale: 0,
      delay: 2,
      // rotate: -720,
})

gsap.from(".jumbotron__span", {
  delay: 3,
  duration: .6,
  opacity:0,
  ease: "power2-in",
  stagger: {
    amount: 0.7,
  
  }
 })

 const button = document.querySelector('.header__burger');
 button.addEventListener("click", () => {
 gsap.fromTo('.card', )
});


// zdjecie jest cale na cala strone, spada header pojawia sie logo, potem na zdjeciu pojawia sie pokemon i wjezdzaja napisy.
// klikniecie x nasze karty sie skaluja z prawa do lewa potem sie opacity zmienia na 0.2