"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[390],{7390:function(e,s,n){n.r(s),n.d(s,{default:function(){return k}});var t=n(9439),r=n(2791),a=n(1087),i=n(6030),c=n(7462),o=n(3366),l=n(4578);function d(e,s){return e.replace(new RegExp("(^|\\s)"+s+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var u=n(8875),p=n(8852),m=function(e,s){return e&&s&&s.split(" ").forEach((function(s){return t=s,void((n=e).classList?n.classList.remove(t):"string"===typeof n.className?n.className=d(n.className,t):n.setAttribute("class",d(n.className&&n.className.baseVal||"",t)));var n,t}))},x=function(e){function s(){for(var s,n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return(s=e.call.apply(e,[this].concat(t))||this).appliedClasses={appear:{},enter:{},exit:{}},s.onEnter=function(e,n){var t=s.resolveArguments(e,n),r=t[0],a=t[1];s.removeClasses(r,"exit"),s.addClass(r,a?"appear":"enter","base"),s.props.onEnter&&s.props.onEnter(e,n)},s.onEntering=function(e,n){var t=s.resolveArguments(e,n),r=t[0],a=t[1]?"appear":"enter";s.addClass(r,a,"active"),s.props.onEntering&&s.props.onEntering(e,n)},s.onEntered=function(e,n){var t=s.resolveArguments(e,n),r=t[0],a=t[1]?"appear":"enter";s.removeClasses(r,a),s.addClass(r,a,"done"),s.props.onEntered&&s.props.onEntered(e,n)},s.onExit=function(e){var n=s.resolveArguments(e)[0];s.removeClasses(n,"appear"),s.removeClasses(n,"enter"),s.addClass(n,"exit","base"),s.props.onExit&&s.props.onExit(e)},s.onExiting=function(e){var n=s.resolveArguments(e)[0];s.addClass(n,"exit","active"),s.props.onExiting&&s.props.onExiting(e)},s.onExited=function(e){var n=s.resolveArguments(e)[0];s.removeClasses(n,"exit"),s.addClass(n,"exit","done"),s.props.onExited&&s.props.onExited(e)},s.resolveArguments=function(e,n){return s.props.nodeRef?[s.props.nodeRef.current,e]:[e,n]},s.getClassNames=function(e){var n=s.props.classNames,t="string"===typeof n,r=t?""+(t&&n?n+"-":"")+e:n[e];return{baseClassName:r,activeClassName:t?r+"-active":n[e+"Active"],doneClassName:t?r+"-done":n[e+"Done"]}},s}(0,l.Z)(s,e);var n=s.prototype;return n.addClass=function(e,s,n){var t=this.getClassNames(s)[n+"ClassName"],r=this.getClassNames("enter").doneClassName;"appear"===s&&"done"===n&&r&&(t+=" "+r),"active"===n&&e&&(0,p.Q)(e),t&&(this.appliedClasses[s][n]=t,function(e,s){e&&s&&s.split(" ").forEach((function(s){return t=s,void((n=e).classList?n.classList.add(t):function(e,s){return e.classList?!!s&&e.classList.contains(s):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+s+" ")}(n,t)||("string"===typeof n.className?n.className=n.className+" "+t:n.setAttribute("class",(n.className&&n.className.baseVal||"")+" "+t)));var n,t}))}(e,t))},n.removeClasses=function(e,s){var n=this.appliedClasses[s],t=n.base,r=n.active,a=n.done;this.appliedClasses[s]={},t&&m(e,t),r&&m(e,r),a&&m(e,a)},n.render=function(){var e=this.props,s=(e.classNames,(0,o.Z)(e,["classNames"]));return r.createElement(u.ZP,(0,c.Z)({},s,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},s}(r.Component);x.defaultProps={classNames:""},x.propTypes={};var v=x,h=n(184),f=function(e){var s=e.item,n=e.deleteCartItems,c=(0,i.v9)((function(e){return e.user})).isAuthenticated,o=(0,r.useState)(!1),l=(0,t.Z)(o,2),d=l[0],u=l[1];return(0,h.jsx)(v,{in:!d,timeout:300,classNames:"cart-item-card",unmountOnExit:!0,children:(0,h.jsxs)("div",{className:"CartItemCard",children:[(0,h.jsx)("img",{src:s.image,alt:"ssa"}),(0,h.jsxs)("div",{children:[(0,h.jsx)(a.rU,{to:"/product/".concat(s.product),children:s.name}),c?(0,h.jsx)("span",{children:"Price: \u20b9".concat(s.price)}):(0,h.jsx)("div",{}),(0,h.jsx)("p",{onClick:function(){u(!0),setTimeout((function(){n(s.product)}),300)},children:"Remove"})]})]})})},j=n(9817),C=n(8302),g=n(7296),N=n(9616),E=n(2834),b=n(9202),y=n(5218),k=function(){var e=(0,N.s0)(),s=(0,i.I0)(),n=(0,i.v9)((function(e){return e.cart})).cartItems,c=(0,i.v9)((function(e){return e.user})).isAuthenticated,o=function(e){s((0,j.Sg)(e))},l=(0,r.useState)(!1),d=(0,t.Z)(l,2),u=d[0],p=d[1];return(0,h.jsxs)(r.Fragment,{children:[(0,h.jsx)(E.Z,{title:"Cart"}),0===n.length?(0,h.jsxs)("div",{className:"emptyCart",children:[(0,h.jsx)(g.Z,{}),(0,h.jsx)(C.Z,{children:"No Product in Your Cart"}),(0,h.jsx)(a.rU,{to:"/products",children:"View Products"})]}):(0,h.jsx)(r.Fragment,{children:(0,h.jsxs)("div",{className:"cartPage",children:[(0,h.jsxs)("div",{className:"cartHeader",children:[(0,h.jsx)("p",{children:"Product"}),(0,h.jsx)("p",{children:"Quantity"}),(0,h.jsx)("p",{children:"Price"})]}),n&&n.map((function(e,n){return(0,h.jsxs)("div",{className:"cartContainer",children:[(0,h.jsx)(f,{item:e,deleteCartItems:o}),(0,h.jsxs)("div",{className:"cartInput",children:[(0,h.jsx)("button",{onClick:function(){return function(e,n){var t=n-1;1>=n||(t?s((0,j.DW)(e,t)):y.Am.error("Input cannot be left blank."))}(e.product,e.quantity)},children:"-"}),(0,h.jsx)("input",{type:"number",min:"1",max:e.stock,value:e.quantity,onChange:function(n){return t=e.product,r=parseInt(n.target.value),(a=e.stock)<r?r=a:r<1&&(r=1),void(r?s((0,j.DW)(t,r)):y.Am.error("Input cannot be left blank."));var t,r,a}}),(0,h.jsx)("button",{onClick:function(){return function(e,n,t){var r=n+1;t<=n||(r?s((0,j.DW)(e,r)):y.Am.error("Input cannot be left blank."))}(e.product,e.quantity,e.stock)},children:"+"})]}),(0,h.jsx)("p",{className:"cartSubtotal",children:c?"\u20b9".concat((e.price*e.quantity).toFixed(2)):(0,h.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},className:"cartSubtotal__login",children:(0,h.jsx)(b.Z,{style:{color:"#051b4cee"}})})})]},e.product)})),(0,h.jsxs)("div",{className:"cartGrossTotal",children:[(0,h.jsx)("div",{}),(0,h.jsxs)("div",{className:"cartGrossTotalBox",children:[(0,h.jsx)("p",{children:"Gross Total"}),c?(0,h.jsx)("p",{children:"\u20b9".concat(Math.round(n.reduce((function(e,s){return e+s.quantity*s.price}),0)).toFixed(0))}):(0,h.jsx)("div",{children:(0,h.jsx)(b.Z,{style:{color:"#051b4cee",marginLeft:"5px"}})})]}),(0,h.jsx)("div",{}),(0,h.jsx)("div",{className:"checkOutBtn",children:(0,h.jsx)("button",{onClick:function(){e("/login?redirect=/shipping")},children:"Order Now"})})]}),(0,h.jsxs)("div",{className:"offer-section",children:[(0,h.jsxs)("div",{className:"offer-header",onClick:function(){p(!u)},children:[(0,h.jsx)("h3",{children:"Offers"}),u?(0,h.jsx)("span",{className:"close-icon",children:"-"}):(0,h.jsx)("span",{className:"open-icon",children:"+"})]}),u&&(0,h.jsx)("div",{className:"offer-content",children:(0,h.jsxs)("ul",{children:[(0,h.jsx)("li",{children:"Free shipping on orders above 100."}),(0,h.jsx)("li",{children:"Apply Coupon Code on checkout."})]})})]})]})})]})}},2834:function(e,s,n){n(2791);var t=n(4270),r=n(184);s.Z=function(e){var s=e.title;return(0,r.jsx)(t.Z,{children:(0,r.jsx)("title",{children:s})})}},7296:function(e,s,n){var t=n(4836),r=n(5263);s.Z=void 0;var a=r(n(2791)),i=(0,t(n(4894)).default)(a.createElement("path",{d:"M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"}),"RemoveShoppingCart");s.Z=i}}]);
//# sourceMappingURL=390.057cdf77.chunk.js.map