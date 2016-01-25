var xmlhttp = new XMLHttpRequest(), isCDN = false;
var ver_jQuery, ver_bootstrap, ver_fontAwesome, ver_smoothScroll, ver_scrollMagic, ver_gsap;
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		document.write('<link rel="icon" type-"image/gif" href="/img/t47/t47_icon.png" \/>');
		document.write('<link rel="shortcut icon" href="/img/t47/t47_icon.png" \/>');
		document.write('<link rel="apple-touch-icon" href="/img/t47/t47_icon.png" \/>');

    	if (xmlhttp.status == 200) {
			var xmlDoc        = JSON.parse(xmlhttp.responseText);
			ver_jQuery        = xmlDoc.jQuery;
			ver_bootstrap     = xmlDoc.Bootstrap;
			ver_fontAwesome   = xmlDoc.FontAwesome;
			ver_smoothScroll  = xmlDoc.SmoothScroll;
			ver_scrollMagic   = xmlDoc.ScrollMagic;
			ver_gsap          = xmlDoc.GSAP;

			document.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/' + ver_jQuery + '/jquery.min.js"><\/script>');

			document.write('\
				<script type="text/javascript"> \
					if (!window.jQuery) { \
						document.write(\'<link rel="stylesheet" href="/css/lib/bootstrap.min.css" \/>\'); \
						document.write(\'<link rel="stylesheet" href="/css/lib/font-awesome.min.css" \/>\'); \
						\
						document.write(\'<script type="text/javascript" src="/js/lib/jquery.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/bootstrap.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/SmoothScroll.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/TweenMax.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/ScrollMagic.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/ScrollMagic.gsap.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/ScrollMagic.jquery.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="/js/lib/jquery.gsap.min.js"><\' + \'/script>\'); \
						\
						isCDN = false; \
					} else { \
						document.write(\'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + ver_bootstrap + '/css/bootstrap.min.css" \/>\'); \
						document.write(\'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/' + ver_fontAwesome + '/css/font-awesome.min.css" \/>\'); \
						\
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + ver_bootstrap + '/js/bootstrap.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/' + ver_smoothScroll + '/SmoothScroll.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/' + ver_gsap + '/TweenMax.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/' + ver_gsap + '/jquery.gsap.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/' + ver_scrollMagic + '/ScrollMagic.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/' + ver_scrollMagic + '/plugins/animation.gsap.min.js"><\' + \'/script>\'); \
						document.write(\'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/' + ver_scrollMagic + '/plugins/jquery.ScrollMagic.min.js"><\' + \'/script>\'); \
						\
						isCDN = true; \
					} \
				\x3C\/script>');
		} else {
			document.write('<link rel="stylesheet" href="/css/lib/bootstrap.min.css" \/>');
			document.write('<link rel="stylesheet" href="/css/lib/font-awesome.min.css" \/>');

			document.write('<script type="text/javascript" src="/js/lib/jquery.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/bootstrap.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/SmoothScroll.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/TweenMax.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/ScrollMagic.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/ScrollMagic.gsap.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/ScrollMagic.jquery.min.js"><\/script>');
			document.write('<script type="text/javascript" src="/js/lib/jquery.gsap.min.js"><\/script>');
		}
		document.write('<script type="text/javascript" src="/js/lib/jquery.countTo.min.js"><\/script>');
		document.write('<script type="text/javascript" src="/js/lib/jquery.typeWriter.min.js"><\/script>');

		document.write('<link rel="stylesheet" type="text/css" href="/css/reset' + DEBUG + '.css" \/>');
		document.write('<link rel="stylesheet" type="text/css" href="/css/style' + DEBUG + '.css" \/>');
		document.write('<link rel="stylesheet" type="text/css" href="/css/mobile' + DEBUG + '.css" \/>');
	}
}
xmlhttp.open("GET", "/get_ver/", false);
xmlhttp.send();
