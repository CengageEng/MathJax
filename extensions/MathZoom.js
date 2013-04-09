/*
 *  /MathJax/extensions/MathZoom.js
 *  
 *  Copyright (c) 2012 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

(function(a,d,f,c,j){var k="2.0";var i=a.CombineConfig("MathZoom",{styles:{"#MathJax_Zoom":{position:"absolute","background-color":"#F0F0F0",overflow:"auto",display:"block","z-index":301,padding:".5em",border:"1px solid black",margin:0,"font-weight":"normal","font-style":"normal","text-align":"left","text-indent":0,"text-transform":"none","line-height":"normal","letter-spacing":"normal","word-spacing":"normal","word-wrap":"normal","white-space":"nowrap","float":"none","box-shadow":"5px 5px 15px #AAAAAA","-webkit-box-shadow":"5px 5px 15px #AAAAAA","-moz-box-shadow":"5px 5px 15px #AAAAAA","-khtml-box-shadow":"5px 5px 15px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"},"#MathJax_ZoomOverlay":{position:"absolute",left:0,top:0,"z-index":300,display:"inline-block",width:"100%",height:"100%",border:0,padding:0,margin:0,"background-color":"white",opacity:0,filter:"alpha(opacity=0)"},"#MathJax_ZoomEventTrap":{position:"absolute",left:0,top:0,"z-index":302,display:"inline-block",border:0,padding:0,margin:0,"background-color":"white",opacity:0,filter:"alpha(opacity=0)"}}});var e,b,g;MathJax.Hub.Register.StartupHook("MathEvents Ready",function(){g=MathJax.Extension.MathEvents.Event;e=MathJax.Extension.MathEvents.Event.False;b=MathJax.Extension.MathEvents.Hover});var h=MathJax.Extension.MathZoom={version:k,settings:a.config.menuSettings,scrollSize:18,HandleEvent:function(n,l,m){if(h.settings.CTRL&&!n.ctrlKey){return true}if(h.settings.ALT&&!n.altKey){return true}if(h.settings.CMD&&!n.metaKey){return true}if(h.settings.Shift&&!n.shiftKey){return true}if(!h[l]){return true}return h[l](n,m)},Click:function(m,l){if(this.settings.zoom==="Click"){return this.Zoom(m,l)}},DblClick:function(m,l){if(this.settings.zoom==="Double-Click"){return this.Zoom(m,l)}},Hover:function(m,l){if(this.settings.zoom==="Hover"){this.Zoom(m,l);return true}return false},Zoom:function(n,s){this.Remove();b.ClearHoverTimer();g.ClearSelection();var q=MathJax.OutputJax[s.jaxID];var o=q.getJaxFromMath(s);if(o.hover){b.UnHover(o)}var l=Math.floor(0.85*document.body.clientWidth),r=Math.floor(0.85*Math.max(document.body.clientHeight,document.documentElement.clientHeight));var m=d.Element("span",{style:{position:"relative",display:"inline-block",height:0,width:0},id:"MathJax_ZoomFrame"},[["span",{id:"MathJax_ZoomOverlay",onmousedown:this.Remove}],["span",{id:"MathJax_Zoom",onclick:this.Remove,style:{visibility:"hidden",fontSize:this.settings.zscale,"max-width":l+"px","max-height":r+"px"}},[["span",{style:{display:"inline-block","white-space":"nowrap"}}]]]]);var x=m.lastChild,u=x.firstChild,p=m.firstChild;s.parentNode.insertBefore(m,s);if(u.addEventListener){u.addEventListener("mousedown",this.Remove,true)}if(this.msieTrapEventBug){var w=d.Element("span",{id:"MathJax_ZoomEventTrap",onmousedown:this.Remove});m.insertBefore(w,x)}if(this.msieZIndexBug){var t=d.addElement(document.body,"img",{src:"about:blank",id:"MathJax_ZoomTracker",width:0,height:0,style:{width:0,height:0,position:"relative"}});m.style.position="relative";m.style.zIndex=i.styles["#MathJax_ZoomOverlay"]["z-index"];m=t}var v=q.Zoom(o,u,s,l,r);if(this.msiePositionBug){if(this.msieSizeBug){x.style.height=v.zH+"px";x.style.width=v.zW+"px"}if(x.offsetHeight>r){x.style.height=r+"px";x.style.width=(v.zW+this.scrollSize)+"px"}if(x.offsetWidth>l){x.style.width=l+"px";x.style.height=(v.zH+this.scrollSize)+"px"}}if(this.operaPositionBug){x.style.width=Math.min(l,v.zW)+"px"}if(x.offsetWidth<l&&x.offsetHeight<r){x.style.overflow="visible"}this.Position(x,v);if(this.msieTrapEventBug){w.style.height=x.clientHeight+"px";w.style.width=x.clientWidth+"px";w.style.left=(parseFloat(x.style.left)+x.clientLeft)+"px";w.style.top=(parseFloat(x.style.top)+x.clientTop)+"px"}x.style.visibility="";if(this.settings.zoom==="Hover"){p.onmouseover=this.Remove}if(window.addEventListener){addEventListener("resize",this.Resize,false)}else{if(window.attachEvent){attachEvent("onresize",this.Resize)}else{this.onresize=window.onresize;window.onresize=this.Resize}}a.signal.Post(["math zoomed",o]);return e(n)},Position:function(p,r){var q=this.Resize(),m=q.x,s=q.y,l=r.mW;var o=-Math.floor((p.offsetWidth-l)/2),n=r.Y;p.style.left=Math.max(o,10-m)+"px";p.style.top=Math.max(n,10-s)+"px";if(!h.msiePositionBug){h.SetWH()}},offsetCalculator:{_init:function(){this.body=document.getElementsByTagName("body")[0];this.doesNotIncludeMarginInBodyOffset=(this.body.offsetTop!==1);this._isBoxModel()},offset:function(o){this._init();if(!o||!o.ownerDocument){return null}if(o===o.ownerDocument.body){return this._bodyOffset(o)}try{box=o.getBoundingClientRect()}catch(u){}var w=o.ownerDocument,m=w.documentElement;var r=w.body,s=this._getWindow(w),q=m.clientTop||r.clientTop||0,t=m.clientLeft||r.clientLeft||0,l=s.pageYOffset||this.boxModel&&m.scrollTop||r.scrollTop,p=s.pageXOffset||this.boxModel&&m.scrollLeft||r.scrollLeft,v=box.top+l-q,n=box.left+p-t;return{top:v,left:n}},_isBoxModel:function(){var l=document.createElement("div");l.style.width=l.style.paddingLeft="1px";document.body.appendChild(l);this.boxModel=l.offsetWidth===2;document.body.removeChild(l).style.display="none";l=null},_bodyOffset:function(l){var n=l.offsetTop,m=l.offsetLeft;if(this.doesNotIncludeMarginInBodyOffset){n+=parseFloat(jQuery.css(l,"marginTop"))||0;m+=parseFloat(jQuery.css(l,"marginLeft"))||0}return{top:n,left:m}},_getWindow:function(l){return this._isWindow(l)?l:l.nodeType===9?l.defaultView||l.parentWindow:false},_isWindow:function(l){return l&&typeof l==="object"&&"setInterval" in l}},Resize:function(n){if(h.onresize){h.onresize(n)}var l=0,r=0,o,q=document.getElementById("MathJax_ZoomFrame"),m=document.getElementById("MathJax_ZoomOverlay");var p=this.offsetCalculator.offset(m);l=p.left;r=p.top;if(h.operaPositionBug){q.style.border=""}m.style.left=(-l)+"px";m.style.top=(-r)+"px";if(h.msiePositionBug){setTimeout(h.SetWH,0)}else{h.SetWH()}return{x:l,y:r}},SetWH:function(){var l=document.getElementById("MathJax_ZoomOverlay");l.style.width=l.style.height="1px";var m=document.documentElement||document.body;l.style.width=m.scrollWidth+"px";l.style.height=Math.max(m.clientHeight,m.scrollHeight)+"px"},Remove:function(n){var p=document.getElementById("MathJax_ZoomFrame");if(p){var o=MathJax.OutputJax[p.nextSibling.jaxID];var l=o.getJaxFromMath(p.nextSibling);a.signal.Post(["math unzoomed",l]);p.parentNode.removeChild(p);p=document.getElementById("MathJax_ZoomTracker");if(p){p.parentNode.removeChild(p)}if(h.operaRefreshBug){var m=d.addElement(document.body,"div",{style:{position:"fixed",left:0,top:0,width:"100%",height:"100%",backgroundColor:"white",opacity:0},id:"MathJax_OperaDiv"});document.body.removeChild(m)}if(window.removeEventListener){removeEventListener("resize",h.Resize,false)}else{if(window.detachEvent){detachEvent("onresize",h.Resize)}else{window.onresize=h.onresize;delete h.onresize}}}return e(n)}};a.Browser.Select({MSIE:function(l){var n=(document.documentMode||0);var m=(n>=9);h.msiePositionBug=!m;h.msieSizeBug=l.versionAtLeast("7.0")&&(!document.documentMode||n===7||n===8);h.msieZIndexBug=(n<=7);h.msieInlineBlockAlignBug=(n<=7);h.msieTrapEventBug=!window.addEventListener;if(document.compatMode==="BackCompat"){h.scrollSize=52}if(m){delete i.styles["#MathJax_Zoom"].filter}},Opera:function(l){h.operaPositionBug=true;h.operaRefreshBug=true}});h.topImg=(h.msieInlineBlockAlignBug?d.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}):d.Element("span",{style:{width:0,height:0,display:"inline-block"}}));if(h.operaPositionBug||h.msieTopBug){h.topImg.style.border="1px solid"}MathJax.Callback.Queue(["StartupHook",MathJax.Hub.Register,"Begin Styles",{}],["Styles",f,i.styles],["Post",a.Startup.signal,"MathZoom Ready"],["loadComplete",f,"[MathJax]/extensions/MathZoom.js"])})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.OutputJax["HTML-CSS"],MathJax.OutputJax.NativeMML);