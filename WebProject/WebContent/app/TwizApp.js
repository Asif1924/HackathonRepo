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
        
        $screenContainer.show();
        
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
    
    function bindEvents(){
        var methodName = "bindEvents() ";
        console.log(logPrefix + methodName);
        
    }
    
    
}