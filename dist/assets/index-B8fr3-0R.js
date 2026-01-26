(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const N={app:document.querySelector("#app")},F="https://your-energy.b.goit.study";async function g(t,e={}){const a=await fetch(`${F}${t}`,{headers:{"Content-Type":"application/json",...e.headers||{}},...e});if(!a.ok){let n=`HTTP ${a.status}`;try{const r=await a.json();n=(r==null?void 0:r.message)||n}catch{}throw new Error(n)}return a.json()}const b={getQuote:()=>g("/api/quote"),getFilters:(t,e,a)=>{const n=new URLSearchParams;return t&&n.set("filter",t),e&&n.set("page",String(e)),a&&n.set("limit",String(a)),g(`/api/filters?${n.toString()}`)},getExercises:(t={})=>{const e=new URLSearchParams;return Object.entries(t).forEach(([a,n])=>{n!=null&&n!==""&&e.set(a,String(n))}),g(`/api/exercises?${e.toString()}`)},getExerciseById:t=>g(`/api/exercises/${t}`),rateExercise:(t,e)=>g(`/api/exercises/${t}/rating`,{method:"PATCH",body:JSON.stringify(e)}),subscribe:t=>g("/api/subscription",{method:"POST",body:JSON.stringify({email:t})})},f={quote:"ye_quote",favorites:"ye_favorites"};function _(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function L(t,e){localStorage.setItem(t,JSON.stringify(e))}function O(){return _(f.quote,null)}function R(t){L(f.quote,t)}function w(){return _(f.favorites,[])}function A(t){L(f.favorites,t)}function v(t){return w().some(e=>String(e.id)===String(t))}function $(t){const e=w(),a=String(t.id),n=e.some(s=>String(s.id)===a),r=n?e.filter(s=>String(s.id)!==a):[t,...e];return A(r),{next:r,exists:!n}}function B(){const t=new Date,e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`}function d(t,e="info"){const a=document.createElement("div");a.textContent=t,a.setAttribute("role","status"),a.style.cssText=`
    position: fixed; left: 16px; bottom: 16px; z-index: 9999;
    padding: 10px 12px; border-radius: 10px; max-width: 320px;
    background: ${e==="error"?"#ffdddd":e==="success"?"#ddffea":"#e9e9ff"};
    color: #111; box-shadow: 0 10px 30px rgba(0,0,0,.15);
    font: 14px/1.3 system-ui, -apple-system, Segoe UI, Roboto, Arial;
  `,document.body.appendChild(a),setTimeout(()=>a.remove(),2600)}function k(t=0){const e=Math.max(0,Math.min(5,Number(t)||0)),a=Math.round(e);return"★★★★★".slice(0,a)+"☆☆☆☆☆".slice(0,5-a)}function y({quote:t,author:e}){return`
    <section class="quote">
      <h2>Quote of the day</h2>
      <p class="quote__text">${l(t||"")}</p>
      <p class="quote__author">${l(e||"")}</p>
      <p class="quote__note">Щоденна фізична активність тривалістю щонайменше 110 хвилин — важлива для здоров’я та енергії.</p>
    </section>
  `}function H(t){return`
    <div class="tabs" role="tablist" aria-label="Filters">
      ${[{id:"Muscles",label:"Muscles"},{id:"Body parts",label:"Body parts"},{id:"Equipment",label:"Equipment"}].map(a=>`
        <button class="tab ${t===a.id?"is-active":""}"
          role="tab" aria-selected="${t===a.id}"
          data-tab="${a.id}">
          ${a.label}
        </button>`).join("")}
    </div>
  `}function I(t,e){const a=(t==null?void 0:t.name)||(t==null?void 0:t.title)||"",n=(t==null?void 0:t.imgURL)||(t==null?void 0:t.img)||(t==null?void 0:t.image)||"";return`
    <li class="card card--category">
      <button class="card__btn" data-category="${p(a)}" data-filter="${p(e)}">
        ${n?`<img class="card__img" src="${p(n)}" alt="${p(a)}" loading="lazy">`:""}
        <span class="card__title">${l(a)}</span>
        <span class="card__meta">${l(e)}</span>
      </button>
    </li>
  `}function T(t){const e=(t==null?void 0:t._id)||(t==null?void 0:t.id),a=(t==null?void 0:t.name)||"",n=(t==null?void 0:t.rating)||0,r=(t==null?void 0:t.bodyPart)||(t==null?void 0:t.bodypart)||"",s=(t==null?void 0:t.target)||"",o=(t==null?void 0:t.burnedCalories)||(t==null?void 0:t.burned)||(t==null?void 0:t.calories)||"",i=(t==null?void 0:t.time)||(t==null?void 0:t.duration)||(t==null?void 0:t.durationMinutes)||"",c=v(e);return`
    <li class="card card--exercise">
      <div class="card__top">
        <span class="badge">WORKOUT</span>
        <span class="stars" aria-label="Rating">${k(n)}</span>
        <button class="fav" type="button" aria-label="Toggle favorite" data-fav="${p(e)}">
          ${c?"♥":"♡"}
        </button>
      </div>

      <h3 class="card__title">${l(a)}</h3>

      <p class="card__meta">
        <span><b>Body part:</b> ${l(r)}</span>
        <span><b>Target:</b> ${l(s)}</span>
      </p>

      <p class="card__meta">
        <span><b>Burned:</b> ${l(String(o))}</span>
        <span><b>Time:</b> ${l(String(i))}</span>
      </p>

      <button class="start" type="button" data-start="${p(e)}">Start →</button>
    </li>
  `}function h(t){return`<ul class="grid">${t}</ul>`}function D(t=""){return`
    <form class="search" id="searchForm" role="search" aria-label="Search exercises">
      <input name="keyword" value="${p(t)}" placeholder="Search" aria-label="Search by name" />
      <button type="submit" aria-label="Search">🔎</button>
    </form>
  `}function l(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function p(t){return l(t).replace(/"/g,"&quot;")}function S({page:t,totalPages:e}){const a=Number(t)||1,n=Number(e)||1,r=a<=1,s=a>=n;return`
    <nav class="pagination" aria-label="Pagination">
      <button type="button" data-page="1" ${r?"disabled":""} aria-label="First">«</button>
      <button type="button" data-page="${a-1}" ${r?"disabled":""} aria-label="Prev">‹</button>
      <span class="pagination__current">${a}</span>
      <button type="button" data-page="${a+1}" ${s?"disabled":""} aria-label="Next">›</button>
      <button type="button" data-page="${n}" ${s?"disabled":""} aria-label="Last">»</button>
    </nav>
  `}const U=/^\w+((\.\w+)?|(\-\w+)?)@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function j(t){const e=document.createElement("div");e.className="modal-backdrop",e.innerHTML=`
    <div class="modal modal--small" role="dialog" aria-modal="true" aria-label="Rating">
      <button class="modal__close" aria-label="Close">×</button>
      <div class="modal__content">
        <h2>Rating</h2>
        <form id="ratingForm">
          <div class="rating-stars" aria-label="Choose rating">
            ${[1,2,3,4,5].map(r=>`
              <label>
                <input type="radio" name="rating" value="${r}" ${r===5?"checked":""}/>
                <span>${r}</span>
              </label>
            `).join("")}
          </div>

          <input name="email" type="email" placeholder="Email" aria-label="Email" required />
          <textarea name="comment" placeholder="Your comment" aria-label="Comment"></textarea>
          <button type="submit" class="btn">Send</button>
        </form>
      </div>
    </div>
  `;function a(){e.remove(),window.removeEventListener("keydown",n)}function n(r){r.key==="Escape"&&a()}e.addEventListener("click",r=>{r.target===e&&a()}),e.querySelector(".modal__close").addEventListener("click",a),e.querySelector("#ratingForm").addEventListener("submit",async r=>{r.preventDefault();const s=new FormData(r.currentTarget),o=Number(s.get("rating")),i=String(s.get("email")||"").trim(),c=String(s.get("comment")||"").trim();if(!U.test(i)){d("Invalid email format","error");return}try{await b.rateExercise(t,{rating:o,email:i,comment:c}),d("Rating sent successfully","success"),a()}catch(m){d(m.message||"Rating error","error")}}),document.body.appendChild(e),window.addEventListener("keydown",n)}async function q(t){const e=await b.getExerciseById(t),a=document.createElement("div");a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-label="Exercise details">
      <button class="modal__close" aria-label="Close">×</button>
      <div class="modal__body">
        <div class="modal__media">
          ${e!=null&&e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name||"Exercise"}" loading="lazy">`:""}
        </div>

        <div class="modal__content">
          <h2>${(e==null?void 0:e.name)||""}</h2>
          <div class="modal__row">
            <span class="stars">${k((e==null?void 0:e.rating)||0)}</span>
            <span class="meta"><b>Popular:</b> ${(e==null?void 0:e.popularity)??""}</span>
          </div>

          <div class="modal__grid">
            <div><b>Target</b><div>${(e==null?void 0:e.target)||""}</div></div>
            <div><b>Body Part</b><div>${(e==null?void 0:e.bodyPart)||""}</div></div>
            <div><b>Equipment</b><div>${(e==null?void 0:e.equipment)||""}</div></div>
          </div>

          <div class="modal__row">
            <span><b>Burned Calories:</b> ${(e==null?void 0:e.burnedCalories)??""}</span>
            <span><b>Time:</b> ${(e==null?void 0:e.time)??""}</span>
          </div>

          <p>${(e==null?void 0:e.description)||""}</p>

          <div class="modal__actions">
            <button type="button" class="btn" data-favbtn>
              ${v(t)?"Remove from favorites ♡":"Add to favorites ♥"}
            </button>
            <button type="button" class="btn btn--outline" data-ratebtn>Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `;function n(){a.remove(),window.removeEventListener("keydown",r)}function r(s){s.key==="Escape"&&n()}a.addEventListener("click",s=>{s.target===a&&n()}),a.querySelector(".modal__close").addEventListener("click",n),a.querySelector("[data-favbtn]").addEventListener("click",()=>{const s={id:t,name:e==null?void 0:e.name,burnedCalories:e==null?void 0:e.burnedCalories,time:e==null?void 0:e.time,target:e==null?void 0:e.target,bodyPart:e==null?void 0:e.bodyPart,rating:e==null?void 0:e.rating},o=$(s);d(o.exists?"Added to favorites":"Removed from favorites","success"),a.querySelector("[data-favbtn]").textContent=v(t)?"Remove from favorites ♡":"Add to favorites ♥"}),a.querySelector("[data-ratebtn]").addEventListener("click",()=>{n(),j(t)}),document.body.appendChild(a),window.addEventListener("keydown",r)}const P=10;async function Q(t){const e={filterTab:t.filterTab||"Muscles",category:t.category||"",keyword:t.keyword||"",page:Number(t.page)||1,view:t.view||"categories"},a=await z(),n=H(e.filterTab);let r="",s="";try{if(e.view==="categories"){const o=await b.getFilters(e.filterTab,e.page,P),i=(o==null?void 0:o.results)||(o==null?void 0:o.items)||o||[];i.length?r=h(i.map(c=>I(c,e.filterTab)).join("")):r='<p class="empty">No categories found</p>',s=S({page:e.page,totalPages:(o==null?void 0:o.totalPages)||(o==null?void 0:o.pages)||1})}else{const o=K(e),i=await b.getExercises(o),c=(i==null?void 0:i.results)||(i==null?void 0:i.items)||i||[];c.length?r=h(c.map(T).join("")):r='<p class="empty">No exercises found</p>',s=S({page:e.page,totalPages:(i==null?void 0:i.totalPages)||(i==null?void 0:i.pages)||1})}}catch(o){d(o.message||"Load error","error"),r=`<p class="empty">Error: ${o.message}</p>`}return`
    <section class="home">
      <div class="home__left">
        ${a}
      </div>

      <div class="home__right">
        ${D(e.keyword)}
        ${n}

        <div class="content" id="content">
          ${r}
        </div>

        <div id="pagination">
          ${s}
        </div>
      </div>
    </section>
  `}function J(t,e,a){t.addEventListener("click",async r=>{const s=r.target.closest("[data-tab]");if(s){const u=s.dataset.tab;e({...a(),filterTab:u,view:"categories",category:"",page:1});return}const o=r.target.closest("[data-category]");if(o){const u=o.dataset.category,M=o.dataset.filter;e({...a(),filterTab:M,view:"exercises",category:u,page:1});return}const i=r.target.closest("[data-start]");if(i){await q(i.dataset.start);return}const c=r.target.closest("[data-fav]");if(c){const u=c.dataset.fav;$({id:u}),e({...a()},{replace:!0});return}const m=r.target.closest("[data-page]");if(m){const u=Number(m.dataset.page);e({...a(),page:u});return}});const n=t.querySelector("#searchForm");n&&n.addEventListener("submit",r=>{r.preventDefault();const s=new FormData(r.currentTarget).get("keyword");e({...a(),keyword:String(s||"").trim(),view:"exercises",page:1})})}async function z(){const t=O(),e=B();if((t==null?void 0:t.date)===e&&(t!=null&&t.data))return y(t.data);try{const a=await b.getQuote();return R({date:e,data:a}),y(a)}catch{return t!=null&&t.data?y(t.data):'<section class="quote"><h2>Quote of the day</h2><p class="empty">Quote unavailable</p></section>'}}function K(t){const e={page:t.page,limit:P};return t.keyword&&(e.keyword=t.keyword),t.category&&(t.filterTab==="Muscles"&&(e.muscles=t.category),t.filterTab==="Body parts"&&(e.bodypart=t.category),t.filterTab==="Equipment"&&(e.equipment=t.category)),e}function Y(){const t=w();return`
    <section class="favorites">
      <h1>Favorites</h1>
      <div class="content">${t.length===0?'<p class="empty">Favorites list is empty</p>':h(t.map(a=>T({id:a.id,name:a.name,burnedCalories:a.burnedCalories,time:a.time,target:a.target,bodyPart:a.bodyPart,rating:a.rating})).join(""))}</div>
    </section>
  `}function G(t,e,a){t.addEventListener("click",async n=>{const r=n.target.closest("[data-start]");if(r){await q(r.dataset.start);return}const s=n.target.closest("[data-fav]");s&&($({id:s.dataset.fav}),e({...a()},{replace:!0}))})}function Z({mount:t}){let e=E();async function a(){(e.route||"home")==="favorites"?(t.innerHTML=Y(),G(t,n,()=>e)):(t.innerHTML=await Q(e),J(t,n,()=>e))}function n(r,s={}){e={...e,...r};const o=W(e);s.replace?history.replaceState(null,"",o):history.pushState(null,"",o),a()}return window.addEventListener("hashchange",()=>{e=E(),a()}),{render:a,navigate:n,getState:()=>e}}function E(){const t=location.hash.replace(/^#/,""),e=new URLSearchParams(t);return{route:e.get("route")||"home",filterTab:e.get("filterTab")||"Muscles",category:e.get("category")||"",keyword:e.get("keyword")||"",page:Number(e.get("page")||1),view:e.get("view")||"categories"}}function W(t){const e=new URLSearchParams;return e.set("route",t.route||"home"),e.set("filterTab",t.filterTab||"Muscles"),t.category&&e.set("category",t.category),t.keyword&&e.set("keyword",t.keyword),e.set("page",String(t.page||1)),e.set("view",t.view||"categories"),`#${e.toString()}`}const C=Z({mount:N.app});C.render();V();tt();X();x();function V(){document.addEventListener("click",t=>{const e=t.target.closest("[data-route]");e&&C.navigate({route:e.dataset.route,page:1,view:"categories",category:"",keyword:""})})}function X(){const t=document.querySelector(".burger"),e=document.querySelector(".mobile-menu");if(!t||!e)return;function a(){e.hidden=!1,t.setAttribute("aria-expanded","true"),document.body.style.overflow="hidden"}function n(){e.hidden=!0,t.setAttribute("aria-expanded","false"),document.body.style.overflow=""}t.addEventListener("click",()=>{t.getAttribute("aria-expanded")==="true"?n():a()}),e.addEventListener("click",r=>{r.target.closest("[data-route]")&&n()}),window.addEventListener("keydown",r=>{r.key==="Escape"&&n()}),window.addEventListener("hashchange",n)}function x(){function t(){const e=location.hash.replace(/^#/,""),n=new URLSearchParams(e).get("route")||"home";document.querySelectorAll("[data-route]").forEach(r=>{if(!(r instanceof HTMLElement))return;const s=r.dataset.route===n;r.classList.toggle("is-active",s),r.matches("a")&&r.setAttribute("aria-current",s?"page":"false")})}t(),window.addEventListener("hashchange",t)}function tt(){document.addEventListener("submit",async t=>{const e=t.target.closest("#subscribeForm");if(!e)return;t.preventDefault();const a=String(new FormData(e).get("email")||"").trim();if(!a){d("Enter email","error");return}try{await b.subscribe(a),d("Subscribed successfully","success"),e.reset()}catch(n){d(n.message||"Subscribe error","error")}})}
