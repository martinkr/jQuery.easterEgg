<a name="README">[jQuery.easterEgg](https://github.com/martinkr/jQuery.easterEgg)</a>
=======

# jQuery.easterEgg - feeling adventurous? Add a hidden treasure to your page!

Type the right key sequence right upon entering to unlock the hidden treasue.
The plugin will start watching upon the first keypress - don't hesitate ;)

## Features
- Multiple easterEggs on one page: hide easter eggs on specific element
- Use your own key sequence: with the konami code as the default
- Listen to "jQuery.easterEgg" or override the complete callback with your own function
- Memory friendly: removes all events / data afterwards

## Examples

### Basic example

Installing the easter egg on the document body: triggers in the key sequence is entered while the focus is on the body-element.
Uses the default key sequence - the konami code ("up up down down left right left right b a") and listens for the easter egg event "jQuery.easterEgg" to activate the hidden function.

<pre>
  $('body').easterEgg();
  $('body').on('jQuery.esterEgg',function(){alert('konami code')});
</pre>

### Using a custom key sequence
Pass an object containing your sequence as an array of keycodes
<pre>
  $('body').easterEgg( { keys:[66,65] } );
</pre>

### overriding the complete function
Replace the complete callback with your own function.
<pre>
  $.fn.easterEgg.found = function () {
    alert('custom')
  } ;
</pre>

### Multiple easter eggs
<pre>
  // install the konami code on the first input element
  $('input').easterEgg();
  $('input').on('jQuery.esterEgg',function(event_){ event_.stopPropagation(); alert('input: konami code')});

  // and the custom key sequence on the body
  $('body').easterEgg({keys:[66,65]});
  $('body').on('jQuery.esterEgg',function(){alert('body: custom code')});
</pre>


## Requires
* jQuery JavaScript Library 1.7+ - http://jquery.com/; Copyright 2010, John Resig; Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license

## License
Dual licensed under the MIT and GPL licenses.

* MIT - http://www.opensource.org/licenses/mit-license.php
* GNU - http://www.gnu.org/licenses/gpl-3.0.html

Copyright (c) 2011 Martin Krause (jquery.public.mkrause.info)
