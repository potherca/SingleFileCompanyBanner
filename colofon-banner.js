;(function(){
    /* IE8 Array.forEach polyfill */
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(p_fCallback, p_sScope) {
            for(var i = 0, iLength = this.length; i < iLength; ++i) {
                p_fCallback.call(p_sScope, this[i], i, this);
            }
        }
    }

    function getQueryParameters(p_sUrl) {
        var oParameters, sQuery, aKeyValuePairs;

        oParameters = {};
        sQuery = p_sUrl.split('?')[1] || '';
        aKeyValuePairs = sQuery.split('&');

        aKeyValuePairs.forEach(function(p_sKeyValuePair) {
            aKeyValuePair = p_sKeyValuePair.split('=');
            oParameters[aKeyValuePair[0]] = aKeyValuePair[1] || '';
        });

        return oParameters;
    }

    function addBanner(p_oOptions) {
        var sCss, oStyleNode, oFooterNode;

        sCss = function(){/*
            @import url(http://fonts.googleapis.com/css?family=Roboto+Slab:400,300|Roboto:400,300|Playball);

            .colofon {
                background-color: rgb(255,255,255);
                border: 1px solid rgb(125,125,125);
                border-radius: 0.5em;
                box-shadow: inset 0 0 0.75em rgb(0,0,0);
                display: table;
                height: 4em;
                margin: 2em auto;
                padding: 1em 8em 1em 1em;
                position: relative;
                text-align: center;
            }

            .colofon a {
                display: table-cell;
                text-decoration: none;
                vertical-align: middle;
                border: none;
                background-image: none;
            }
            .colofon a:after {}

            .colofon-beanmachine a {
                color: rgb(0, 175, 219);
                font-family: "Roboto Slab",Arial;
            }

            .colofon-beanmachine:hover {
                box-shadow: inset 0 0 0.75em rgb(0,0,0), inset 0 0 2em rgba(0, 175, 219, 0.65);
            }

            .colofon-beanmachine .company-name {
                background-image: url(http://thebeanmachine.accept.starsale.nl/Static/Images/UserUpload/over/logo.png);
                background-size: contain;
                background-position: center right;
                background-repeat: no-repeat;
                color: rgba(0,0,0,0) !important;
                display: table-cell;
                height: 6em;
                position: absolute;
                right: 0;
                text-shadow: none;
                top: 1.25em;
            }
        */}.toString().slice(14,-3);

        oStyleNode = document.createElement('style');
        oStyleNode.type = 'text/css';
        if (oStyleNode.styleSheet) { // IE
            oStyleNode.styleSheet.cssText = sCss;
        } else {
            oStyleNode.appendChild(document.createTextNode(sCss));
        }
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('html')[0]).appendChild(oStyleNode);
        
        oFooterNode = document.createElement('footer');
        oFooterNode.className = 'colofon ' + p_oOptions.cssClass;
        oFooterNode.innerHTML = '<a href="' + p_oOptions.url +'" target="_blank">This experiment brough to you thanks to my employer <span class="company-name">' + p_oOptions.companyName + '</span></a>';    
        (document.getElementsByTagName('body')[0]||document.getElementsByTagName('html')[0]).appendChild(oFooterNode);
    }
    
    function getParameters(){
        var oColofonParameters, oParameters, aScripts, iLastScript, sIndex;
        
        oColofonParameters = {
              url : ''
            , cssClass : ''
            , companyName : ''
        };
        aScripts = document.getElementsByTagName('script');
        iLastScript = aScripts.length - 1;
        oParameters = getQueryParameters(aScripts[iLastScript].src)
        
        for(sIndex in oParameters){
            if(typeof oColofonParameters[sIndex] !== 'undefined'){
                oColofonParameters[sIndex] = decodeURIComponent(oParameters[sIndex]);
            }
        }
        
        return oColofonParameters;
    }
    
    addBanner(getParameters());
}());
