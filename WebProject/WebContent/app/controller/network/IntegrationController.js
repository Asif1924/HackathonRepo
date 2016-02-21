ensureNamespaceExists();

HackathonWeb.IntegrationController = function(){
    var logPrefix = "[HackathonWeb.IntegrationController]:";

    var ajaxRequestTimeout = 0;

    this.init = function(){
        var methodName = 'init() ';
		console.log(logPrefix + methodName);
        
        ajaxRequestTimeout = 30000;
    }
    
    this.searchTwitter = function( argSearchFor, argSuccessCB, argFailCB ){
        var methodName = 'searchTwitter() ';
		console.log(logPrefix + methodName);

        var searchTerm = {
            q   :   argSearchFor
        }

		var descriptor = { 
                            url         : "https://api.twitter.com/1.1/search/tweets.json?" + $.param(searchTerm),
                            dataType    : 'jsonp' 
		};

		AJAXRequest( descriptor, argSuccessCB, argFailCB, $.noop, $.noop, $.noop);
        
    }

    function AJAXRequest( argDescriptor, argSuccessCB, argFailCB, argBeforeSendCB, argCompleteCB, argOfflineCB ){
        var methodName = 'AJAXrequest() ';
		console.log(logPrefix + methodName);
		
		$.ajax({
		    url             :   argDescriptor.url,
		    contentType     :   "application/json; charset=utf-8",
		    dataType        :   argDescriptor.dataType,
		    timeout         :   ajaxRequestTimeout,
		    success         :   argSuccessCB,
		    error           :   argFailCB,
		    beforeSend      :   argBeforeSendCB,
		    complete        :   argCompleteCB
		});
    }

}