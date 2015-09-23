/*****************************************************/
/* Edit */
/*****************************************************/
var edit_element = document.getElementById('edit');
var edit_focuspoint = new Focuspoint.Edit(edit_element, {
    view_elm: document.getElementById('view2'),
    x: 0.85,
    y: 0.15
});


/*****************************************************/
/* View */
/*****************************************************/
var common_options = {
    x: edit_focuspoint.current.x,
    y: edit_focuspoint.current.y
};

var view_element1 = document.getElementById('view1');
var view_focuspoint1;
if (view_element1) {
    view_focuspoint1 = new Focuspoint.View(view_element1, common_options);
}

var view_element3 = document.getElementById('view3');
var view_focuspoint3;
if (view_element3) {
    view_focuspoint3 = new Focuspoint.View(view_element3, common_options);
}

var view_element4 = document.getElementById('view4');
var view_focuspoint4;
if (view_element4) {
    view_focuspoint4 = new Focuspoint.View(view_element4, common_options);
}

edit_focuspoint.on('change', function (x, y) {
    if (view_focuspoint1) view_focuspoint1.set(x, y);
    if (view_focuspoint3) view_focuspoint3.set(x, y);
    if (view_focuspoint4) view_focuspoint4.set(x, y);

    edit_element.classList.add('changed')
});
