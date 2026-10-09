// Harley-Davidson Dealer demo website
// Starting MSRP references: official Harley-Davidson USA 2026 model range.
// IDR is an illustrative conversion only. Change USD_TO_IDR to update estimates.
const USD_TO_IDR = 16600;
const models = [
  {name:"Street Bob",year:2026,category:"Cruiser",price:14999,tag:"PURE CRUISER",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85",description:"A stripped-back cruiser with a bold stance and unmistakable custom attitude.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Deadwood",year:2026,category:"Cruiser",price:17999,tag:"NEW FOR 2026",image:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85",description:"A fresh bobber-inspired look built around classic lines and a pared-back feel.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Fat Boy",year:2026,category:"Cruiser",price:22599,tag:"ICONIC DESIGN",image:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=85",description:"A legendary silhouette, muscular presence, and unmistakable road presence.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Street Glide",year:2026,category:"Touring",price:24999,tag:"LONG-DISTANCE",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85",description:"A touring icon made for open highways, comfort, and miles that matter.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Road Glide Limited",year:2026,category:"Touring",price:32999,tag:"GRAND TOURING",image:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85",description:"Premium touring comfort and road-focused design for longer journeys.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Sportster S",year:2026,category:"Sport",price:15999,tag:"SPORT PERFORMANCE",image:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=85",description:"Modern performance character paired with a bold, contemporary profile.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"},
  {name:"Pan America 1250 Special",year:2026,category:"Adventure",price:19999,tag:"ADVENTURE TOURING",image:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85",description:"Versatile adventure touring capability for riders who seek a different route.",official:"https://www.harley-davidson.com/us/en/motorcycles/index.html"}
];
let activeFilter = "All";
let currencyMode = "both";
const grid = document.getElementById("motorcycleGrid");
const searchInput = document.getElementById("searchInput");
const currencySelect = document.getElementById("currencySelect");
const toast = document.getElementById("toast");

function moneyUSD(n){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);}
function moneyIDR(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Math.round(n*USD_TO_IDR));}
function priceHTML(model){
  if(currencyMode==="usd") return `<strong>${moneyUSD(model.price)}+</strong><small>US starting MSRP · 2026</small>`;
  if(currencyMode==="idr") return `<strong>${moneyIDR(model.price)}*</strong><small>Illustrative conversion · not local MSRP</small>`;
  return `<strong>${moneyUSD(model.price)}+</strong><small>Approx. ${moneyIDR(model.price)}*</small>`;
}
function renderModels(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = models.filter(m=>(activeFilter==="All"||m.category===activeFilter)&&`${m.name} ${m.category} ${m.description}`.toLowerCase().includes(q));
  if(!filtered.length){grid.innerHTML='<div class="empty-state">No motorcycles match that search. Try another name or category.</div>';return;}
  grid.innerHTML = filtered.map(m=>`
    <article class="bike-card">
      <div class="bike-image-wrap"><img class="bike-image" src="${m.image}" alt="${m.year} Harley-Davidson ${m.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'"><span class="bike-tag">${m.tag}</span></div>
      <div class="bike-card-content"><div class="bike-category">${m.category.toUpperCase()} / ${m.year}</div><h3>${m.name}</h3><p class="bike-description">${m.description}</p><div class="bike-price">${priceHTML(m)}</div><div class="bike-card-footer"><button type="button" data-details="${m.name}">View details ↗</button><a href="${m.official}" target="_blank" rel="noopener">Official site</a></div></div>
    </article>`).join("");
}
function fillSelects(){
  const options=models.map(m=>`<option value="${m.name}">${m.name}</option>`).join("");
  document.getElementById("compareOne").innerHTML=options;
  document.getElementById("compareTwo").innerHTML=options;
  document.getElementById("compareTwo").selectedIndex=1;
  document.getElementById("testRideModel").innerHTML='<option value="">Choose a model</option>'+options;
  updateComparison();
}
function updateComparison(){
  const a=models.find(m=>m.name===document.getElementById("compareOne").value)||models[0];
  const b=models.find(m=>m.name===document.getElementById("compareTwo").value)||models[1];
  const card=m=>`<div class="compare-result"><h3>${m.name}</h3><p>${m.category} · Model year ${m.year}<br>${m.description}</p><strong>${moneyUSD(m.price)}+ USD</strong><p>Approx. ${moneyIDR(m.price)} IDR*</p></div>`;
  document.getElementById("compareResults").innerHTML=card(a)+card(b);
}
function showToast(message){
  toast.textContent=message;toast.classList.add("show");
  window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>toast.classList.remove("show"),3600);
}
document.getElementById("filterGroup").addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]");if(!btn)return;
  activeFilter=btn.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b===btn));
  renderModels();
});
searchInput.addEventListener("input",renderModels);
currencySelect.addEventListener("change",()=>{currencyMode=currencySelect.value;renderModels();});
grid.addEventListener("click",e=>{
  const btn=e.target.closest("[data-details]");if(!btn)return;
  const m=models.find(x=>x.name===btn.dataset.details);if(!m)return;
  showToast(`${m.name} · ${m.category} · Starting US MSRP ${moneyUSD(m.price)}. Local pricing and availability vary.`);
});
document.getElementById("compareOne").addEventListener("change",updateComparison);
document.getElementById("compareTwo").addEventListener("change",updateComparison);
document.getElementById("testRideForm").addEventListener("submit",e=>{
  e.preventDefault();
  const form=new FormData(e.currentTarget);
  const subject=encodeURIComponent(`Test ride inquiry — ${form.get("model")}`);
  const body=encodeURIComponent(`Hello,\n\nI would like to ask about a test ride.\nName: ${form.get("name")}\nEmail: ${form.get("email")}\nModel: ${form.get("model")}\nPreferred market: ${form.get("market")}\n\nPlease share availability and local pricing.\n`);
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
  showToast("Your email draft is being prepared. Choose a dealer email address to send it.");
});
document.getElementById("whatsappLink").addEventListener("click",e=>{
  // Demo link only: replace wa.me/ with your dealer's full international number before publishing.
  if(e.currentTarget.getAttribute("href")==="https://wa.me/"){e.preventDefault();showToast("Demo setup: add your dealer's WhatsApp number in js/script.js before publishing.");}
});
const menuToggle=document.getElementById("menuToggle"), mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
const progress=document.getElementById("pageProgress");
window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+"%";},{passive:true});
renderModels();fillSelects();
