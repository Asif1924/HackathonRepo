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
    
    this.getWeatherDataByCityID = function( argCityID, argSuccessCB, argFailCB ){
        //http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=44db6a862fba0b067b1930da0d769e98
        var methodName = 'getWeatherDataByCityID() ';
		console.log(logPrefix + methodName);

        var params = {
            id      :   argCityID,
            appid   :   "44db6a862fba0b067b1930da0d769e98"
        }
		
		var descriptor = { 
            url         : "http://api.openweathermap.org/data/2.5/weather?" + $.param(params),
            dataType    : 'json' 
		};
	
	    AJAXRequest( descriptor, argSuccessCB, argFailCB, $.noop, $.noop, $.noop);	
    }
    
    //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=44db6a862fba0b067b1930da0d769e98

    function AJAXRequest( argDescriptor, argSuccessCB, argFailCB, argBeforeSendCB, argCompleteCB, argOfflineCB ){
        var methodName = 'AJAXrequest() ';
		console.log(logPrefix + methodName);
		
		$.ajax({
		    type            :   "GET",
		    url             :   argDescriptor.url,
		    //contentType     :   "application/json; charset=utf-8",
		    dataType        :   argDescriptor.dataType,
		    timeout         :   ajaxRequestTimeout,
		    success         :   argSuccessCB,
		    error           :   argFailCB,
		    beforeSend      :   argBeforeSendCB,
		    complete        :   argCompleteCB
		});
    }

}