(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{143:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),o=d(n(0)),i=d(n(65));n(368),n(370);var r=d(n(157));function d(e){return e&&e.__esModule?e:{default:e}}var l=n(62).NavLink,c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={nextpath:void 0,paths:["/bacon-and-eggs","/can-i-leave-my-washing-out","/battle-boy","/blob","/day-and-night","/mimic/1","/mimic/2","/mimic/3","/sorter/1","/micro-garden"],unlisten:null},a.setNextRoute=function(){var e=window.location.pathname,t=a.state.paths.indexOf(e);if(-1!=t){t++;var n=a.state.paths[t];a.setState({nextpath:n})}},a.onClicked=function(){a.state.nextpath&&i.default.push(a.state.nextpath)},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.default.Component),a(t,[{key:"componentDidMount",value:function(){var n=this;this.setNextRoute(),this.state.unlisten=i.default.listen(function(e,t){n.setNextRoute()})}},{key:"componentWillUnmount",value:function(){this.state.unlisten()}},{key:"render",value:function(){return o.default.createElement("nav",null,o.default.createElement("ul",{className:"nav-bar"},o.default.createElement("li",null,o.default.createElement(l,{to:"/"},o.default.createElement(r.default,{wrapperClass:"diamond-nav",topDiamondClass:"diamond-red",rightDiamondClass:"diamond-blue",leftDiamondClass:"diamond-green",bottomDiamondClass:"diamond-black"}))),o.default.createElement("li",null,o.default.createElement(l,{exact:!0,to:"/"},"Experiments")),o.default.createElement("li",null,o.default.createElement(l,{to:"/about"},"About")),o.default.createElement("li",{className:null==this.state.nextpath?"hidden":"",onClick:this.onClicked},o.default.createElement("i",{className:"fas fa-arrow-right"}))))}}]),t}();t.default=c},157:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),i=n(0),d=(a=i)&&a.__esModule?a:{default:a};function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(158);var r=function(e){function r(){var e,t,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r);for(var a=arguments.length,o=Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=n=l(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(o)))).mainDiamondClicked=function(){n.props.mainDiamondClicked&&n.props.mainDiamondClicked()},n.topDiamondClicked=function(){n.props.topDiamondClicked&&n.props.topDiamondClicked()},n.rightDiamondClicked=function(){n.props.rightDiamondClicked&&n.props.rightDiamondClicked()},n.leftDiamondClicked=function(){n.props.leftDiamondClicked&&n.props.leftDiamondClicked()},n.bottomDiamondClicked=function(){n.props.bottomDiamondClicked&&n.props.bottomDiamondClicked()},l(n,t)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,d.default.Component),o(r,[{key:"render",value:function(){return d.default.createElement(d.default.Fragment,null,d.default.createElement("div",{onClick:this.mainDiamondClicked,id:this.props.wrapperId?this.props.wrapperId:"",className:this.props.wrapperClass?this.props.wrapperClass+" diamond-holder":" diamond-holder"},d.default.createElement("div",{onClick:this.topDiamondClicked,className:this.props.topDiamondClass+" diamond"}),d.default.createElement("div",{onClick:this.rightDiamondClicked,className:this.props.rightDiamondClass+" diamond"}),d.default.createElement("div",{onClick:this.leftDiamondClicked,className:this.props.leftDiamondClass+" diamond"}),d.default.createElement("div",{onClick:this.bottomDiamondClicked,className:this.props.bottomDiamondClass+" diamond"})),this.props.children)}}]),r}();t.default=r},158:function(e,t,n){var a=n(159);"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(61)(a,o);a.locals&&(e.exports=a.locals)},159:function(e,t,n){(e.exports=n(60)(!1)).push([e.i,".diamond-holder{background:#fff;height:275px;width:275px;display:flex;flex-wrap:wrap}.diamond,.diamond-holder{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.diamond{height:47%;width:47%;margin:2%;opacity:1;-webkit-filter:brightness(100%);filter:brightness(100%)}.diamond:hover{cursor:pointer}.diamond-red{background:#e74c3c;background:var(--diamond-red)}.diamond-blue{background:#81cfe0;background:var(--diamond-blue)}.diamond-green{background:#6c9;background:var(--diamond-green)}.diamond-black{background:#4d4d4d;background:var(--diamond-black)}.diamond-holder .diamond:first-child{margin-bottom:0}.diamond-holder .diamond{-webkit-transform:rotate(0deg);transform:rotate(0deg)}.diamond-holder .diamond:nth-child(2){margin-left:0;margin-bottom:0}.diamond-holder .diamond:last-child{margin-left:0}.fade-wrapper{margin-top:20px}@media(max-width:767px){.diamond-holder{height:200px;width:200px}}",""])},368:function(e,t,n){var a=n(369);"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(61)(a,o);a.locals&&(e.exports=a.locals)},369:function(e,t,n){(e.exports=n(60)(!1)).push([e.i,".nav-bar{display:flex;background:#24252a;margin:0;padding:0;color:#fff;list-style:none;height:56px;align-items:center;position:fixed;width:100%;z-index:1000}.nav-bar li{padding:0 14px}.nav-bar li:last-child{margin-left:auto}.nav-bar li:last-child .next{font-size:32px}.nav-bar li:hover,.nav-bar li:hover a{color:#6c9;cursor:pointer;transition:.5s}.nav-bar a{color:#fff;text-decoration:none}.nav-bar .active{color:#6c9;text-decoration:underline}.nav-bar li:first-child{width:117px;display:flex;align-items:center;justify-content:center}.nav-bar .diamond-nav{height:67px;width:67px;margin-top:54px;transition:1.5s;-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:99}.nav-bar .diamond-nav:hover{cursor:pointer;-webkit-animation:spin;animation:spin;transition:1.5s;-webkit-transform:rotate(225deg);transform:rotate(225deg)}@media(max-width:767px){.nav-bar{height:40px}.nav-bar li:first-child{width:80px}.nav-bar li{padding:0 8px}.nav-bar .diamond-nav{height:45px;width:45px;margin-top:39px}.nav-bar li:last-child .next{font-size:24px}}",""])},370:function(e,t,n){var a=n(371);"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(61)(a,o);a.locals&&(e.exports=a.locals)},371:function(e,t,n){(e.exports=n(60)(!1)).push([e.i,".center-wrapper-menu{align-items:center;display:flex;justify-content:center;height:100vh;font-size:0}.diamond-menu{background:#fff;display:flex;flex-wrap:wrap}.diamond-menu,.diamond-menu-indent{height:100px;width:100px;-webkit-transform:rotate(45deg);transform:rotate(45deg);position:fixed;bottom:24px}.diamond-menu-indent{background:#f5f6fa;z-index:-2}.diamond-menu .item{height:42.5px;width:42.5px;margin:5px}.diamond-menu .item1{background:#e74c3c;background:var(--diamond-red);margin-bottom:0}.diamond-menu .item1:hover{background:red}.diamond-menu .item2{background:#81cfe0;background:var(--diamond-blue);margin-left:0;margin-bottom:0}.diamond-menu .item2:hover{background:#00f}.diamond-menu .item3{background:#6c9;background:var(--diamond-green)}.diamond-menu .item3:hover{background:green}.diamond-menu .item4{background:#4d4d4d;background:var(--diamond-black);margin-left:0}.diamond-menu .item4:hover{background:#000}.diamond-menu-bar{position:fixed;bottom:0;height:74px;background:#fff;width:100%;z-index:-3;background:#f1a9a0}",""])}}]);