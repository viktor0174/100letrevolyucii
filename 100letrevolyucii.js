/**
	Please! Download this script first settings.js
*/
// var hidePreloader='preloader';	
var Revolution_section_id = 0;
var GetData = false;
var domain = location.origin;
function PageTotalSet100Let (url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);	
	xhr.responseType = 'text';
	xhr.onload = function () {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				hidePreloader();
				var res = $(xhr.response).find('.pager_total').html();
				var PagerTotal= parseInt(res.replace(/\D+/g,"")) / 10;
				var i=1;
				f=function(){
					uri = domain + "/Publications/100letrevolyucii_section_"+Revolution_section_id+"?page="+i;					
					create_xmlhttp();
						xmlHttp.open("GET",uri, true);
						xmlHttp.onreadystatechange = ADDContent100let;
						xmlHttp.send(null);
				   i=i+1; if (i<PagerTotal+1) setTimeout(f, "2000");
				};
				f();
			}
		}
	};
	xhr.send(null);
}
 
function ready() {	
	scrollTopPage();
	if(pathArray.length > 4){
		console.log(pathArray.length);
	}
}

document.addEventListener("DOMContentLoaded", ready);

function create_xmlhttp(){
	try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP")}
	catch(e){
		try{xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}
		catch(e2){
			xmlHttp=false
		}
	}
	if(!xmlHttp&&typeof XMLHttpRequest!='undefined'){
		xmlHttp=new XMLHttpRequest()
	}
}

function scrollTopPage(){	
	destination = $(".rev_menuHeader").offset().top;
	$("body,html").animate({scrollTop: destination }, 800);	
}

function Revolution_section(id){ Revolution_section_id = id; }

function titles(responseHTML){
	var titl = responseHTML.match(/<title>[\S\s]*<\/title>/gi);
		titl = titl[0].replace(/<\/?[^>]+>/g,'');
	document.title=titl;
}

function hidePreloader() { setTimeout("document.getElementById(preloader).style.display='none';",1000); }

function viewPreloader() {
	return;
	document.getElementById(pleloader).style.left=(document.body.clientWidth/2)-(75)+'px';	
	document.getElementById(pleloader).style.display='block';
}

function updateContent(){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){			
			var responseHTML = xmlHttp.responseText;
			titles(responseHTML);
			var ContentSection = responseHTML.match(/<div\s+class="item"\s+id="item">[\S\s]*<div class="endListNews">/gi);			 
			$("#rev_Content").empty();
			$("#rev_Content").append(ContentSection);
			RevolutionParamSection(Revolution_section_id);			
			/*
			if(Revolution_section_id != 0){
				if($.isNumeric(Revolution_section_id)==true){setAttrItem(Revolution_section_id);}
			}
			*/
			if($.isNumeric(Revolution_section_id)==true){setAttrItem(Revolution_section_id);}
		}
		if(xmlHttp.status==404){alert(alertInfo[0])}
		if(xmlHttp.status==500){alert(alertInfo[1])}
		if(xmlHttp.status==403){alert(alertInfo[2])}
		GetData = true;
		scrollTopPage();
		hidePreloader();
	}	
}

function ADDContent100let(){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){			
			var responseHTML = xmlHttp.responseText;			
			var ContentSection = responseHTML.match(/<div\s+class="item"\s+id="item">[\S\s]*<div class="endListNews">/gi);
			if(ContentSection == null) {
				hidePreloader();
				return;
			}
			$("#rev_Content").append(ContentSection);
			/*
			if(Revolution_section_id != 0){
				if($.isNumeric(Revolution_section_id)==true){setAttrItem(Revolution_section_id);}
			}
			*/
			if($.isNumeric(Revolution_section_id)==true){setAttrItem(Revolution_section_id);}
		}
		if(xmlHttp.status==404){alert(alertInfo[0])}
		if(xmlHttp.status==500){alert(alertInfo[1])}
		if(xmlHttp.status==403){alert(alertInfo[2])}
		GetData = true;		
		hidePreloader();
	}	
}

function RevolutionParamSection(id){
	if(id==2){
		create("div", {'id':'SectionLiteratura', 'class':'SectionLiteratura'}, 'rev_Content', 'Child');
		create("div", {'id':'BlockIMG_section0', 'class':'BlockIMG_section2', 'onclick':'RevolutionGetData("'+domain+'/htmlpages/Show/100letrevolyucii/Literatura/Detskie", "2")'}, 'SectionLiteratura', 'Child');
		create("div", {'id':'BlockIMG_section1', 'class':'BlockIMG_section2'}, 'SectionLiteratura', 'Child');
		create("div", {'id':'BlockIMG_section2', 'class':'BlockIMG_section2', 'onclick':'RevolutionGetData("'+domain+'/htmlpages/Show/100letrevolyucii/Literatura/Vzroslye", "2")'}, 'SectionLiteratura', 'Child');	
	}
}

function create(name, attributes, parent, insert){
		var el= document.createElement(name);
		var p = '';	
		for(var key in attributes) {	   
		   if(key=='id') 		el.id = attributes[key];
		   if(key=='href' && name=='a')	el.href = attributes[key];
		   if(key=='class')	 el.className = attributes[key];
		   if(key=='text')	 el.innerHTML = attributes[key];		
		   if(key=='type')	 el.setAttribute('type', attributes[key]);
		   if(key=='value')	 el.setAttribute('value',attributes[key]);
		   if(key=='onclick')el.setAttribute('onClick',''+attributes[key]+'');		   
		   if(key=='onmouseout' )el.setAttribute('onmouseout', ''+attributes[key]+'');
		   if(key=='onmouseover')el.setAttribute('onmouseover',''+attributes[key]+'');		   
		}		
		if(parent!="") p = document.getElementById(parent);
		else p=document.body;
		//
		if(insert=='Before') p.insertBefore(el, p.firstChild);
		if(insert=='Child' ) p.appendChild( el);
	}
