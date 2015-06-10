window.onload = function(){
    
    
    var compSlider = document.getElementById("slider");
    var currentCompCount = {};
    var componentData = null;
    var detailDisplayPanelEl = document.getElementById("detail-panel");
    var overlayPanelEl = document.getElementById("overlay-panel");

    
    
    
    var dataReq = new XMLHttpRequest();
    
    dataReq.open("GET","data/test-modules.json",true);
    dataReq.addEventListener("load", onModuleDataLoaded);
    dataReq.send();
    
        function onModuleDataLoaded(e){
        data = JSON.parse(e.currentTarget.response);
        componentData = (data.components);
        currentCompCount = (data.componentCount);
        initModuleConstructor(componentData)
        initSlidePanel(currentCompCount)
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
                var slidePanel = createComponentEl(compList[component],component);
                moduleListEl.appendChild(slidePanel);
                //console.log(component);
            }
            
            return moduleListEl;
        }
        
        function createComponentEl(compData,compId){
            console.log(compData);
            
            var compEl = document.createElement("div");
            var compDetailContainer = document.createElement("div");
            var compLabel = document.createElement("p");
            var infoBtn = document.createElement("div");
            var infoBorder = document.createElement("div");
            var compThumb = document.createElement("img");

            infoBtn.className = "infoBtn";
            infoBtn.setAttribute("compId",compId);
            infoBtn.setAttribute("modType",compData.modFlag);
            infoBtn.addEventListener("click", onInfoBtnClick);
            compEl.className = "comp";    
            compEl.setAttribute('id',compData.name);
            compThumb.setAttribute('draggable', false);
            compLabel.onmousedown = disableSelect;
            
            compThumb.src = compData.thumbnail;
            compLabel.innerHTML = compData.name
            compDetailContainer.appendChild(compLabel);
            compDetailContainer.appendChild(infoBtn);
            compDetailContainer.className = "comp-details";
            
            compEl.style.marginLeft = compData.margin.left +"px";
            compEl.style.marginRight = compData.margin.right +"px";
    
            compEl.appendChild(compDetailContainer);
            compEl.appendChild(compThumb);
            
            function disableSelect(e){ //sets textfields as unselectable
                return false;   
            }
            
            return compEl
        }
    
    
    
        //////// component-slider functions ///////
    
    
    
    function initSlidePanel(compCount){
    
        var compWidth = 450;
        var sliderWidth = compSlider.style.width =(compWidth * (currentCompCount+1))+"px";
        
    }
    
    
        //////// detail-panel functions ///////
    
    
    function onInfoBtnClick(e){
        //console.log(e.currentTarget);
        var selectedComp = e.currentTarget.getAttribute("compId");
        var selectedModuleType = e.currentTarget.getAttribute("modType");
        
        var currentDetailComp = componentData[selectedModuleType][selectedComp];
        
        initDetailPanel(currentDetailComp);
        detailDisplayPanelEl.style.display = "block";
        overlayPanelEl.style.display = "block";
    }
    
    function initDetailPanel(currentComp){
        //console.log(currentComp);
        var detailPanelEl = document.getElementById("detail-panel");
        detailPanelEl.innerHTML = "";
        
        var panelCloseBtn = document.createElement("div");
        panelCloseBtn.setAttribute("id","close-btn");
        panelCloseBtn.addEventListener("click",onPanelCloseClick);
        
        var panelHeader = document.createElement("div");
        panelHeader.setAttribute("id","panel-header");
        
        var nameDiv = document.createElement("div");
            nameDiv.setAttribute("id","detail-name-container");
        var nameEl = document.createElement("p");
            nameEl.innerHTML = currentComp.name
            nameDiv.appendChild(nameEl);
        
        var moduleDiv = document.createElement("div");
            moduleDiv.setAttribute("id","detail-mod-container");
        var moduleEl = document.createElement("p");
            moduleEl.innerHTML = currentComp.modLabel;
            moduleDiv.appendChild(moduleEl);
        
        var compImgEl = document.createElement("img");
            compImgEl.src = currentComp.thumbnail;
        
        var featureHeaderEl = document.createElement("h3");
            featureHeaderEl.innerHTML = currentComp.featureHeader;
        
        var featureListDiv = document.createElement("div");
            featureListDiv.setAttribute("id","features");
            featureListDiv.appendChild(featureHeaderEl);
        var featureListEl = createDetailList(currentComp.featureList);
            featureListDiv.appendChild(featureListEl);
        
        var videoPlayBtn = document.createElement("div");
        var playBtnTxt = document.createElement("p");
        playBtnTxt.innerHTML = "Touch To Play Video";
        videoPlayBtn.appendChild(playBtnTxt);
        videoPlayBtn.setAttribute("id","video-btn");
        videoPlayBtn.addEventListener("click",onVideoPlayClick);
        

        detailPanelEl.appendChild(panelCloseBtn);
        panelHeader.appendChild(nameDiv);
        panelHeader.appendChild(moduleDiv);
        detailPanelEl.appendChild(panelHeader);
        detailPanelEl.appendChild(compImgEl);
        detailPanelEl.appendChild(featureListDiv);
        detailPanelEl.appendChild(videoPlayBtn);
                    
        
    }
    
    function createDetailList(list){
        console.log(list);
        var detailFeatureList = document.createElement("ul");
        
        for(item in list){
            var listItemEl = document.createElement("li");
            listItemEl.innerHTML = list[item];
            detailFeatureList.appendChild(listItemEl);
        }
        
        return detailFeatureList;
        
    }
    
    function onPanelCloseClick(e){
        console.log("close panel clicked");
        detailDisplayPanelEl.style.display = "none";
        overlayPanelEl.style.display = "none";
    }
    
    function onVideoPlayClick(e){
        console.log("video btn clicked");
    }

}
