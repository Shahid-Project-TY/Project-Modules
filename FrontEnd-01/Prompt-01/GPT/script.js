// Helper
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Footer year
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const hamburger = $("#hamburger");
const navLinks = $("#nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Smooth scroll CTA
$("#to-awareness").addEventListener("click", () => {
  document.querySelector("#quiz").scrollIntoView({ behavior: "smooth" });
});

// Fade-in animation observer
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("in-view");
  });
},{threshold:.15});

$$("[data-animate]").forEach(el => obs.observe(el));

// Comparison highlight
$("#highlight-best").addEventListener("change", e=>{
  const rows = document.querySelectorAll(".comp-table tbody tr");
  rows.forEach(r=>r.classList.remove("highlight"));
  if(e.target.checked) rows[1].classList.add("highlight"); // stainless steel
});

// Poll system
const keys = ["yes","sometimes","no"];
let saved = JSON.parse(localStorage.getItem("poll") || "{}");
keys.forEach(k => saved[k] = saved[k] || 0);

function renderPoll(){
  const total = keys.reduce((a,b)=>a+saved[b],0)||1;
  keys.forEach(k=>{
    const pct = Math.round(saved[k]/total*100);
    $(`.fill[data-key="${k}"]`).style.width = pct+"%";
    $(`.pct[data-key="${k}"]`).textContent = pct+"%";
  });
}
renderPoll();

$$(".poll-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    saved[btn.dataset.value]++;
    localStorage.setItem("poll",JSON.stringify(saved));
    renderPoll();
  });
});