/**
	** Если выводим на htmlpages/Show/, не забываем в начало материала вписать код <div class="newsPage">&nbsp;</div>
*/
function RevolutionGetSection(s) {	
	viewPreloader();
	Revolution_section(s);	
	if(s=='home'){
		urev_data = RevuriSectionHome;
		Revolution_section_id=s;
		document.getElementById("btnBack").style.display= "none";
	}else if(s=="additionalUnit"){
		document.getElementById("btnBack").style.display= "block";
		return;
	}else if(s==7){		
		urev_data = domain+"/htmlpages/Show/100letrevolyucii/Ulicygoroda/Revolyucionnyemesta";
		/* $(".btnBack").attr("onClick", "RevolutionGetSection('home');");
		document.getElementById("btnBack").style.display= "block"; */
	}else if(s==5){		
		urev_data = domain+"/htmlpages/Show/100letrevolyucii/Geografiyarevolyucii";
		/* $(".btnBack").attr("onClick", "RevolutionGetSection('home');");
		document.getElementById("btnBack").style.display= "block"; */
	}else{		
		urev_data = RevuriSection+s;
		/* $(".btnBack").attr("onClick", "RevolutionGetSection('home');");
		document.getElementById("btnBack").style.display= "block";	*/
	}	
	create_xmlhttp();
	xmlHttp.open("GET",urev_data, true);
	xmlHttp.onreadystatechange = updateContent;
	xmlHttp.send(null);
	
	if(s!='home' && s!='additionalUnit'){
		$(".btnBack").attr("onClick", "RevolutionGetSection('home');");
		document.getElementById("btnBack").style.display= "block";
	}
	// 
	if(s!='home' && s!="additionalUnit"  && s!=7 && s!=5 ){
		PageTotalSet100Let(urev_data);
	}
	hidePreloader();
}
/*
function setAttrItem(id){
	$("#rev_Content .item a").on('click', function(e) {
		e.preventDefault();
		RevolutionGetData(e.currentTarget.href);
		return false;
	});
}
*/
function setAttrItem(){
	/*
	$("#rev_Content a").on('click', function(e) {
		e.preventDefault();
		RevolutionGetData(e.currentTarget.href);
		return false;
	});
	*/
	
	var arrNativeStranger;
	$("#rev_Content a").on('click', function(e) {
		e.preventDefault();
		rLink = ""+e.currentTarget.href+"";
		arrNativeStranger = rLink.split('/');		
		//console.log("Link -- "+arrNativeStranger[2]+" == "+location.hostname);		
		if(location.hostname == arrNativeStranger[2]) {
			// getData(e.currentTarget.href);
			RevolutionGetData(rLink);
		}else {			
			window.open(rLink, '_blank');
		}
		return false;
	});
	
}

function RevolutionDetailsContent(){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){
			var responseHTML = xmlHttp.responseText;
			titles(responseHTML);			
			var content = responseHTML.match(/<div\s+class="newsPage">[\S\s]*<div class="ContentEnd"\sid="ContentEnd">/gi);		
			$("#rev_Content").empty();
			$("#rev_Content").append(content);
			if(Revolution_section_id !== "additionalUnit"){$(".btnBack").attr("onClick", "RevolutionGetSection("+Revolution_section_id+");");}
			
			/** Isklychit' ***
			 * 9 razdel - Molodezhnii press centr
			 *
			*/
			if(Revolution_section_id !=9){
				WrapLinkIMG();
			}
			if(Revolution_section_id ==9){
				WrapLinkVIDEO();
			}
			// setTimeout("UpdateColorBox();", 2500);
		}
		if(xmlHttp.status==404){alert(alertInfo[0])}
		if(xmlHttp.status==500){alert(alertInfo[1])}
		if(xmlHttp.status==403){alert(alertInfo[2])}
		scrollTopPage();
		hidePreloader();
	}
}

function RevolutionGetData (link){
	viewPreloader();
	url_data = link;
	create_xmlhttp();
	xmlHttp.open("GET",url_data, true);
	xmlHttp.onreadystatechange = RevolutionDetailsContent;
	xmlHttp.send(null);
	return false;
}
/*
function RevolutionGetData (link, s){
	 
	document.getElementById("btnBack").style.display= "block";
	if(s=='home'){
		urev_data = RevuriSectionHome;
		Revolution_section_id=s;
		document.getElementById("btnBack").style.display= "none";
	}else if(s=="additionalUnit"){	
		return;	
	}else{
		urev_data = RevuriSection+s;
		$(".btnBack").attr("onClick", "RevolutionGetSection('home');");
	}
	console.log(urev_data);
	urev_data = link;
	console.log(urev_data);
	create_xmlhttp();
	xmlHttp.open("GET",urev_data, true);
	xmlHttp.onreadystatechange = RevolutionDetailsContent;
	xmlHttp.send(null);	
}
*/

function WrapLinkIMG(){	
	$('#rev_Content img').wrap(function() {
        return '<a href="' + $(this).attr('src') + '" class="cboxElement" rel="gallery"></a>';
    });
}
function WrapLinkVIDEO(){	
	$('#video').wrap(function() {
        return '<a href="' + $(this).attr('src') + '" rel="shadowbox[video];;width=640; height=460;options={flashVars:{repeat:\'always\'}}></a>';
    });
}

function UpdateColorBox (){
	$(".cboxElement").colorbox({
		transition: 'fade',
		data: 'true',
		rel:'gallery'
	});
}















