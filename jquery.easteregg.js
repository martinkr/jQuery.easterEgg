/*
 * jQuery.easterEgg - https://github.com/martinkr/jQuery.esterEgg
 *
 * jQuery.easterEgg - feeling adventurous? Add a hidden treasure to your page!
 *
 * @version 1.0.0
 *
 * @example:
 * // installing the easter egg on the document body
 * // (triggers in the keysequence is entered while the focus is on the body-element)
 * // and using the default event
 * // and the default key sequence - the konami code
 * $('body').easterEgg();
 * $('body').on('jQuery.esterEgg',function(){alert('konami code')});
 *
 * // customize
 * // use a custom key sequence (b,a) and override the complete function
 * $.fn.easterEgg.found = function () {
 * 		alert('custom')
 * } ;
 * $('body').easterEgg({keys:[66,65]});
 *
 * // Multiple easter eggs
 * // install the konami code on the first input element
 * // and the custom key sequence on the body
 * $('input').easterEgg();
 * $('input').on('jQuery.esterEgg',function(event_){ event_.stopPropagation(); alert('input: konami code')});
 * $('body').easterEgg({keys:[66,65]});
 * $('body').on('jQuery.esterEgg',function(){alert('body: custom code')});
 *
 * Copyright (c) 2011 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @requires
 *  jQuery JavaScript Library +1.7 - http://jquery.com/
 *    Copyright 2010, John Resig
 *    Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license
 *
 */

// JSLint setting, @see http://www.jslint.com/lint.html#options
/*jslint devel: false, browser: true, continue: true, eqeq: true, vars: true, evil: true, white: true, forin: true, css: true, nomen: true, plusplus: true, maxerr: 500, indent: 4 */
/* global jQuery */

(function($) {

	/**
	 * Constructor
	 * @param {Object} [{keys:[]}], define your own easterEgg command
	 * @return {Object} chainable jQuery object
	 */
	$.fn.easterEgg = function(oOptions_) {
		// merge plugin options
		var _oOpts = jQuery.extend(
			{},
			{
				// default (konami code): up up down down left right left right b a
				keys: [38,38,40,40,37,39,37,39,66,65]
			},
			oOptions_
		);
		// add necessary values
		_oOpts.index = 0;
		_oOpts.length = _oOpts.keys.length;
		_oOpts.$element = jQuery(this);

		// create easter eggs
		return this.each(function() {
			jQuery(this)
				.data('easterEgg',_oOpts)
				.on('keydown.eE',$.fn.easterEgg.handler);
		});
	};

	/**
	 * Remove event and data
	 * @param  {jQuery-Element} $element_ expired element
	 * @private
	 * @return {void}
	 */
	var _teardown = function ($element_) {
		$element_
			.data('easterEgg','')
			.off('keydown.eE',$.fn.easterEgg.handler);
	};

	/**
	 * Event handler: keydown.
	 * Check if the current key is part of the key sequence.
	 * Call oncomplete handler aka "found" and remove all
	 * plugin data from the expiret element
	 * @public
	 * @param  {Event} event_ jQuery-Event
	 * @return {void}
	 */
	$.fn.easterEgg.handler = function(event_) {
		// grab data
		var _oOpts = jQuery(this).data('easterEgg');
		// if the current key is not part of the key sequence: expired!
		if ( _oOpts.keys[_oOpts.index++] != event_.keyCode ) {
			_teardown(_oOpts.$element);
			return;
		}

		// we're seeing the whole sequence: found an egg!
		if (_oOpts.index == _oOpts.length ) {
				_teardown(_oOpts.$element);
				$.fn.easterEgg.found(event_);
				return;
		}
		// update data (index+1)
		jQuery(this).data('easterEgg',_oOpts);
		return;
	};

	/**
	 * Callback: found an easter egg!
	 * Triggers an "jQuery.easterEgg" event on the element
	 * on which we found the hidden treasure.
	 * Override with a custom function if you want to
	 * @param  {jQuery-Event} event_ The original keydown event
	 * @return {void}
	 */
	$.fn.easterEgg.found = function (event_) {
		jQuery(event_.target)
			.trigger('jQuery.esterEgg');
	} ;

})(jQuery);

