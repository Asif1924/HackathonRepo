function ensureNamespaceExists(){
    namespace('HackathonWeb');
}

function namespace(argNamespace){
    var currentSpace = window;
    
    var spaces = argNamespace.split('.');
    for( var i=0;i< spaces.length; i++){
        var space = spaces[i];
        if(currentSpace[space]===undefined){
            currentSpace[space]={};
        }
        currentSpace = currentSpace[space];
    }
}