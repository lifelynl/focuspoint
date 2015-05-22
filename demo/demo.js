/*****************************************************/
/* Edit & view */
/*****************************************************/
var fpElm = document.querySelector('.lfy-focuspoint-edit');
var fpButtonElm = fpElm.querySelector('.lfy-focuspoint-button');
var fpViewElm = document.querySelector('.lfy-focuspoint-view');

var fp = new Focuspoint.Edit(fpElm, fpButtonElm, {
    // options here
});
fp.attachBackgroundPosition(fpViewElm);


/*****************************************************/
/* View */
/*****************************************************/
var fpViewElm2 = document.querySelector('.lfy-focuspoint-view.second');
var fpViewElm2Select = document.querySelector('[name="view_binder_event_selector"]');

var fp2 = new Focuspoint.View(fpViewElm2, fp.x, fp.y, {
    // options here
});
var eventId = fp.on(fpViewElm2Select.value, fp2.set);

// Change the event type (dropdown selector)
fpViewElm2Select.addEventListener('change', function () {
    fp.off(eventId); // unbind old
    eventId = fp.on(this.value, fp2.set); // bind new
});