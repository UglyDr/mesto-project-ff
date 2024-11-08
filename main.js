(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"436a2701-c36a-4cbe-9b74-22184735d0c6","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},n=document.querySelector("#card-template").content;function r(e,t){var r=t.deleteCard,o=t.onLike,c=t.handleImageClick,a=n.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title");u.textContent=e.name,i.src=e.link,i.alt=e.name;var l=a.querySelector(".card__delete-button");return void 0===e._id?l.addEventListener("click",(function(){return r()})):l.style.display="none",a.querySelector(".card__like-button").addEventListener("click",o),i.addEventListener("click",(function(){c(i,u)})),a}function o(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){return n.remove()})).catch((function(e){console.log(e)}))}function c(e){e.target.classList.toggle("card__like-button_is-active")}function a(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),100),document.addEventListener("keydown",u),document.addEventListener("click",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),document.removeEventListener("click",l)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup_is-opened")&&i(e.target)}var s=function(e,t){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(e,t){var n=document.querySelector(".".concat(e.id,"-error"));e.classList.remove(t.inputErrorClass),n.classList.remove(t.errorClass),n.textContent=""}(e,t):function(e,t,n){var r=document.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),r.classList.add(n.errorClass),r.textContent=t}(e,e.validationMessage,t)},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,f=document.querySelector(".content").querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_closeProfile"),h=document.querySelector(".popup_closeNewCard"),S=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),b=document.forms["edit-profile"],C=document.forms["new-place"],q=document.querySelector(".profile__info"),L=q.querySelector(".profile__title"),g=q.querySelector(".profile__description"),E=S.querySelector(".popup__input_type_name"),x=S.querySelector(".popup__input_type_description"),j=k.querySelector(".popup__input_type_card-name"),A=k.querySelector(".popup__input_type_url"),w=document.querySelector(".popup_type_image"),I=w.querySelector(".popup__image"),T=w.querySelector(".popup__caption"),U=document.querySelector(".popup_imageClose");function B(e,t){I.setAttribute("src",e.src),I.setAttribute("alt",t.textContent),T.textContent=t.textContent,a(w)}document.querySelectorAll(".popup__input"),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];L.textContent=i.name,g.textContent=i.about,i._id,u.forEach((function(e){var t=r(e,{deleteCard:o,onLike:c,handleImageClick:B});f.append(t)}))})).catch((function(e){return console.error(e)})),y.addEventListener("click",(function(){b.elements.name.value=L.textContent,b.elements.description.value=g.textContent,a(S)})),v.addEventListener("click",(function(){i(S)})),_.addEventListener("click",(function(){a(k)})),h.addEventListener("click",(function(){i(k)})),U.addEventListener("click",(function(){i(w)})),b.addEventListener("submit",(function(e){e.preventDefault(),L.textContent=E.value,g.textContent=x.value,i(S)})),C.addEventListener("submit",(function(n){var a;n.preventDefault(),(a={name:j.value,link:A.value,alt:j.value}.name,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})}).then(t)).then((function(e){var t=r(e,{deleteCard:o,onLike:c,handleImageClick:B});f.prepend(t),i(k),C.reset()})).catch((function(e){return console.error(e)})),n.target.reset()})),m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(m.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(e){e.addEventListener("input",(function(){s(e,t),d(n,r,t)}))}))}(e,m)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){f.append(r(e,{deleteCard:o,onLike:c,handleImageClick:B}))}))})();