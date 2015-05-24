/**
 * @license Focuspoint v1.0.0
 * (c) 2015 Lifely
 * License: MIT
 */

(function (global) {
    "use strict";

    // Helpers object
    var helpers = {

        // Returns true if o is a DOM element
        isElement: function (o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        },

        // Error
        error: function (options, msg) {
            if (options.show_errors) {
                console.error('Focuspoint error:', msg);
            }
        }

    }

    // View constructor
    function View (viewElm, x, y, options) {
        var _self = this;

        /*****************************************************/
        /* States */
        /*****************************************************/
        _self.x = .5;
        _self.y = .5;

        /*****************************************************/
        /* Set state */
        /*****************************************************/
        _self.set = function set (x, y) {
            try {
                if (typeof x !== 'number') throw 'the given x coordinate is not a number';
                if (typeof y !== 'number') throw 'the given y coordinate is not a number';
                if (x < 0 || x > 1) throw 'the x coordinate must be a number between 0 and 1';
                if (y < 0 || y > 1) throw 'the y coordinate must be a number between 0 and 1';

                var bounded_x = Math.max(0, Math.min(x, 1));
                var bounded_y = Math.max(0, Math.min(y, 1));

                _self.x = bounded_x;
                _self.y = bounded_y;

                _setBackgroundPosition(x, y);

                return true;
            } catch(e) {
                return helpers.error(_self.options, e);
            }
        };

        /*****************************************************/
        /* Set background position */
        /*****************************************************/
        var _setBackgroundPosition = function setBackgroundPosition (x, y) {
            var percent_x = (x * 100) + '%';
            var percent_y = (y * 100) + '%';
            viewElm.style.backgroundPosition = 'top ' + percent_y + ' left ' + percent_x;
        };

        /*****************************************************/
        /* Validate arguments and initialise */
        /*****************************************************/
        try {
            if (options && ( typeof options !== 'object' || Array.isArray(options) )) throw 'when passing options, it must be an object';

            // Options
            _self.options = {};
            _self.options.show_errors = options && typeof options.show_errors !== 'undefined' ? options.show_errors : true;

            // Element validation
            if (!helpers.isElement(viewElm)) throw 'the given view element is not a DOM element';

            // Default state
            if(x && y || typeof x === 'number' && typeof y === 'number') {
                _self.set(x, y);
            }

        } catch(e) {
            return helpers.error(_self.options, e);
        }

    }
    
    // Edit constructor
    function Edit (containerElm, btnElm, options) {
        var _self = this;

        /*****************************************************/
        /* States */
        /*****************************************************/
        _self.x = .5;
        _self.y = .5;

        /*****************************************************/
        /* Listener system */
        /*****************************************************/
        var _listeners = {
            possibleEvents: ['start', 'move', 'stop'],
            applyFor: function (eventName, args) {
                if (this.possibleEvents.indexOf(eventName) === -1) return;

                args = args || [];
                if (!Array.isArray(args)) return;

                this.callbacks.forEach(function (o, index) {
                    if (typeof o.cb !== 'function') return;
                    if (o.eventName !== eventName) return;

                    o.cb.apply(window, args);
                });
            },
            inc: 0,
            callbacks: []
        };

        _self.on = function on (eventName, cb) {
            try {

                if (typeof eventName !== 'string') throw 'eventName is not a string';
                if (typeof cb !== 'function') throw 'onChange callback is not a function';
                if (_listeners.possibleEvents.indexOf(eventName) === -1) throw 'event "' + eventName + '" does not exist';

                _listeners.inc ++;

                var id = _listeners.inc;
                var r = {
                    id: id,
                    eventName: eventName,
                    cb: cb
                };

                _listeners.callbacks.push(r);

                return id;

            } catch(e) {
                return helpers.error(_self.options, e);
            }
        };

        _self.off = function off (id) {
            try {
                var match = null;
                _listeners.callbacks.forEach(function (o, index) {
                    if (match) return;
                    if (o.id !== id) return;
                    match = index;
                });

                if (match === null) throw 'could not find listener for id: ' + id;

                return !! _listeners.callbacks.splice(match, 1);

            } catch(e) {
                return helpers.error(_self.options, e);
            }
        };

        /*****************************************************/
        /* Set state */
        /*****************************************************/
        _self.set = function set (x, y) {
            try {
                if (typeof x !== 'number') throw 'the given x coordinate is not a number';
                if (typeof y !== 'number') throw 'the given y coordinate is not a number';
                if (x < 0 || x > 1) throw 'the x coordinate must be a number between 0 and 1';
                if (y < 0 || y > 1) throw 'the y coordinate must be a number between 0 and 1';

                var bounded_x = Math.max(0, Math.min(x, 1));
                var bounded_y = Math.max(0, Math.min(y, 1));

                _self.x = bounded_x;
                _self.y = bounded_y;

                _setButtonPosition(bounded_x, bounded_y);

                return true;
            } catch(e) {
                return helpers.error(_self.options, e);
            }
        };

        /*****************************************************/
        /* Set button position */
        /*****************************************************/
        var _setButtonPosition = function setButtonPosition (x, y) {
            btnElm.style.left = (x * 100) + '%';
            btnElm.style.top = (y * 100) + '%';
        };

        /*****************************************************/
        /* Set button position by event */
        /*****************************************************/
        var _getPositionByEvent = function getPositionByEvent (event) {
            var r = containerElm.getBoundingClientRect();

            var x = event.pageX - r.left;
            var y = event.pageY - r.top;
            
            var x_factor = x / r.width;
            var y_factor = y / r.height;

            var bounded_x_factor = Math.max(0, Math.min(x_factor, 1));
            var bounded_y_factor = Math.max(0, Math.min(y_factor, 1));

            return {
                x: bounded_x_factor,
                y: bounded_y_factor
            };
        };

        /*****************************************************/
        /* Attach live background position to image */
        /*****************************************************/
        _self.attachBackgroundPosition = function attachBackgroundPosition (elm) {
            try {
                if (!helpers.isElement(elm)) throw 'the given element is not a DOM element';

                var setToElm = function (x, y) {
                    var percent_x = (x * 100) + '%';
                    var percent_y = (y * 100) + '%';
                    elm.style.backgroundPosition = 'top ' + percent_y + ' left ' + percent_x;
                };

                var onMoveId = _self.on('move', setToElm);
                setToElm(_self.x, _self.y);

                return onMoveId;

            } catch(e) {
                return helpers.error(_self.options, e);
            }
        };

        _self.detachBackgroundPosition = _self.off;

        /*****************************************************/
        /* Validate arguments and initialise */
        /*****************************************************/
        try {
            if (options && ( typeof options !== 'object' || Array.isArray(options) )) throw 'when passing options, it must be an object';

            // Options
            _self.options = {};
            _self.options.show_errors = options && typeof options.show_errors !== 'undefined' ? options.show_errors : true;
            _self.options.hide_cursor = options && typeof options.hide_cursor !== 'undefined' ? options.hide_cursor : true;
            _self.options.default_x = options && typeof options.default_x !== 'undefined' ? options.default_x : .50;
            _self.options.default_y = options && typeof options.default_y !== 'undefined' ? options.default_y : .50;
            _self.options.classnames = {};
            _self.options.classnames.container_hidecursor = options && options.classnames && typeof options.classnames.container_hidecursor !== 'undefined' ? options.classnames.container_hidecursor : 'lfy-focuspoint-edit-hidecursor';

            // Element validation
            if (!helpers.isElement(containerElm)) throw 'the given container element is not a DOM element';
            if (!helpers.isElement(btnElm)) throw 'the given button element is not a DOM element';

            // Default state
            _self.set(_self.options.default_x, _self.options.default_y);

            // Add first mousedown event listener
            btnElm.addEventListener('mousedown', function (event) {
                var start_pos = _getPositionByEvent(event);
                _self.set(start_pos.x, start_pos.y);
                _listeners.applyFor('start', [
                    start_pos.x,
                    start_pos.y
                ]);
                if (_self.options.hide_cursor) {
                    containerElm.classList.add(_self.options.classnames.container_hidecursor);
                }

                var move = function (event) {
                    window.requestAnimationFrame(function () {
                        var move_pos = _getPositionByEvent(event);
                        _self.set(move_pos.x, move_pos.y);
                        _listeners.applyFor('move', [
                            move_pos.x,
                            move_pos.y
                        ]);
                    });
                };

                var up = function (event) {
                    var stop_pos = _getPositionByEvent(event);
                    _listeners.applyFor('stop', [
                        stop_pos.x,
                        stop_pos.y
                    ]);
                    containerElm.classList.remove(_self.options.classnames.container_hidecursor);

                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                };

                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', up);
            });

        } catch(e) {
            return helpers.error(_self.options, e);
        }

    }

    // Expose
    global.Focuspoint = {
        View: View,
        Edit: Edit
    };

})(window);
