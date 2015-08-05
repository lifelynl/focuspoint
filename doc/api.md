<a name="Focuspoint"></a>
## Focuspoint : <code>object</code>
Focuspoint API

**Kind**: global namespace

* [Focuspoint](#Focuspoint) : <code>object</code>
  * [.View](#Focuspoint.View)
    * [new Focuspoint.View(element, options)](#new_Focuspoint.View_new)
    * [.current](#Focuspoint.View.current) : <code>Object</code>
    * [.set](#Focuspoint.View.set) : <code>function</code>
    * [.kill](#Focuspoint.View.kill) : <code>function</code>
  * [.Edit](#Focuspoint.Edit)
    * [new Focuspoint.Edit(element, options)](#new_Focuspoint.Edit_new)
    * [.current](#Focuspoint.Edit.current) : <code>Object</code>
    * [.set](#Focuspoint.Edit.set) : <code>function</code>
    * [.on](#Focuspoint.Edit.on) ⇒ <code>Number</code>
    * [.off](#Focuspoint.Edit.off) : <code>function</code>
    * [.kill](#Focuspoint.Edit.kill) : <code>function</code>

<a name="Focuspoint.View"></a>
### Focuspoint.View
**Kind**: static class of <code>[Focuspoint](#Focuspoint)</code>

* [.View](#Focuspoint.View)
  * [new Focuspoint.View(element, options)](#new_Focuspoint.View_new)
  * [.current](#Focuspoint.View.current) : <code>Object</code>
  * [.set](#Focuspoint.View.set) : <code>function</code>
  * [.kill](#Focuspoint.View.kill) : <code>function</code>

<a name="new_Focuspoint.View_new"></a>
#### new Focuspoint.View(element, options)
View constructor


| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The View component element |
| options | <code>Object</code> | The options for the View component |
| options.x | <code>Number</code> | X coordinate to start with (number between 0 and 1) |
| options.y | <code>Number</code> | Y coordinate to start with (number between 0 and 1) |

**Example**
```js
var view_element = document.querySelector('.lfy-focuspoint-view');
var focuspoint = new Focuspoint.View(view_element, {
    x: 0.752,
    y: 0.251
});
```
<a name="Focuspoint.View.current"></a>
#### View.current : <code>Object</code>
Holds the current x and y values

**Kind**: static property of <code>[View](#Focuspoint.View)</code>
**Read only**: true
**Example**
```js
var x = focuspoint.current.x;
```
<a name="Focuspoint.View.set"></a>
#### View.set : <code>function</code>
Changes the x and y. This will:
 - Change the binded background-position
 - Update the coordinates in focuspoint.current

**Kind**: static property of <code>[View](#Focuspoint.View)</code>
**Example**
```js
focuspoint.set(0.345, 0.577);
```
<a name="Focuspoint.View.kill"></a>
#### View.kill : <code>function</code>
Kills the View instance, unbinds event handlers when present

**Kind**: static property of <code>[View](#Focuspoint.View)</code>
**Example**
```js
focuspoint.kill();
delete focuspoint; // To fully kill the object, use 'delete focuspoint;' afterwards
```
<a name="Focuspoint.Edit"></a>
### Focuspoint.Edit
**Kind**: static class of <code>[Focuspoint](#Focuspoint)</code>

* [.Edit](#Focuspoint.Edit)
  * [new Focuspoint.Edit(element, options)](#new_Focuspoint.Edit_new)
  * [.current](#Focuspoint.Edit.current) : <code>Object</code>
  * [.set](#Focuspoint.Edit.set) : <code>function</code>
  * [.on](#Focuspoint.Edit.on) ⇒ <code>Number</code>
  * [.off](#Focuspoint.Edit.off) : <code>function</code>
  * [.kill](#Focuspoint.Edit.kill) : <code>function</code>

<a name="new_Focuspoint.Edit_new"></a>
#### new Focuspoint.Edit(element, options)
Edit constructor


| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The Edit component element |
| options | <code>Object</code> | The options for the Edit component |
| [options.x] | <code>Number</code> | X-coordinate to start with (number between 0 and 1) |
| [options.y] | <code>Number</code> | Y-coordinate to start with (number between 0 and 1) |
| [options.view_elm] | <code>Element/Array</code> | The view element(s) to bind to the Edit component |
| [options.button_elm] | <code>Element</code> | The button element when not using the class "lfy-focuspoint-button" or when the button is not inside the Edit component element |
| [options.hide_cursor] | <code>Boolean</code> | Whether the cursor should be hidden while moving the button |
| [options.no_cursor_class] | <code>String</code> | The class used to disable the cursor |

**Example**
```js
var edit_element = document.querySelector('.lfy-focuspoint-edit');
var view_element = document.querySelector('.lfy-focuspoint-view');

var focuspoint = new Focuspoint.Edit(edit_element, {
    view_elm: view_element
});
```
<a name="Focuspoint.Edit.current"></a>
#### Edit.current : <code>Object</code>
Holds the current x and y values

**Kind**: static property of <code>[Edit](#Focuspoint.Edit)</code>
**Read only**: true
**Example**
```js
var x = focuspoint.current.x;
```
<a name="Focuspoint.Edit.set"></a>
#### Edit.set : <code>function</code>
Changes the x and y. This will:
 - Change the button position
 - Change the possibly binded background-positions
 - Update the coordinates in focuspoint.current
 - Trigger the 'change' event

**Kind**: static property of <code>[Edit](#Focuspoint.Edit)</code>
**Example**
```js
focuspoint.set(0.345, 0.577);
```
<a name="Focuspoint.Edit.on"></a>
#### Edit.on ⇒ <code>Number</code>
Binds a handler to an event

**Kind**: static property of <code>[Edit](#Focuspoint.Edit)</code>
**Returns**: <code>Number</code> - id - The event handler identification you'll need to unbind the handler

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Can be 'change', 'drag:start', 'drag:move' and 'drag:end' |
| handler | <code>function</code> | The passed arguments of the handler will always be [x, y]. |

**Example**
```js
var id = focuspoint.on('drag:end', function () {
    // for example: some API call to save the new focuspoint
});
```
<a name="Focuspoint.Edit.off"></a>
#### Edit.off : <code>function</code>
Unbinds a handler from an event

**Kind**: static property of <code>[Edit](#Focuspoint.Edit)</code>

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The event handler identification of the handler you want to unbind |

**Example**
```js
focuspoint.off(id);
```
<a name="Focuspoint.Edit.kill"></a>
#### Edit.kill : <code>function</code>
Kills the Edit instance, unbinds event handlers

**Kind**: static property of <code>[Edit](#Focuspoint.Edit)</code>
**Example**
```js
focuspoint.kill();
delete focuspoint; // To fully kill the object, use 'delete focuspoint;' afterwards
```
