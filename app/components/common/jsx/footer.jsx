import React from 'react';


const year = (new Date()).getFullYear();

const Footer = () => (
  <footer class="text-off-white">
		<div class="footer">
		  <div class="mini-city hidden-sm hidden-xs">
		    <a href="https://dribbble.com/shots/1772409-Golden-Gate-Bridge" target="_blank" rel="noopener noreferrer external">
		      <img src="/img/fg_city_sfo.gif" alt="Minimal City SFO" width="128" height="96" />
		    </a>
		  </div>
		  <div class="container text-center FOOTER__header">
		    <div class="copyright text-center">
		      Copyright <i class="fa fa-fw fa-copyright"></i> <a>2015 - {year}</a>
		      Designed, built &amp; managed by
		      <a href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">
		        <div class="sprite" style="height:14px; width:44px;"><i class="logo_alt_w"></i></div>
		      </a>.
		      All rights reserverd.
		    </div>
		    <p class="copyright" style="padding-top:10px;">
		      <a href="https://github.com/t47io/t47io_main/" target="_blank" rel="noopener noreferrer external" class="text-gray">
		        Code and content <i class="fa fa-fw fa-sm fa-external-link"></i>
		      </a>
		      on this site is licensed under
		      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer external">
		        <i class="fa fa-fw fa-lg fa-creative-commons"></i> BY-NC-SA 4.0 <i class="fa fa-fw fa-sm fa-external-link"></i>
		      </a>.
		    </p>
		  </div>
		  <div class="mini-city hidden-sm hidden-xs">
		    <a href="https://dribbble.com/shots/2037387-Seattle-FTW" target="_blank" rel="noopener noreferrer external">
		      <img src="/img/fg_city_sea.gif" alt="Minimal City SEA" width="128" height="96" />
		    </a>
		  </div>
		</div>
	</footer>
);


export default Footer;