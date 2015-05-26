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