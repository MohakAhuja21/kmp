"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[381],{2381:function(e,s,i){i.r(s),i.d(s,{default:function(){return f}});var r=i(9439),t=i(9616),c=i(1087),n=i(2791),o=i(1968),l=i(6030),a=i(2058),d=i(9515),u=i(9817),m=i(2993),h=i(2834),x=i(5218),p=i(1946),j=i(184),f=function(){var e=(0,n.useRef)(null),s=(0,t.UO)().id,i=(0,l.I0)(),f=((0,l.v9)((function(e){return e.wishlist})).error,(0,t.UO)()),g=(0,l.v9)((function(e){return e.productDetails})),_=g.product,b=g.loading,v=g.error,k=(0,n.useState)([]),N=(0,r.Z)(k,2),y=N[0],S=N[1],w=(0,n.useState)([]),C=(0,r.Z)(w,2),P=C[0],T=C[1],B=(0,n.useState)(null),F=(0,r.Z)(B,2),Z=F[0],I=F[1];(0,n.useEffect)((function(){i((0,a.KL)(s)).then((function(e){S(e.similarProducts),I(e.percentageCheaper),T(e.substituteProducts)})),i((0,a.wv)()),window.scrollTo(0,0),v&&(x.Am.error(v),i((0,a.b9)()))}),[i,s,v]);var A=(0,n.useState)(1),D=(0,r.Z)(A,2),z=D[0],O=D[1],U=(0,l.v9)((function(e){return e.user})),L=(U.loading,U.user);U.isAuthenticated;return(0,j.jsx)(n.Fragment,{children:b?(0,j.jsx)(d.Z,{}):(0,j.jsxs)(n.Fragment,{children:[(0,j.jsx)(h.Z,{title:"Products / ".concat(_.name)}),(0,j.jsxs)("div",{className:"ProductDetails",children:[(0,j.jsx)(o.Z,{className:"productDetails_img_con",children:_.images&&_.images.map((function(e,s){return(0,j.jsx)("img",{className:"CarouselImage",src:e.url,alt:"".concat(s," Slide")},s)}))}),(0,j.jsxs)("div",{className:"productDetails_con",children:[(0,j.jsxs)("div",{className:"detailsBlock-1",children:[(0,j.jsx)("h2",{style:{marginTop:"15px"},children:_.name}),_.manufacturer&&(0,j.jsxs)("p",{children:[(0,j.jsx)("b",{children:"Manufacturer"}),":\xa0",_.manufacturer]}),_.salt_composition&&(0,j.jsxs)("p",{children:[(0,j.jsx)("b",{children:"Composition"}),":\xa0",_.salt_composition]}),_.packaging&&(0,j.jsxs)("p",{children:[(0,j.jsx)("b",{children:"Packaging"}),":\xa0",_.packaging]})]}),(0,j.jsxs)("div",{className:"detailsBlock-3",children:[(0,j.jsx)("h1",{children:"\u20b9".concat(_.price)}),(0,j.jsxs)("div",{className:"detailsBlock-3-1",children:[(0,j.jsxs)("div",{className:"detailsBlock-3-1-1",children:[(0,j.jsx)("button",{onClick:function(){1>=z||O(z-1)},children:"-"}),(0,j.jsx)("input",{readOnly:!0,type:"number",value:z}),(0,j.jsx)("button",{onClick:function(){_.stock<=z?x.Am.error("We currently have ".concat(_.stock," in stock.\n If you want more, please wait. Sorry for the inconvenience.\n Else wishlist and we will notify you !")):O(z+1)},children:"+"})]}),(0,j.jsx)("button",{className:"addToCart_btn",disabled:_.stock<1,onClick:function(){i((0,u.DW)(s,z)),x.Am.success("Item Added To Cart"),e&&e.current&&e.current.scrollIntoView({behavior:"smooth"})},children:"Add to Cart"}),(0,j.jsx)("button",{className:"wishlistButton",onClick:function(){if(L){var e={user:L._id,orderItems:[{product:f.id}]};console.log(e),i((0,m.Uh)(e)),x.Am.success("Product added in wishlist")}else x.Am.show("Login to add Product into Wishlist")},children:"WISHLIST"})]}),(0,j.jsxs)("p",{children:["Status:",(0,j.jsx)("b",{style:{marginLeft:"6px",fontSize:"18px"},className:_.stock<1?"redColor":"greenColor",children:_.stock<1?"Out Of Stock":"InStock"})]})]}),(0,j.jsxs)("div",{className:"detailsBlock-4",children:[(0,j.jsx)("b",{style:{borderBottom:"2px solid #FFBF00",fontSize:"21px"},children:"Description"}),":",(0,j.jsx)("p",{style:{marginTop:"8px",fontSize:"19px"},children:_.description})]}),_.common_side_effect&&(0,j.jsxs)("div",{className:"detailsBlock-5",style:{marginTop:"15px"},children:[(0,j.jsx)("b",{style:{borderBottom:"2px solid #FFBF00",fontSize:"20px"},children:"Common Side Effect :"}),(0,j.jsx)("br",{}),(0,j.jsx)("p",{style:{marginTop:"8px",fontSize:"18px"},children:_.common_side_effect})]}),(0,j.jsx)("div",{className:"similarProduct__box",children:y.length>0&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("h3",{children:"Similar products"}),(0,j.jsx)("div",{className:"similarProducts",ref:e,children:y.map((function(e){return(0,j.jsx)("div",{className:"shop__pro_recom",style:{marginTop:"15px"},children:(0,j.jsxs)(c.rU,{to:"/product/".concat(e._id),style:{textDecoration:"none",color:"black"},children:[(0,j.jsx)("img",{src:e.images[0].url,alt:"similar product image"}),(0,j.jsxs)("div",{className:"shop__des_reco",children:[(0,j.jsx)("h5",{children:e.name}),(0,j.jsxs)("p",{children:["\u20b9",e.price]})]})]})},e._id)}))})]})}),(0,j.jsx)("div",{className:"similarProduct__box",children:P.length>0&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("h3",{children:["Recommended Substitute",(0,j.jsx)(p.Z,{style:{color:"#082b79"}})]}),Z&&(0,j.jsxs)("p",{style:{marginTop:"2px"},children:["This medicine is"," ",(0,j.jsxs)("b",{className:"substitute__medPrice",children:[Z,"% cheaper"]}),"."]}),(0,j.jsx)("div",{className:"similarProducts similarProductsSubs",ref:e,children:P.map((function(e){return(0,j.jsx)("div",{className:"shop__pro_recom",style:{marginTop:"15px"},children:(0,j.jsxs)(c.rU,{to:"/product/".concat(e._id),style:{textDecoration:"none",color:"black"},children:[(0,j.jsx)("img",{src:e.images[0].url,alt:"substitute product image"}),(0,j.jsxs)("div",{className:"shop__des_reco",children:[(0,j.jsx)("h5",{children:e.name}),(0,j.jsxs)("h4",{children:["\u20b9",e.price]})]})]})},e._id)}))})]})})]})]})]})})}},2834:function(e,s,i){i(2791);var r=i(4270),t=i(184);s.Z=function(e){var s=e.title;return(0,t.jsx)(r.Z,{children:(0,t.jsx)("title",{children:s})})}}}]);
//# sourceMappingURL=381.7b48af0e.chunk.js.map