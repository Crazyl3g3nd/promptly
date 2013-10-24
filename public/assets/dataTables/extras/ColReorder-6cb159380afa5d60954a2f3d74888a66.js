/*
 * File:        ColReorder.js
 * Version:     1.0.6
 * CVS:         $Id$
 * Description: Controls for column visiblity in DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Wed Sep 15 18:23:29 BST 2010
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     DataTables
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 */
(function(a,b,c){function d(a){var b=[];for(var c=0,d=a.length;c<d;c++)b[a[c]]=c;return b}function e(a,b,c){var d=a.splice(b,1)[0];a.splice(c,0,d)}function f(a,b,c){var d=[];for(var e=0,f=a.childNodes.length;e<f;e++)a.childNodes[e].nodeType==1&&d.push(a.childNodes[e]);var g=d[b];c!==null?a.insertBefore(g,d[c]):a.appendChild(g)}a.fn.dataTableExt.oApi.fnColReorder=function(b,c,g){var h,i,j,k,l=b.aoColumns.length,m,n;if(c==g)return;if(c<0||c>=l){this.oApi._fnLog(b,1,"ColReorder 'from' index is out of bounds: "+c);return}if(g<0||g>=l){this.oApi._fnLog(b,1,"ColReorder 'to' index is out of bounds: "+g);return}var o=[];for(h=0,i=l;h<i;h++)o[h]=h;e(o,c,g);var p=d(o);for(h=0,i=b.aaSorting.length;h<i;h++)b.aaSorting[h][0]=p[b.aaSorting[h][0]];if(b.aaSortingFixed!==null)for(h=0,i=b.aaSortingFixed.length;h<i;h++)b.aaSortingFixed[h][0]=p[b.aaSortingFixed[h][0]];for(h=0,i=l;h<i;h++){n=b.aoColumns[h];for(j=0,k=n.aDataSort.length;j<k;j++)n.aDataSort[j]=p[n.aDataSort[j]]}for(h=0,i=l;h<i;h++)n=b.aoColumns[h],typeof n.mDataProp=="number"&&(n.mDataProp=p[n.mDataProp],n.fnGetData=b.oApi._fnGetObjectDataFn(n.mDataProp),n.fnSetData=b.oApi._fnSetObjectDataFn(n.mDataProp));if(b.aoColumns[c].bVisible){var q=this.oApi._fnColumnIndexToVisible(b,c),r=null;h=g<c?g:g+1;while(r===null&&h<l)r=this.oApi._fnColumnIndexToVisible(b,h),h++;m=b.nTHead.getElementsByTagName("tr");for(h=0,i=m.length;h<i;h++)f(m[h],q,r);if(b.nTFoot!==null){m=b.nTFoot.getElementsByTagName("tr");for(h=0,i=m.length;h<i;h++)f(m[h],q,r)}for(h=0,i=b.aoData.length;h<i;h++)b.aoData[h].nTr!==null&&f(b.aoData[h].nTr,q,r)}e(b.aoColumns,c,g),e(b.aoPreSearchCols,c,g);for(h=0,i=b.aoData.length;h<i;h++)a.isArray(b.aoData[h]._aData)&&e(b.aoData[h]._aData,c,g),e(b.aoData[h]._anHidden,c,g);for(h=0,i=b.aoHeader.length;h<i;h++)e(b.aoHeader[h],c,g);if(b.aoFooter!==null)for(h=0,i=b.aoFooter.length;h<i;h++)e(b.aoFooter[h],c,g);for(h=0,i=l;h<i;h++)a(b.aoColumns[h].nTh).unbind("click"),this.oApi._fnSortAttachListener(b,b.aoColumns[h].nTh,h);a(b.oInstance).trigger("column-reorder",[b,{iFrom:c,iTo:g,aiInvertMapping:p}]),typeof b.oInstance._oPluginFixedHeader!="undefined"&&b.oInstance._oPluginFixedHeader.fnUpdate()},ColReorder=function(a,b){return(!this.CLASS||this.CLASS!="ColReorder")&&alert("Warning: ColReorder must be initialised with the keyword 'new'"),typeof b=="undefined"&&(b={}),this.s={dt:null,init:b,fixed:0,dropCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]},this.dom={drag:null,pointer:null},this.s.dt=a.fnSettings(),this._fnConstruct(),ColReorder.aoInstances.push(this),this},ColReorder.prototype={fnReset:function(){var a=[];for(var b=0,c=this.s.dt.aoColumns.length;b<c;b++)a.push(this.s.dt.aoColumns[b]._ColReorder_iOrigCol);this._fnOrderColumns(a)},_fnConstruct:function(){var a=this,b,c;typeof this.s.init.iFixedColumns!="undefined"&&(this.s.fixed=this.s.init.iFixedColumns),typeof this.s.init.fnReorderCallback!="undefined"&&(this.s.dropCallback=this.s.init.fnReorderCallback);for(b=0,c=this.s.dt.aoColumns.length;b<c;b++)b>this.s.fixed-1&&this._fnMouseListener(b,this.s.dt.aoColumns[b].nTh),this.s.dt.aoColumns[b]._ColReorder_iOrigCol=b;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(b,c){a._fnStateSave.call(a,c)},"ColReorder_State");var e=null;typeof this.s.init.aiOrder!="undefined"&&(e=this.s.init.aiOrder.slice()),this.s.dt.oLoadedState&&typeof this.s.dt.oLoadedState.ColReorder!="undefined"&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length&&(e=this.s.dt.oLoadedState.ColReorder);if(e)if(!a.s.dt._bInitComplete){var f=!1;this.s.dt.aoDrawCallback.push({fn:function(){if(!a.s.dt._bInitComplete&&!f){f=!0;var b=d(e);a._fnOrderColumns.call(a,b)}},sName:"ColReorder_Pre"})}else{var g=d(e);a._fnOrderColumns.call(a,g)}},_fnOrderColumns:function(b){if(b.length!=this.s.dt.aoColumns.length){this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");return}for(var c=0,d=b.length;c<d;c++){var f=a.inArray(c,b);c!=f&&(e(b,f,c),this.s.dt.oInstance.fnColReorder(f,c))}(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt)},_fnStateSave:function(b){var c,d,e,f,g=this.s.dt;for(c=0;c<b.aaSorting.length;c++)b.aaSorting[c][0]=g.aoColumns[b.aaSorting[c][0]]._ColReorder_iOrigCol;aSearchCopy=a.extend(!0,[],b.aoSearchCols),b.ColReorder=[];for(c=0,d=g.aoColumns.length;c<d;c++)f=g.aoColumns[c]._ColReorder_iOrigCol,b.aoSearchCols[f]=aSearchCopy[c],b.abVisCols[f]=g.aoColumns[c].bVisible,b.ColReorder.push(f)},_fnMouseListener:function(b,c){var d=this;a(c).bind("mousedown.ColReorder",function(a){a.preventDefault(),d._fnMouseDown.call(d,a,c)})},_fnMouseDown:function(b,d){var e=this,f=this.s.dt.aoColumns,g=b.target.nodeName=="TH"?b.target:a(b.target).parents("TH")[0],h=a(g).offset();this.s.mouse.startX=b.pageX,this.s.mouse.startY=b.pageY,this.s.mouse.offsetX=b.pageX-h.left,this.s.mouse.offsetY=b.pageY-h.top,this.s.mouse.target=d,this.s.mouse.targetIndex=a("th",d.parentNode).index(d),this.s.mouse.fromIndex=this.s.dt.oInstance.oApi._fnVisibleToColumnIndex(this.s.dt,this.s.mouse.targetIndex),this.s.aoTargets.splice(0,this.s.aoTargets.length),this.s.aoTargets.push({x:a(this.s.dt.nTable).offset().left,to:0});var i=0;for(var j=0,k=f.length;j<k;j++)j!=this.s.mouse.fromIndex&&i++,f[j].bVisible&&this.s.aoTargets.push({x:a(f[j].nTh).offset().left+a(f[j].nTh).outerWidth(),to:i});this.s.fixed!==0&&this.s.aoTargets.splice(0,this.s.fixed),a(c).bind("mousemove.ColReorder",function(a){e._fnMouseMove.call(e,a)}),a(c).bind("mouseup.ColReorder",function(a){e._fnMouseUp.call(e,a)})},_fnMouseMove:function(a){var b=this;if(this.dom.drag===null){if(Math.pow(Math.pow(a.pageX-this.s.mouse.startX,2)+Math.pow(a.pageY-this.s.mouse.startY,2),.5)<5)return;this._fnCreateDragNode()}this.dom.drag.style.left=a.pageX-this.s.mouse.offsetX+"px",this.dom.drag.style.top=a.pageY-this.s.mouse.offsetY+"px";var c=!1;for(var d=1,e=this.s.aoTargets.length;d<e;d++)if(a.pageX<this.s.aoTargets[d-1].x+(this.s.aoTargets[d].x-this.s.aoTargets[d-1].x)/2){this.dom.pointer.style.left=this.s.aoTargets[d-1].x+"px",this.s.mouse.toIndex=this.s.aoTargets[d-1].to,c=!0;break}c||(this.dom.pointer.style.left=this.s.aoTargets[this.s.aoTargets.length-1].x+"px",this.s.mouse.toIndex=this.s.aoTargets[this.s.aoTargets.length-1].to)},_fnMouseUp:function(b){var d=this;a(c).unbind("mousemove.ColReorder"),a(c).unbind("mouseup.ColReorder"),this.dom.drag!==null&&(c.body.removeChild(this.dom.drag),c.body.removeChild(this.dom.pointer),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(),this.s.dropCallback!==null&&this.s.dropCallback.call(this),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt))},_fnCreateDragNode:function(){var b=this;this.dom.drag=a(this.s.dt.nTHead.parentNode).clone(!0)[0],this.dom.drag.className+=" DTCR_clonedTable";while(this.dom.drag.getElementsByTagName("caption").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("caption")[0]);while(this.dom.drag.getElementsByTagName("tbody").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("tbody")[0]);while(this.dom.drag.getElementsByTagName("tfoot").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("tfoot")[0]);a("thead tr:eq(0)",this.dom.drag).each(function(){a("th:not(:eq("+b.s.mouse.targetIndex+"))",this).remove()}),a("tr",this.dom.drag).height(a("tr:eq(0)",b.s.dt.nTHead).height()),a("thead tr:gt(0)",this.dom.drag).remove(),a("thead th:eq(0)",this.dom.drag).each(function(c){this.style.width=a("th:eq("+b.s.mouse.targetIndex+")",b.s.dt.nTHead).width()+"px"}),this.dom.drag.style.position="absolute",this.dom.drag.style.top="0px",this.dom.drag.style.left="0px",this.dom.drag.style.width=a("th:eq("+b.s.mouse.targetIndex+")",b.s.dt.nTHead).outerWidth()+"px",this.dom.pointer=c.createElement("div"),this.dom.pointer.className="DTCR_pointer",this.dom.pointer.style.position="absolute",this.s.dt.oScroll.sX===""&&this.s.dt.oScroll.sY===""?(this.dom.pointer.style.top=a(this.s.dt.nTable).offset().top+"px",this.dom.pointer.style.height=a(this.s.dt.nTable).height()+"px"):(this.dom.pointer.style.top=a("div.dataTables_scroll",this.s.dt.nTableWrapper).offset().top+"px",this.dom.pointer.style.height=a("div.dataTables_scroll",this.s.dt.nTableWrapper).height()+"px"),c.body.appendChild(this.dom.pointer),c.body.appendChild(this.dom.drag)}},ColReorder.aoInstances=[],ColReorder.fnReset=function(a){for(var b=0,c=ColReorder.aoInstances.length;b<c;b++)ColReorder.aoInstances[b].s.dt.oInstance==a&&ColReorder.aoInstances[b].fnReset()},ColReorder.prototype.CLASS="ColReorder",ColReorder.VERSION="1.0.6",ColReorder.prototype.VERSION=ColReorder.VERSION,typeof a.fn.dataTable=="function"&&typeof a.fn.dataTableExt.fnVersionCheck=="function"&&a.fn.dataTableExt.fnVersionCheck("1.9.0")?a.fn.dataTableExt.aoFeatures.push({fnInit:function(a){var b=a.oInstance;if(typeof b._oPluginColReorder=="undefined"){var c=typeof a.oInit.oColReorder!="undefined"?a.oInit.oColReorder:{};b._oPluginColReorder=new ColReorder(a.oInstance,c)}else b.oApi._fnLog(a,1,"ColReorder attempted to initialise twice. Ignoring second");return null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.9.0 or greater - www.datatables.net/download")})(jQuery,window,document);