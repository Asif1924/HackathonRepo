ensureNamespaceExists();

HackathonWeb.WebApp = function(){
    var logPrefix = "[HackathonWeb.WebApp]:";
    var $screenContainer = $("#MainPage");
    
    var renderWidth = 1024;
    var renderHeight = 768;
    
    var controlRefs = {
        searchButton    : "#twizButton",
        searchField     : "#searchField"
    };
    
    
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
    }
    
    function start3D(){
			var scene = new THREE.Scene();
			//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			
			var camera = new THREE.PerspectiveCamera( 75, renderWidth/renderHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			//renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setSize( renderWidth, renderHeight );

			//document.body.appendChild( renderer.domElement );
            $screenContainer.append( renderer.domElement );
            
            
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame( render );

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			render();        
    }
    
    function createView(){
        var methodName = "createView() ";
        console.log(logPrefix + methodName);
        
        $screenContainer.empty();
        assembleHTML($screenContainer,"#MainPage-template");
        

    }
    
    function assembleHTML($argElement,argTemplateName){
        var methodName = "assembleHTML() ";
        console.log(logPrefix + methodName);
        
        var html = $(argTemplateName).tmpl();
        $argElement.prepend(html);
        
    }
    
    function searchButtonClick( argSearchValue ){
        var methodName = "searchButtonClick() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argSearchValue);
        
        var integration = new HackathonWeb.IntegrationController();
        integration.init();
        //integration.searchTwitter(argSearchValue,twitterSuccess);
        integration.getWeatherDataByCityID(argSearchValue,weatherSuccess,weatherFail)
    }
    
    function weatherSuccess( argResult ){
        var methodName = "weatherSuccess() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argResult);
    }
    
    function weatherFail( argResult ){
        var methodName = "weatherFail() ";
        console.log(logPrefix + methodName);
        
        console.log("---" + argResult);
        
    }
    
    function bindEvents(){
        var methodName = "bindEvents() ";
        console.log(logPrefix + methodName);
        
        $(controlRefs.searchButton).click(function(){
            searchButtonClick($(controlRefs.searchField).val());
        });
        
    }
    
    
}