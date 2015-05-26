/*****************************************************/
/* Edit & view */
/*****************************************************/
var initEditViewFocuspoint = function () {
    var edit_element = document.querySelector('.lfy-focuspoint-edit');
    var button_element = edit_element.querySelector('.lfy-focuspoint-button');
    var view_element = document.querySelector('.lfy-focuspoint-view');

    var focuspoint = new Focuspoint.Edit(edit_element, {
        button_elm: button_element,
        view_elm: view_element
    });

    return focuspoint;
};

var edit_focuspoint = initEditViewFocuspoint();


/*****************************************************/
/* View */
/*****************************************************/
var initViewFocuspoint = function (edit_focuspoint) {
    var view_element = document.querySelector('.lfy-focuspoint-view.second');

    var focuspoint = new Focuspoint.View(view_element, {
        x: edit_focuspoint.current.x,
        y: edit_focuspoint.current.y,
    });

    edit_focuspoint.on('change', function (x, y) {
        focuspoint.set(x, y);
    });

    return focuspoint;
};

var view_focuspoint = initViewFocuspoint(edit_focuspoint);

// var fpViewElm2 = document.querySelector('.lfy-focuspoint-view.second');
// var fpViewElm2Select = document.querySelector('[name="view_binder_event_selector"]');

// var fp2 = new Focuspoint.View(fpViewElm2, fp.x, fp.y, {
//     // options here
// });
// var eventId = fp.on(fpViewElm2Select.value, fp2.set);

// // Change the event type (dropdown selector)
// fpViewElm2Select.addEventListener('change', function () {
//     fp.off(eventId); // unbind old
//     eventId = fp.on(this.value, fp2.set); // bind new
// });