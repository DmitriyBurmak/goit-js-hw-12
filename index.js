import{a as I,S as P,i as c}from"./assets/vendor-Db2TdIkw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const A="49627049-8ac1639d7a1db97b4097e2b9b",B="https://pixabay.com/api/";async function h(e,s=1){try{return(await I.get(B,{params:{key:A,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}})).data}catch(r){throw console.error("Error fetching images: ",r),r}}let u;function y(e,s){const r=document.querySelector(".gallery"),n=e.map(({webformatURL:t,largeImageURL:o,tags:l,likes:v,views:S,comments:q,downloads:w})=>`
        <li class="gallery-item">
          <a href="${o}">
            <img class="gallery-img" src="${t}" alt="${l}" />
            <div class="info">
              <p class="info-item"><b>Likes:</b> ${v}</p>
              <p class="info-item"><b>Views:</b> ${S}</p>
              <p class="info-item"><b>Comments:</b> ${q}</p>
              <p class="info-item"><b>Downloads:</b> ${w}</p>
            </div>
          </a>
        </li>`).join("");r.insertAdjacentHTML("beforeend",n),u?u.refresh():u=new P(".gallery a"),document.querySelectorAll(".gallery-item").length}function E(){const e=document.querySelector(".gallery");e.innerHTML=""}function f(){document.querySelector(".load-more-wrapper .loader").classList.remove("hidden")}function p(){document.querySelector(".load-more-wrapper .loader").classList.add("hidden")}function b(){const e=document.querySelector(".load-more");e.classList.remove("hidden"),e.classList.add("is-visible")}function L(){const e=document.querySelector(".load-more");e.classList.remove("is-visible"),e.classList.add("hidden")}const M=document.querySelector(".form"),R=document.querySelector('input[name="search-text"]'),g=document.querySelector(".load-more");let m="",d=1,a=0;M.addEventListener("submit",async e=>{e.preventDefault();const s=R.value.trim();if(!s){c.warning({message:"Please enter a search term!",position:"topRight"});return}m=s,d=1,a=0,L(),i.classList.remove("hidden"),i.classList.add("visible"),E(),f();try{const r=await h(m,d);a=r.totalHits,r.hits.length===0?c.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):(y(r.hits,a),document.querySelectorAll(".gallery-item").length<a&&b())}catch{c.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{p(),i.classList.remove("visible"),i.classList.add("hidden")}});const i=document.querySelector(".loading-message");g.addEventListener("click",async()=>{d+=1,g.classList.add("hidden"),i.classList.remove("hidden"),i.classList.add("visible"),f();try{const e=await h(m,d);y(e.hits,a);const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),document.querySelectorAll(".gallery-item").length>=a?(L(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{c.error({message:"Error loading more images.",position:"topRight"})}finally{p(),i.classList.remove("visible"),i.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
