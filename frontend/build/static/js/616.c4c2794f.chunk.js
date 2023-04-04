"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[616],{7616:function(e,n,c){c.r(n),c.d(n,{default:function(){return j}});var r=c(9439),t=c(2791),s=c(1087),i=c(184),a=function(e){var n=e.item,c=e.deleteCartItems;return(0,i.jsxs)("div",{className:"CartItemCard",children:[(0,i.jsx)("img",{src:n.image,alt:"ssa"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(s.rU,{to:"/product/".concat(n.product),children:n.name}),(0,i.jsx)("span",{children:"Price: \u20b9".concat(n.price)}),(0,i.jsx)("p",{onClick:function(){return c(n.product)},children:"Remove"})]})]})},l=c(6030),d=c(9817),o=c(8302),u=c(7296),h=c(9616),x=c(2834),j=function(){var e=(0,h.s0)(),n=(0,l.I0)(),c=(0,l.v9)((function(e){return e.cart})).cartItems,j=function(e){n((0,d.Sg)(e))},p=(0,t.useState)(!1),m=(0,r.Z)(p,2),f=m[0],v=m[1];return(0,i.jsxs)(t.Fragment,{children:[(0,i.jsx)(x.Z,{title:"Cart"}),0===c.length?(0,i.jsxs)("div",{className:"emptyCart",children:[(0,i.jsx)(u.Z,{}),(0,i.jsx)(o.Z,{children:"No Product in Your Cart"}),(0,i.jsx)(s.rU,{to:"/products",children:"View Products"})]}):(0,i.jsx)(t.Fragment,{children:(0,i.jsxs)("div",{className:"cartPage",children:[(0,i.jsxs)("div",{className:"cartHeader",children:[(0,i.jsx)("p",{children:"Product"}),(0,i.jsx)("p",{children:"Quantity"}),(0,i.jsx)("p",{children:"Price"})]}),c&&c.map((function(e,c){return(0,i.jsxs)("div",{className:"cartContainer",children:[(0,i.jsx)(a,{item:e,deleteCartItems:j}),(0,i.jsxs)("div",{className:"cartInput",children:[(0,i.jsx)("button",{onClick:function(){return function(e,c){var r=c-1;1>=c||n((0,d.DW)(e,r))}(e.product,e.quantity)},children:"-"}),(0,i.jsx)("input",{type:"number",value:e.quantity,readOnly:!0}),(0,i.jsx)("button",{onClick:function(){return function(e,c,r){var t=c+1;r<=c||n((0,d.DW)(e,t))}(e.product,e.quantity,e.stock)},children:"+"})]}),(0,i.jsx)("p",{className:"cartSubtotal",children:"\u20b9".concat((e.price*e.quantity).toFixed(2))})]},e.product)})),(0,i.jsxs)("div",{className:"cartGrossTotal",children:[(0,i.jsx)("div",{}),(0,i.jsxs)("div",{className:"cartGrossTotalBox",children:[(0,i.jsx)("p",{children:"Gross Total"}),(0,i.jsx)("p",{children:"\u20b9".concat(c.reduce((function(e,n){return e+n.quantity*n.price}),0).toFixed(2))})]}),(0,i.jsx)("div",{}),(0,i.jsx)("div",{className:"checkOutBtn",children:(0,i.jsx)("button",{onClick:function(){e("/login?redirect=/shipping")},children:"Order Now"})})]}),(0,i.jsxs)("div",{className:"offer-section",children:[(0,i.jsxs)("div",{className:"offer-header",onClick:function(){v(!f)},children:[(0,i.jsx)("h3",{children:"Offers"}),f?(0,i.jsx)("span",{className:"close-icon",children:"-"}):(0,i.jsx)("span",{className:"open-icon",children:"+"})]}),f&&(0,i.jsx)("div",{className:"offer-content",children:(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:"Free shipping on orders above 100."}),(0,i.jsx)("li",{children:"Apply Coupon Code on checkout."})]})})]})]})})]})}},2834:function(e,n,c){c(2791);var r=c(4270),t=c(184);n.Z=function(e){var n=e.title;return(0,t.jsx)(r.Z,{children:(0,t.jsx)("title",{children:n})})}},7296:function(e,n,c){var r=c(4836),t=c(5263);n.Z=void 0;var s=t(c(2791)),i=(0,r(c(4894)).default)(s.createElement("path",{d:"M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"}),"RemoveShoppingCart");n.Z=i}}]);
//# sourceMappingURL=616.c4c2794f.chunk.js.map