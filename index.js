import{a as I,S as R,i}from"./assets/vendor-Db2TdIkw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const A="49627049-8ac1639d7a1db97b4097e2b9b",B="https://pixabay.com/api/";async function f(e,o=1){try{return(await I.get(B,{params:{key:A,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(r){throw console.error("Error fetching images: ",r),r}}let m;function y(e,o){const r=document.querySelector(".gallery"),n=e.map(({webformatURL:t,largeImageURL:s,tags:l,likes:S,views:q,comments:P,downloads:M})=>`
        <li class="gallery-item">
          <a href="${s}">
            <img class="gallery-img" src="${t}" alt="${l}" />
            <div class="info">
              <p class="info-item"><b>Likes:</b> ${S}</p>
              <p class="info-item"><b>Views:</b> ${q}</p>
              <p class="info-item"><b>Comments:</b> ${P}</p>
              <p class="info-item"><b>Downloads:</b> ${M}</p>
            </div>
          </a>
        </li>`).join("");r.insertAdjacentHTML("beforeend",n),m?m.refresh():m=new R(".gallery a"),document.querySelectorAll(".gallery-item").length}function E(){const e=document.querySelector(".gallery");e.innerHTML=""}function h(){document.querySelector(".load-more-wrapper .loader").classList.remove("hidden")}function p(){document.querySelector(".load-more-wrapper .loader").classList.add("hidden")}function b(){const e=document.querySelector(".load-more");e.classList.remove("hidden"),e.classList.add("is-visible")}function c(){const e=document.querySelector(".load-more");e.classList.remove("is-visible"),e.classList.add("hidden")}const $=document.querySelector(".form"),H=document.querySelector('input[name="search-text"]'),O=document.querySelector(".load-more"),d=document.querySelector(".loading-message");let g="",u=1,a=0;function L(e){return console.log("⏳ delaying..."),new Promise(o=>setTimeout(o,e))}function w(){d.classList.remove("hidden"),d.classList.add("visible")}function v(){d.classList.remove("visible"),d.classList.add("hidden")}$.addEventListener("submit",async e=>{e.preventDefault();const o=H.value.trim();if(!o){i.warning({message:"Please enter a search term!",position:"topRight"});return}g=o,u=1,a=0,c(),E(),h(),w(),await L(1e3);try{const r=await f(g,u);a=r.totalHits,r.hits.length===0?i.error({message:"Sorry, no images found. Please try a different search.",position:"topRight"}):(y(r.hits,a),document.querySelectorAll(".gallery-item").length<a?b():(c(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})))}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{p(),v()}});O.addEventListener("click",async()=>{u+=1,c(),h(),w(),await L(1e3);try{const e=await f(g,u);y(e.hits,a);const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),document.querySelectorAll(".gallery-item").length>=a?(c(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{i.error({message:"Error loading more images.",position:"topRight"})}finally{p(),v()}});
//# sourceMappingURL=index.js.map
