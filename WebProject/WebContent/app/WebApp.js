ensureNamespaceExists();

HackathonWeb.WebApp = function(){
    var logPrefix = "[HackathonWeb.WebApp]:";
    var $screenContainer = $("#MainPage");
    
    var $weatherViewContainer = $("#weatherView");
    

    var controlRefs = {
        searchButton    :   "#twizButton",
        searchField     :   "#searchField",
        
        latField        :   "#latField",
        longField       :   "#longField",
        latlongButton   :   "#latlongButton",
        
        latitudeLabel   :   "#latitudeLabel",
        longitudeLabel  :   "#longitudeLabel",
        cityLabel       :   "#cityLabel",
        cityField       :   "#cityField"
    };
    
    var weatherkey = HackathonWeb.weatherAPIKey;
    
    var weatherPoller;
    var randLat = 0;
    var randLong = 0;

    var renderWidth = 1024;
    var renderHeight = 768;

    var cube = null;
    var some3DObject = null;
	var scene = new THREE.Scene();
	//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	var camera = new THREE.PerspectiveCamera( 75, renderWidth/renderHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	
	var renderIncX = 0.1;
	var renderIncY = 0.1;
	
    function startPollingWeather() {
        var methodName = "startPollingWeather() ";
        console.log(logPrefix + methodName);

        weatherPoller = setInterval(checkWeather, 3000);
    }
    
    function checkWeather() {
        var methodName = "checkWeather() ";
        console.log(logPrefix + methodName);

        randLat=getRandomLatitude();
        randLong=getRandomLongitude();
        
        $(controlRefs.latField).val(randLat);
        $(controlRefs.longField).val(randLong);
        
        //$(controlRefs.latitudeLabel).text(randLat);
        //$(controlRefs.longitudeLabel).text(randLong);
        
        getWeatherForLatLong(randLat,randLong);

    }    
    
    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }
    
    function getRandomLatitude(){
        return getRandomInRange(-165,165,3);
    }
    
    function getRandomLongitude(){
        return getRandomInRange(-75,75,3);
    }

    this.init = function(){
        var methodName = "init() ";
        console.log(logPrefix + methodName);
        
        createView();
        bindEvents();
    }
    
    this.show = function(){
        var methodName = "show() ";
        console.log(logPrefix + methodName);
        
        $screenContainer.show();
        
        start3D();
        
       startPollingWeather();
        
    }
    
    function createObject(){
        var methodName = "createObject() ";
        console.log(logPrefix + methodName);

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		some3DObject = new THREE.Mesh( geometry, material );
    }    
    
	var render = function () {
        var methodName = "render() ";
        console.log(logPrefix + methodName);

		requestAnimationFrame( render );

		//some3DObject.rotation.x += 0.1;
		//some3DObject.rotation.y += 0.1;
		some3DObject.rotation.x += renderIncX;
		some3DObject.rotation.y += renderIncY;

		renderer.render(scene, camera);
	};    
    
    function start3D(){
        var methodName = "start3D() ";
        console.log(logPrefix + methodName);

		//renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( renderWidth, renderHeight );

		//document.body.appendChild( renderer.domElement );
        $screenContainer.append( renderer.domElement );

		//scene.add( cube );
		createObject();
		scene.add( some3DObject );

		camera.position.z = 5;

		//render(renderIncX,renderIncY);
		render();
    }

    function createView(){
        var methodName = "createView() ";
        console.log(logPrefix + methodName);
        
        $screenContainer.empty();
        assembleHTML($screenContainer,"#MainPage-template");

    }
    
    function bindEvents(){
        var methodName = "bindEvents() ";
        console.log(logPrefix + methodName);
        
        $(controlRefs.searchButton).click(function(){
            searchButtonClick($(controlRefs.searchField).val());
        });
        
        $(controlRefs.latlongButton).click(function(){
            getWeatherForLatLong(
                $(controlRefs.latField).val(),
                $(controlRefs.longField).val()
            );
        });
        
    }
    
    function assembleHTML($argElement,argTemplateName){
        var methodName = "assembleHTML() ";
        console.log(logPrefix + methodName);
        
        var html = $(argTemplateName).tmpl();
        $argElement.prepend(html);
        
    }
    
    function getWeatherForLatLong( argLat, argLong ){
        var methodName = "latlongButtonClick() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argLat + ", " + argLong );
        console.log("---weatherKey:" + weatherkey );
        
        var integration = new HackathonWeb.IntegrationController();
        integration.init();
        integration.getWeatherDataByLatLong(argLat,argLong,weatherSuccess,weatherFail)
    }    
    
    function searchButtonClick( argSearchValue ){
        var methodName = "searchButtonClick() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argSearchValue);
        
        var integration = new HackathonWeb.IntegrationController();
        integration.init();
        integration.getWeatherDataByCityID(argSearchValue,weatherSuccess,weatherFail)
    }
    
    function weatherSuccess( argResult ){
        var methodName = "weatherSuccess() ";
        console.log(logPrefix + methodName);
        
        //{"cod":"404","message":"Error: Not found city"}
        //{"coord":{"lon":-33,"lat":-56},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"base":"cmc stations","main":{"temp":276.408,"pressure":993.61,"humidity":92,"temp_min":276.408,"temp_max":276.408,"sea_level":993.75,"grnd_level":993.61},"wind":{"speed":17.83,"deg":272.506},"rain":{"3h":0.59},"clouds":{"all":92},"dt":1456110810,"sys":{"message":0.0042,"country":"GS","sunrise":1456125398,"sunset":1456176781},"id":3474415,"name":"South Georgia and the South Sandwich Islands","cod":200}
        console.log("---" + argResult.cod);
        
        $(controlRefs.cityField).val("Not a city");
        renderIncX = 0;
        renderIncY = 0;
		some3DObject.rotation.x = renderIncX;
		some3DObject.rotation.y = renderIncY;
        scaleObject(1,1,1);

        if(argResult.cod===200){
            console.log("---Name:" + argResult.name);
            console.log("---Lat:" + argResult.coord.lat);
            console.log("---Lon:" + argResult.coord.lon);
            
            console.log("---temp:" + argResult.main.temp);
            console.log("---pressure:" + argResult.main.pressure);
            console.log("---humidity:" + argResult.main.humidity);
            
            console.log("---renderIncX:" + renderIncX);
            console.log("---renderIncY:" + renderIncY);
            
            renderIncX = argResult.coord.lat;
            renderIncY = argResult.coord.lon;
            
            $(controlRefs.cityField).val(argResult.name);
            //render(argResult.coord.lat,argResult.coord.lon);
            
            scaleObject(argResult.main.temp,argResult.main.pressure,argResult.main.humidity)
        }
        //render();
    }
    
    function scaleObject( argX, argY, argZ ){
        some3DObject.scale.x = argX/300;
        some3DObject.scale.y = argY/1000;
        some3DObject.scale.z = argZ/100;
    }
    
    function weatherFail( argResult ){
        var methodName = "weatherFail() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argResult);
        
    }
    
    
    
}