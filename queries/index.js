     default_endpoint = 'https://wb.pcp-on-web.de/store-oker/research-ontology/sparql';
     query_list = 'https://wb.pcp-on-web.de/queries/tabs/';
     
     var yasgui = YASGUI(document.getElementById("yasgui"), {
         //Uncomment below to change the default endpoint
         //Note: If you've already opened the YASGUI page before, you should first clear your
         //local-storage cache before you will see the changes taking effect 
         yasqe:{sparql:{endpoint: default_endpoint}} // default SPARQL endpoint
     });

     function toggle(id) {
	elem=document.getElementById(id);
	style = elem.getAttribute('style');
	if (style=='display:none') elem.setAttribute ('style','display:block');
	else elem.setAttribute ('style','display:none');
     }


     function httpRequest(url) {
     	var xhr = new XMLHttpRequest();
     	xhr.open('GET', url, false);
     	xhr.overrideMimeType( "text/plain; charset=utf-8" );
     	xhr.send();
	return xhr.responseText;
     }
    		

     // Add predifined queries as tab
     function addPredefinedQueries() {

	checkedQueries = document.querySelectorAll('#querylist input[type="checkbox"]:checked');
	checkedQueries.forEach((checkedQuery) => {
		tab=yasgui.addTab(false);
     		tab.rename(checkedQuery.getAttribute('name'));
     		tab.setQuery(httpRequest(query_list+checkedQuery.getAttribute('name')+'.sparql'));
		
	});
	toggle('querylist');

     }

     querylist = document.getElementById('querylist');
     result=httpRequest('https://wb.pcp-on-web.de/queries/tabs/');
     console.log(result);
     queries=JSON.parse(result);
     querylist.innerHTML = '<ul>'
     queries.forEach((query,index) => {
	querylist.innerHTML += '<li><input type="checkbox" id="query_'+index+'" name="'+query+'"><label for="query_'+index+'">'+query+'</label></li>';
     });
     querylist.innerHTML += '</ul>'
     querylist.innerHTML += '<button id="addTab" class="yasr_btn" onclick="addPredefinedQueries();">Lade ausgewählte Anfragen</button>';

     
		    //uid=Date.now().toString(36).substr(10) + Math.random().toString(36).substr(4);
		    //     	xhr.open('GET', 'https://wb.pcp-on-web.de/queries/tabs/'); xhr.send();


