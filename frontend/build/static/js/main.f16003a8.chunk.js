(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{18:function(e,t,a){e.exports=a(30)},23:function(e,t,a){},24:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(14),c=a.n(r),i=(a(23),a(24),a(15)),o=a(1),m=function(){return l.a.createElement("div",null)},s=a(6),u=function(){var e=l.a.useState(""),t=Object(s.a)(e,2),a=(t[0],t[1]),n=l.a.useState(""),r=Object(s.a)(n,2),c=(r[0],r[1]),i=l.a.useState(""),o=Object(s.a)(i,2),m=(o[0],o[1],l.a.useState("")),u=Object(s.a)(m,2),E=(u[0],u[1]),p=l.a.useState(""),d=Object(s.a)(p,2),h=(d[0],d[1]);return l.a.createElement("div",{className:"login"},l.a.createElement("img",{src:"".concat("","/veggies.jpg"),className:"login__img"}),l.a.createElement("form",{onSubmit:function(){},className:"login__form"},l.a.createElement("h2",null,"Register Account"),l.a.createElement("label",null,"First Name"),l.a.createElement("input",{type:"text",placeholder:"Enter first name...",onChange:function(e){return E(e.target.value)}}),l.a.createElement("label",null,"Last Name"),l.a.createElement("input",{type:"text",placeholder:"Enter last name...",onChange:function(e){return h(e.target.value)}}),l.a.createElement("label",null,"Email"),l.a.createElement("input",{type:"text",placeholder:"Enter email...",onChange:function(e){return a(e.target.value)}}),l.a.createElement("label",null,"Password"),l.a.createElement("input",{type:"password",placeholder:"Enter password...",onChange:function(e){return c(e.target.value)}}),l.a.createElement("label",null,"Confirm Password"),l.a.createElement("input",{type:"password",placeholder:"Enter password...",onChange:function(e){return c(e.target.value)}}),l.a.createElement("input",{type:"submit",value:"Submit"}),l.a.createElement("div",{className:"sign-up-link"},"Already have an account? Sign in ",l.a.createElement("a",{href:"/login"},"here"))))},E=function(){return l.a.createElement("header",{className:"header"},l.a.createElement("a",{href:"/",className:"logo"},l.a.createElement("img",{src:"".concat("","/logo.svg"),style:{width:"250px"}})),l.a.createElement("nav",null,l.a.createElement("ul",{className:"nav__links"},l.a.createElement("li",null,l.a.createElement("a",{href:"#"},"Recipes")),l.a.createElement("li",null,l.a.createElement("a",{href:"/about"},"About")))),l.a.createElement("a",{className:"cta",href:"/login"},l.a.createElement("button",{className:"btn-primary"},"Log In")))},p=function(e){return l.a.createElement("a",{className:"recipe-card",style:{display:"flex"},href:"/viewRecipe"},l.a.createElement("img",{src:"".concat("","/veggies.jpg"),alt:"Avatar",style:{width:"10em",objectFit:"cover"}}),l.a.createElement("div",{className:"container"},l.a.createElement("h4",null,l.a.createElement("b",null,"Tempeh Stirfry")),l.a.createElement("p",null,"A magical recipe. This potion will kill your first born child and allow you to fly.")))},d=function(){return l.a.createElement("div",{className:"footer-container"},l.a.createElement("footer",{className:"footer"},l.a.createElement("p",{style:{textAlign:"center"}},"Plant Based Plates 2020")))},h=function(){return l.a.createElement("div",null,l.a.createElement(E,null),l.a.createElement("h1",{style:{textAlign:"center"}},"Good Afternoon, Jake!"),l.a.createElement("p",{style:{textAlign:"center",fontStyle:"italic"}},'"An object for pleasure and not a living breathing human being. It seems to make it easier to do things you shouldn\'t do." - Jeffery Dahmer'),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",margin:"0 2em"}},l.a.createElement("div",{style:{width:"30vw",justifyItems:"center"}},l.a.createElement("input",{type:"text",placeholder:"Search for recipes..."})),l.a.createElement("select",null,l.a.createElement("option",null,"New Recipes"),l.a.createElement("option",null,"Breakfast"),l.a.createElement("option",null,"Lunch"),l.a.createElement("option",null,"Dinner"),l.a.createElement("option",null,"Dessert"))),l.a.createElement("div",{className:"container"},l.a.createElement("h2",null,"New Recipes:"),l.a.createElement("div",{className:"recipe-card-container"},l.a.createElement(p,null),l.a.createElement(p,null),l.a.createElement(p,null)),l.a.createElement("hr",null),l.a.createElement("h2",null,"All Recipes:"),l.a.createElement("div",{className:"recipe-card-container"},l.a.createElement(p,null),l.a.createElement(p,null),l.a.createElement(p,null),l.a.createElement(p,null))),l.a.createElement(d,null))},g=a(17),v=function(e){return l.a.createElement("div",{className:e.visible?"modal-background-active":"modal-background"},l.a.createElement("div",{className:"modal"},e.children,l.a.createElement("span",{className:"modal-close",onClick:function(){return e.setVisible&&e.setVisible(!1)}},l.a.createElement(g.a,null))))},f=function(){var e=l.a.useState(!1),t=Object(s.a)(e,2),a=t[0],n=t[1];return l.a.createElement("div",{className:"about-page"},l.a.createElement(E,null),l.a.createElement("div",null,l.a.createElement("h1",null,"About Us"),l.a.createElement("div",{className:"about-page__content"},l.a.createElement("p",{className:"about-page__description"},"Plant based plates is a web app created by myself (Jake Ruth) as a way to bring plant based eaters together to share recipes, insights, and spread the joy of vegan cooking! I have found immense joy in creating meals are low cost, ethical, and better for the environment! Eating plant based is a great and easy way to do all of these things. My hope is that with our community, we can grow a large collection of plant based recipes to show the world that you don't have to restrict to eat a vegan diet! :)"),l.a.createElement("div",{className:"about-page__contact"},l.a.createElement("h2",null,"Contact Us!"),l.a.createElement("p",null,"Send an email to ",l.a.createElement("strong",null,"plantbasedplates@gmail.com")," for feedback and suggestions"),l.a.createElement("button",{className:"btn-primary",onClick:function(){return n(!0)}},"Sign up for mailing list!")))),l.a.createElement("div",{className:"footer-fixed"},l.a.createElement(d,null)),l.a.createElement(v,{visible:a,setVisible:n},l.a.createElement("h2",null,"Subscribe to our mailing list!"),l.a.createElement("label",null,"Enter your email:"),l.a.createElement("input",{type:"text"}),l.a.createElement("button",{className:"btn-primary",onClick:function(){return n(!a)}},"Submit")))},b=function(){return l.a.createElement("div",null,l.a.createElement(E,null),l.a.createElement("div",{className:"view-recipe"},l.a.createElement("div",{className:"view-recipe__header"},l.a.createElement("img",{src:"".concat("","/veggieStirFry.jpg"),alt:"stir fry",className:"view-recipe__img"}),l.a.createElement("div",null,l.a.createElement("h1",null,"Tempeh Stirfry"),l.a.createElement("p",null,"Prep Time: 10 minutes"),l.a.createElement("p",null,"Cook Time: 20 minutes"),l.a.createElement("p",null,"Total Time: 30 minutes"))),l.a.createElement("hr",null),l.a.createElement("div",{className:"view-recipe__content"},l.a.createElement("div",{className:"view-recipe__item"},l.a.createElement("h2",null,"Ingredients:"),l.a.createElement("ul",null,l.a.createElement("li",null,"Head"),l.a.createElement("li",null,"2 Legs"),l.a.createElement("li",null,"2 Arms"),l.a.createElement("li",null,"Eye sockets"))),l.a.createElement("div",{className:"view-recipe__item"},l.a.createElement("h2",null,"Instructions:"),l.a.createElement("ol",null,l.a.createElement("li",null,"Kill First born child."),l.a.createElement("li",null,"Chop up the body and skin the flesh from the boy"),l.a.createElement("li",null,"Saute very slightly, however not too much"),l.a.createElement("li",null,"Create a small slice in the head, this is important"),l.a.createElement("li",null,"Enjoy! Serves up to 3 people."),l.a.createElement("li",null,"Saute very slightly, however not too much"))))),l.a.createElement(d,null))},y=function(){return l.a.createElement(i.a,null,l.a.createElement(o.c,null,l.a.createElement(o.a,{path:"/",exact:!0,component:h}),l.a.createElement(o.a,{path:"/login",component:m}),l.a.createElement(o.a,{path:"/register",component:u}),l.a.createElement(o.a,{path:"/about",component:f}),l.a.createElement(o.a,{path:"/viewRecipe",component:b})))};var w=function(){return l.a.createElement("header",{"data-testid":"app-element"},l.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.f16003a8.chunk.js.map