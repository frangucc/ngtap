
if ( device.desktop()) {

} 
else if ( device.mobile() ) {

	var $ = document; // shortcut
	var cssId = 'myCss';  // you could encode the css path itself to generate id..
	if (!$.getElementById(cssId))
	{
	    var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('link');
	    link.id   = cssId;
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = './css/ionic.app.css';
	    link.media = 'all';
	    head.appendChild(link);
	}

}
else {

}
