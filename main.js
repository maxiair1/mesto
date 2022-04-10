(()=>{"use strict";var e={cardTemplate:"#template-card",cardImage:".element__image",cardTitle:".element__title",cardLike:".element__heart",cardRemove:".element__trash",cardElement:".element",cardContainer:".elements",cardLikeActive:"element__heart_black_active",cardLikeCount:".element__heart-count",cardNameInput:"addCard-name",cardLinkInput:"addCard-link",cardFormName:"addCard-form",cardFormDelete:"deleteCard-form",cardPopupDelete:".popup_type_card-delete"},t={profileName:".profile__title",profileAbout:".profile__subtitle",profileNameInput:"profile-name",profileAboutInput:"profile-about",profileFormName:"profile-form",profileFormAvatar:"profileAvatar-form",profilePopupAvatar:".popup_type_profile-avatar"};function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n=function(){function e(t,r,n,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardData=t,this._cardParam=r,this._handleCardClick=n,this._handleLikeClick=o,this._handleCardDelete=i,this._likeCounter=t.likes.length,this._element=document.querySelector(this._cardParam.cardTemplate).content.querySelector(this._cardParam.cardElement).cloneNode(!0),this._cardRemove=this._element.querySelector(this._cardParam.cardRemove)}var t,n;return t=e,(n=[{key:"generate",value:function(){return this._cardImage=this._element.querySelector(this._cardParam.cardImage),this._cardTitle=this._element.querySelector(this._cardParam.cardTitle),this._cardLike=this._element.querySelector(this._cardParam.cardLike),this._cardLikeCount=this._element.querySelector(this._cardParam.cardLikeCount),this._cardTitle.textContent=this._cardData.name,this._cardLikeCount.textContent=this._likeCounter,this._cardImage.src=this._cardData.link,this._cardImage.alt=this._cardData.name,this._checkLike(),this._addListeners(),this._isCardOwner(),this._element}},{key:"_addListeners",value:function(){var e=this;this._cardLike.addEventListener("click",(function(){return e._handleLikeClick(e._cardData._id)})),this._cardRemove.addEventListener("click",(function(){return e._handleCardDelete(e._cardData._id)})),this._cardImage.addEventListener("click",(function(){return e._handleCardClick(e._cardData.name,e._cardData.link)}))}},{key:"setLikes",value:function(e){this._likeCounter=e.length,this._cardLikeCount.textContent=this._likeCounter,this._cardData.likes=e,this._checkLike()}},{key:"isLiked",value:function(){var e=this,t=!1;return this._cardData.likes.forEach((function(r){r._id===e._cardData.userId&&(t=!0)})),t}},{key:"_checkLike",value:function(){this.isLiked()?this._cardLike.classList.add(this._cardParam.cardLikeActive):this._cardLike.classList.remove(this._cardParam.cardLikeActive)}},{key:"remove",value:function(){this._element.remove(),this._element=null}},{key:"_isCardOwner",value:function(){this._cardData.owner._id!==this._cardData.userId&&(this._cardRemove.style.display="none")}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._validateParams=t,this._validateForm=r,this._inputList=this._createInputList(),this._buttonElement=this._validateForm.querySelector(this._validateParams.submitButtonSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._validateForm.addEventListener("submit",(function(e){return e.preventDefault()})),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_createInputList",value:function(){return Array.from(this._validateForm.querySelectorAll(this._validateParams.inputSelector))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._validateParams.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._validateParams.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var r=this._validateForm.querySelector(".".concat(e.id,"-error"));e.classList.add(this._validateParams.inputErrorClass),r.textContent=t,r.classList.add(this._validateParams.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._validateForm.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._validateParams.inputErrorClass),t.classList.remove(this._validateParams.errorClass),t.textContent=""}},{key:"resetValidation",value:function(){this._toggleButtonState(),this._clearInputErrors()}},{key:"resetForm",value:function(){this._validateForm.reset()}},{key:"_clearInputErrors",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&o(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(t,r){var n=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),console.log("cardList:",n),this._renderedItems=n,this._renderer=o,this._container=document.querySelector(r)}var t,r;return t=e,(r=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this;this.clear(),this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&a(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupContainer=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._closeButton=this._popupContainer.querySelector(".popup__button-close")}var t,r;return t=e,(r=[{key:"open",value:function(){this._popupContainer.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupContainer.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupContainer.addEventListener("mousedown",(function(t){t.target!==t.currentTarget&&t.target!==e._closeButton||e.close()}))}}])&&s(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=d(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},p.apply(this,arguments)}function d(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function _(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(n);if(o){var r=m(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return _(this,e)});function a(e,t){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._formSubmit=t,r._form=r._popupContainer.querySelector(".popup__form"),r._inputList=r._popupContainer.querySelectorAll(".popup__input"),r._submitButton=r._popupContainer.querySelectorAll(".popup__button-submit"),r}return t=a,(r=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"getInputProfile",value:function(){return this._formValues={},this._formValues.name=this._inputList[0].value,this._formValues.about=this._inputList[1].value,console.log("inputProfile: ",this._formValues),this._formValues}},{key:"getInputCard",value:function(){return this._formValues={},this._formValues.name=this._inputList[0].value,this._formValues.link=this._inputList[1].value,console.log("inputCard: ",this._formValues),this._formValues}},{key:"getFormName",value:function(){return this._form.getAttribute("name")}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){return t.value=e[t.name]}))}},{key:"setEventListeners",value:function(){var e=this;p(m(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._formSubmit(e._getInputValues())}))}},{key:"close",value:function(){p(m(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setButtonText",value:function(e){this._submitButton.textContent=e}},{key:"updateSubmitHandler",value:function(e){this._formSubmit=e}}])&&f(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=g(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},k.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function L(e,t){return L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},L(e,t)}function C(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(n);if(o){var r=w(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return C(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageName=t._popupContainer.querySelector(".popup__subtitle"),t._imageLink=t._popupContainer.querySelector(".popup__image"),t}return t=a,(r=[{key:"open",value:function(e,t){this._imageLink.src=t,this._imageName.alt=e,this._imageName.textContent=e,k(w(a.prototype),"open",this).call(this)}}])&&b(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function P(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var S=function(){function e(t){var r=t.profileName,n=t.profileAbout;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(r),this._profileAbout=document.querySelector(n)}var t,r;return t=e,(r=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileAbout.textContent}}},{key:"setUserInfo",value:function(e,t){this._profileName.textContent=e,this._profileAbout.textContent=t}}])&&P(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function I(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(e,{method:t.method,headers:t.headers,body:t.body}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))},j=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.settings=t}var t,r;return t=e,(r=[{key:"getProfile",value:function(){return O("".concat(this.settings.baseUrl,"/users/me"),{headers:this.settings.headers})}},{key:"editProfile",value:function(e){return O("".concat(this.settings.baseUrl,"/users/me"),{method:"PATCH",headers:this.settings.headers,body:JSON.stringify({name:e.name,about:e.about})})}},{key:"getCards",value:function(){return O("".concat(this.settings.baseUrl,"/cards"),{headers:this.settings.headers})}},{key:"addCard",value:function(e){return O("".concat(this.settings.baseUrl,"/cards"),{method:"POST",headers:this.settings.headers,body:JSON.stringify({name:e.name,link:e.link})})}},{key:"deleteCard",value:function(e){return fetch("".concat(this.settings.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this.settings.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"addLike",value:function(e){return O("".concat(this.settings.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this.settings.headers})}},{key:"deleteLike",value:function(e){return O("".concat(this.settings.baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this.settings.headers})}}])&&I(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39",headers:{authorization:"026e3cd0-c777-4ed1-873d-bcc2b8a959a1","Content-Type":"application/json"}});function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}document.querySelector(".popup__form_type_profile-edit"),document.querySelector(".popup__form_type_card-add");var q,D=document.querySelector(".profile__button-edit"),V=document.querySelector(".profile__button-add"),R={};q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_type_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"},Array.from(document.querySelectorAll(q.formSelector)).forEach((function(e){var t=new i(q,e),r=e.getAttribute("name");R[r]=t,t.enableValidation()})),Promise.all([j.getProfile(),j.getCards()]).then((function(r){var o,i,a=(i=2,function(e){if(Array.isArray(e))return e}(o=r)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}}(o,i)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?T(e,t):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=a[0],c=a[1],l=new S(t);console.log("promiseAll: ",s,c),h(s);var f=new u({items:c,renderer:function(e){var t=d(e);f.addItem(t)}},e.cardContainer),p=function(e){var t=d(e);f.addItem(t),m.close()},d=function(t){t.userId=s._id;var r=new n(t,e,(function(){return _.open(t.name,t.link)}),(function(e){r.isLiked()?(console.log("isLiked2: ",r.isLiked()),j.deleteLike(e).then((function(e){return r.setLikes(e.likes)}))):(console.log("isLiked1: ",c),j.addLike(e).then((function(e){console.log("resLike: ",e),r.setLikes(e.likes)})))}),(function(e){v.open(),v.updateSubmitHandler((function(){v.setButtonText("Loading"),console.log("cardId: ",e),j.deleteCard(e).then((function(e){r.remove(),v.setButtonText("Yes"),v.close()}))}))}));return r.generate()};function h(e){var t=e.name,r=e.about;l.setUserInfo(t,r)}var _=new E(".popup_type_photo-open"),m=new y(".popup_type_card-add",(function(){j.addCard(m.getInputCard()).then((function(e){console.log("addCard: ",e),p(e)}))})),v=new y(".popup_type_card-delete",(function(){j.addCard(v.getInputCard()).then((function(e){console.log("addCard: ",e),p(e)}))})),b=new y(".popup_type_profile-edit",(function(){j.editProfile(b.getInputProfile()).then((function(e){h(e),b.close()}))}));f.renderItems(),_.setEventListeners(),b.setEventListeners(),m.setEventListeners(),v.setEventListeners(),D.addEventListener("click",(function(){var e,r=l.getUserInfo();b.setInputValues((A(e={},t.profileNameInput,r.name),A(e,t.profileAboutInput,r.about),e)),R[b.getFormName()].resetValidation(),b.open()})),V.addEventListener("click",(function(){R[m.getFormName()].resetValidation(),m.open()}))}))})();