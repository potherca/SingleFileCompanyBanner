;(function(){
    /* IE8 Array.forEach polyfill */
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(p_fCallback, p_sScope) {
            for(var i = 0, iLength = this.length; i < iLength; ++i) {
                p_fCallback.call(p_sScope, this[i], i, this);
            }
        };
    }

    function getQueryParameters(p_sUrl) {
        var oParameters, sQuery, aKeyValuePairs, aKeyValuePair;

        oParameters = {};
        sQuery = p_sUrl.split('?')[1] || '';
        aKeyValuePairs = sQuery.split('&');

        aKeyValuePairs.forEach(function(p_sKeyValuePair) {
            aKeyValuePair = p_sKeyValuePair.split('=');
            oParameters[aKeyValuePair[0]] = aKeyValuePair[1] || '';
        });

        return oParameters;
    }

    function cssSafeCompanyName(p_sCompanyName){
        return p_sCompanyName.replace(/[^a-zA-z0-9\-_]/g, '');
    }

    function getCss(p_oOptions){
        var sCss;

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
                z-index: 9999;
            }

            .colofon a {
                display: table-cell;
                text-decoration: none;
                vertical-align: middle;
                border: none;
                background-image: none;
            }

            .colofon a:after {}

            .colofon-{{sCompanyName}} a {
                color: {{sLinkColor}};
                font-family: "Roboto Slab",Arial;
            }

            .colofon-{{sCompanyName}}:hover {
                box-shadow: inset 0 0 0.75em rgb(0,0,0), inset 0 0 2em {{sHoverColor}};
            }

            .colofon-{{sCompanyName}} .company-name {
                background-image: url({{sLogo}});
                background-size: contain;
                background-position: center right;
                background-repeat: no-repeat;
                color: rgba(0,0,0,0) !important;
                display: table-cell;
                height: 6em;
                width: 6em;
                position: absolute;
                right: 0.85em;
                text-shadow: none;
                top: 0;
            }
        */}.toString().slice(14,-3);

       sCss = sCss.replace(/{{sLinkColor}}/g, p_oOptions.linkColor);
       sCss = sCss.replace(/{{sHoverColor}}/g, p_oOptions.hoverColor);
       sCss = sCss.replace('{{sLogo}}', p_oOptions.logo);
       sCss = sCss.replace(/{{sCompanyName}}/g, cssSafeCompanyName(p_oOptions.companyName));

       return sCss;
    }

    function addBanner(p_oOptions) {
        var sCss, oStyleNode, oFooterNode;

        sCss = getCss(p_oOptions);

        oStyleNode = document.createElement('style');
        oStyleNode.type = 'text/css';
        if (oStyleNode.styleSheet) { // IE
            oStyleNode.styleSheet.cssText = sCss;
        } else {
            oStyleNode.appendChild(document.createTextNode(sCss));
        }
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('html')[0]).appendChild(oStyleNode);

        oFooterNode = document.createElement('footer');
        oFooterNode.className = 'colofon colofon-' + cssSafeCompanyName(p_oOptions.companyName);
        oFooterNode.innerHTML = '<a href="' + p_oOptions.url +'" target="_blank">This experiment brough to you thanks to my employer <span class="company-name">' + p_oOptions.companyName + '</span></a>';
        (document.getElementsByTagName('body')[0]||document.getElementsByTagName('html')[0]).appendChild(oFooterNode);
    }

    function getParameters(){
        var oColofonParameters, oParameters, aScripts, iLastScript, sIndex;

        oColofonParameters = {
              url : ''
            , companyName : ''
            , logo : ''
            , linkColor : ''
            , hoverColor : ''
        };
        aScripts = document.getElementsByTagName('script');
        iLastScript = aScripts.length - 1;
        oParameters = getQueryParameters(aScripts[iLastScript].src);

        for(sIndex in oParameters){
            //noinspection JSUnfilteredForInLoop
            if(typeof oColofonParameters[sIndex] !== 'undefined'){
                //noinspection JSUnfilteredForInLoop
                oColofonParameters[sIndex] = decodeURIComponent(oParameters[sIndex]);
            }
        }

        return oColofonParameters;
    }

    addBanner(getParameters());
}());
