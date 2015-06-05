window.onload = function(){
    
    
    var compSlider = document.getElementById("slider");
    
    
    var dataReq = new XMLHttpRequest();
    
    dataReq.open("GET","data/test-modules.json",true);
    dataReq.addEventListener("load", onModuleDataLoaded);
    dataReq.send();
    
        function onModuleDataLoaded(e){
        data = JSON.parse(e.currentTarget.response);
        componentData = (data.components);
        initModuleConstructor(componentData)
        }
    
    
    
    //////// component panel build functions ///////
    
    
    
        function initModuleConstructor(compData){ // creates components lists / passes them thru "sortModules()"

            
            var preAnalyticalData = compData.preAnalytical;
            var analyticalData = compData.analytical;
            var postAnalyticalData = compData.postAnalytical;
            
            var preAnalyticalList = createComponentList(preAnalyticalData);
            var analyticalList = createComponentList(analyticalData);
            var postAnalyticalList = createComponentList(postAnalyticalData);
            
            sortModules(preAnalyticalList,analyticalList,postAnalyticalList);

            
        }
    
        function sortModules(preAnList,anList,postAnList){  // appends component panels into respective module divs
            var preAnEl = document.getElementById("preanalytical");
            var anEl = document.getElementById("analytical");
            var postAnEl = document.getElementById("postanalytical");
            
            preAnEl.appendChild(preAnList);
            anEl.appendChild(anList);
            postAnEl.appendChild(postAnList);
            
        }

    
        function createComponentList(compList){

            var moduleListEl = document.createElement("div");
            
            for (component in compList){
                var slidePanel = createComponentEl(compList[component]);
                moduleListEl.appendChild(slidePanel);
            }
            
            return moduleListEl;
            
        }
        
        function createComponentEl(compData){
            //console.log(compData);
            
            var compEl = document.createElement("div");
            var compThumb = document.createElement("img");
            var compLabel = document.createElement("h1");
            var moduleTitlebar = document.createElement("div");
            
            moduleTitlebar.className = "titleBar";
            compEl.className = "comp";    
            compEl.setAttribute('id',compData.name);
            compThumb.setAttribute('draggable', false);
            compLabel.onmousedown = disableSelect;
            
            compThumb.src = compData.thumbnail;
            compLabel.innerHTML = compData.name

            compEl.appendChild(moduleTitlebar);    
            compEl.appendChild(compThumb);
            compEl.appendChild(compLabel);
            
            function disableSelect(e){ //sets textfields as unselectable
                return false;   
            }
            
            return compEl
        }
    
    
    
        //////// component-slider functions ///////
    
    
        
        
    

}
