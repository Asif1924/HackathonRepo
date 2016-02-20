ensureNamespaceExists();

HackathonWeb.TwizApp = function(){
    var logPrefix = "[HackathonWeb.TwizApp]:";
    var $screenContainer = $("#MainPage");
    
    
    
    this.init = function(){
        var methodName = "init() ";
        console.log(logPrefix + methodName);
        
        createView();
        bindEvents();
    }
    
    this.show = function(){
        var methodName = "show() ";
        console.log(logPrefix + methodName);
        
        
    }
    
    function createView(){
        var methodName = "createView() ";
        console.log(logPrefix + methodName);
        
    }
    
    function bindEvents(){
        var methodName = "bindEvents() ";
        console.log(logPrefix + methodName);
        
    }
    
    
}