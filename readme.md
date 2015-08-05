# The Focuspoint

In a nutshell, the focuspoint offers a solution to view images in all different ratios after the user has defined a focuspoint (hot spot) in the image while uploading it. The focuspoint is suitable for every kind of JavaScript application.

See the [demo here](http://htmlpreview.github.io/?https://raw.githubusercontent.com/lifelynl/focuspoint/develop/demo/demo.html "demo")

## To install

__JavaScript package:__
`bower install focuspoint`, then manually include /dist/focuspoint.js and /dist/focuspoint.css and the classList and requestAnimationFrame polyfills

__MeteorJS package:__
`meteor add lifelynl:focuspoint`

__AngularJS module:__
`coming soon`

## What and why?

Designing web products, used to be simple. Basically everyone experienced your website the same. Nowadays, we have to design and develop for countless different devices. Menus, textual content and icons are easy; it's just a matter of properly arranging them. Images, however, are a different story. Most photographs have a 3:2 ratio so whenever the screen ratio alters, you have to crop the photo and only the middle of the image is displayed. You'll see that most subjects are either cut off or even completely outside the frame.

So we came up with the Focuspoint. Just like when you take a photograph, whenever you upload an image, you tell us where the focus should be. We then use a simple CSS rule in order to apply the best background position for every device. The benefit of the focuspoint is that the photographs, even on super small devices like a watch, will always look great.


__Concept video:__

[![IMAGE ALT TEXT HERE](https://i.vimeocdn.com/video/525803207_1280.jpg)]
(https://vimeo.com/132535449)

## Technical concept
- For every image, you'll have to be able to save the focuspoint as two decimal values between 0 and 1, x and y. These represent the coordinates of the focuspoint in the picture. So it is important to write some back-end code for this. That's up to you ;)
- To apply the focuspoint to an image in your application, we just use `background-size: cover` in combination with a `background-position` CSS-rule on your element.
- To create a focuspoint editor in your image upload module, we will render a draggable dot for you. Then you can simply read out the x and y values to save them to your database whenever you want.

## API

For the full API, please visit the [wiki on Github](https://github.com/lifelynl/focuspoint/wiki/API "/wiki/API").

## Basic example for the editor

```html
<figure class="lfy-focuspoint-view" id="view" style="background-image: url('/my-image.jpg')">
    <div class="lfy-focuspoint-edit" id="edit">
        <button class="lfy-focuspoint-button" id="button"></button>
    </div>
</figure>
```

These css-classes are quite necessary. We recommend you to always use those classes and overwrite the styling for the button to your needs.

```js
var element = document.getElementById('edit');

var editor = new Focuspoint.Edit(element, {
    view_elm: document.getElementById('view'),
    x: 0.456,
    y: 0.124
});

editor.on('drag:end', function(x, y) {
    // your callback code here
});
```

We look for an element with the 'lfy-focuspoint-button' class to find the button. When you don't use that classname, you can alternatively specify a `button_elm`.

## Basic example for viewing

```html
<figure class="lfy-focuspoint-view" id="view" style="background-image: url('/my-image.jpg')"></figure>
```

```js
var element = document.getElementById('view');

var viewer = new Focuspoint.View(element, {
    x: 0.456,
    y: 0.124
});
```
