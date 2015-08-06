/**
 * @license Focuspoint v1.0.3
 * (c) 2015 Lifely
 * License: MIT
 */

(function (global) {
    "use strict";

    /*********************************************************************/
    /* Helpers */
    /*********************************************************************/
    var Helpers = {

        // Returns true if o is a DOM element
        isDOMElement: function isDOMElement (o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        },

        // Returns true if all items in the given array are DOM elements
        areDOMElements: function areDOMElements (arr) {
            try {
                if (typeof arr !== 'object' || !Array.isArray(arr)) throw 'arr is not an array.';

                return arr.every(function (o) {
                    return Helpers.isDOMElement(o);
                });

            } catch(e) {
                return new Library.InternalError('Helpers.areDOMElements()', e);
            }
        },

        // Bound a number between two values
        bound: function bound (value, min, max) {
            try {
                if (typeof value !== 'number') throw 'value is not a number.';
                if (typeof min !== 'number') throw 'min is not a number.';
                if (typeof max !== 'number') throw 'max is not a number.';

                return Math.max(min, Math.min(value, max));

            } catch(e) {
                return new Library.InternalError('Helpers.bound()', e);
            }
        },

        // Get position by mouse event
        getPositionInElementByEvent: function getPositionInElementByEvent (elm, start_current, start_pos, event, touch) {
            try {
                if (!Helpers.isDOMElement(elm)) throw 'elm is not a DOM element.';
                if (typeof event === 'undefined') throw 'event is undefined.';
                if (touch) {
                    if (typeof event.touches !== 'undefined' && event.touches.length <= 0) throw 'no touches found in event.';
                    if (typeof event.touches[0].pageX !== 'number') throw 'event.touches[0].pageX not found.';
                    if (typeof event.touches[0].pageY !== 'number') throw 'event.touches[0].pageY not found.';
                } else {
                    if (typeof event.pageX !== 'number') throw 'event.pageX not found.';
                    if (typeof event.pageY !== 'number') throw 'event.pageY not found.';
                }

                var r = elm.getBoundingClientRect();

                var x_delta = (touch ? event.touches[0].pageX : event.pageX) - start_pos.x;
                var y_delta = (touch ? event.touches[0].pageY : event.pageY) - start_pos.y;

                var x_delta_factor = x_delta / r.width;
                var y_delta_factor = y_delta / r.height;

                var x_factor = start_current.x + x_delta_factor;
                var y_factor = start_current.y + y_delta_factor;

                var x_factor_bounded = Helpers.bound(x_factor, 0, 1);
                var y_factor_bounded = Helpers.bound(y_factor, 0, 1);

                return {
                    x: x_factor_bounded,
                    y: y_factor_bounded
                };

            } catch(e) {
                return new Library.InternalError('Helpers.getPositionInElementByEvent()', e);
            }
        },

        // Apply a background position to an element
        setBackgroundPositionToElm: function setBackgroundPositionToElm (elm, x, y) {
            try {
                if (!Helpers.isDOMElement(elm)) throw 'elm is not a DOM element.';
                if (typeof x !== 'number') throw 'x is not a number.';
                if (typeof y !== 'number') throw 'y is not a number.';
                if (x < 0 || x > 1) throw 'x must be a number between 0 and 1.';
                if (y < 0 || y > 1) throw 'y must be a number between 0 and 1.';

                var bounded_x = Helpers.bound(x, 0, 1);
                var bounded_y = Helpers.bound(y, 0, 1);
                var percent_x = (bounded_x * 100) + '%';
                var percent_y = (bounded_y * 100) + '%';
                elm.style.backgroundPosition = 'top ' + percent_y + ' left ' + percent_x;

                return true;

            } catch(e) {
                return new Library.InternalError('Helpers.setBackgroundPositionToElm()', e);
            }
        },

        // Apply a position to a button-element
        setPositionToButtonElement: function setPositionToButtonElement (elm, x, y) {
            try {
                if (!Helpers.isDOMElement(elm)) throw 'elm is not a DOM element.';
                if (typeof x !== 'number') throw 'x is not a number.';
                if (typeof y !== 'number') throw 'y is not a number.';
                if (x < 0 || x > 1) throw 'x must be a number between 0 and 1.';
                if (y < 0 || y > 1) throw 'y must be a number between 0 and 1.';

                elm.style.left = (x * 100) + '%';
                elm.style.top = (y * 100) + '%';

                return true;

            } catch(e) {
                return new Library.InternalError('Helpers.setPositionToButtonElement()', e);
            }
        },

        // Initialize drag
        initializeDrag: function initializeDrag (container_elm, button_elm, current, eventSystem, hide_cursor, no_cursor_class) {

            try {
                if (!Helpers.isDOMElement(container_elm)) throw 'container_elm is not a DOM element';
                if (!Helpers.isDOMElement(button_elm)) throw 'button_elm is not a DOM element';
                if (typeof current !== 'object') throw 'current coordinates placeholder is not an object';
                if (typeof eventSystem !== 'object') throw 'eventSystem is not an object';
                if (typeof hide_cursor !== 'boolean') throw 'hide_cursor is not a boolean';
                if (hide_cursor && typeof no_cursor_class !== 'string') throw 'no_cursor_class is not a string';

                // Start mouse position
                var start_pos = {}, start_current = {}, touch;

                // Universal handler
                var change = function (type, mouseEvent) {

                    if(type !== 'end') {

                        // Update mouse start position
                        if (type === 'start') {
                            if (touch) {
                                start_pos.x = mouseEvent.touches[0].pageX;
                                start_pos.y = mouseEvent.touches[0].pageY;
                            } else {
                                start_pos.x = mouseEvent.pageX;
                                start_pos.y = mouseEvent.pageY;
                            }
                            start_current.x = current.x;
                            start_current.y = current.y;
                        }

                        // Determine position by mouse event
                        var pos = Helpers.getPositionInElementByEvent(container_elm, start_current, start_pos, mouseEvent, touch);

                        // Update current coordinates and fire 'change' event
                        var changed = pos.x !== current.x || pos.y !== current.y;
                        if (changed) {
                            current.x = pos.x;
                            current.y = pos.y;
                            eventSystem.applyEvent('change', [current.x, current.y]);
                        }

                    }

                    // Fire drag:* event
                    eventSystem.applyEvent('drag:' + type, [current.x, current.y]);

                    // Other actions
                    if (hide_cursor) {
                        if (type === 'start') {
                            container_elm.classList.add(no_cursor_class);
                        } else if (type === 'end') {
                            container_elm.classList.remove(no_cursor_class);
                        }
                    }
                };

                // Handlers
                var start = function (event) {
                    event.preventDefault();
                    touch = typeof event.touches !== 'undefined';
                    change('start', event);
                    document.addEventListener(touch ? 'touchmove' : 'mousemove', move);
                    document.addEventListener(touch ? 'touchend' : 'mouseup', end);
                };

                var move = function (event) {
                    event.preventDefault();
                    window.requestAnimationFrame(function () {
                        change('move', event);
                    });
                };

                var end = function (event) {
                    event.preventDefault();
                    change('end', event);
                    document.removeEventListener('touchmove', move);
                    document.removeEventListener('touchend', end);
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', end);
                };

                // Initial bind
                button_elm.addEventListener('touchstart', start);
                button_elm.addEventListener('mousedown', start);

                // Return unbinder
                return function () {
                    button_elm.removeEventListener('touchstart', start);
                    document.removeEventListener('touchmove', move);
                    document.removeEventListener('touchend', end);
                    button_elm.removeEventListener('mousedown', start);
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', end);
                };

            } catch(e) {
                return new Library.InternalError('Helpers.initializeDrag()', e);
            }
        },

        // Attach views to a focus point
        attachViews: function attachViews (view_elm, current, event_binder) {
            try {
                if (Array.isArray(view_elm) && !Helpers.areDOMElements(view_elm)) throw 'view_elm is an array, but not all items are DOM elements';
                if (typeof view_elm !== 'object' || !Helpers.isDOMElement(view_elm)) throw 'view_elm is not a DOM element';
                if (typeof current !== 'object') throw 'current is not an object';
                if (typeof current.x !== 'number') throw 'current.x is not a number';
                if (typeof current.y !== 'number') throw 'current.y is not a number';
                if (typeof event_binder !== 'function') throw 'event_binder is not a function';

                var setBackgroundPositionToViewElms = function (elms, x, y) {
                    if (Array.isArray(elms)) {
                        elms.forEach(function (elm) {
                            Helpers.setBackgroundPositionToElm(elm, x, y);
                        });
                    } else {
                        var elm = elms;
                        Helpers.setBackgroundPositionToElm(elm, x, y);
                    }
                };

                // Once
                setBackgroundPositionToViewElms(view_elm, current.x, current.y);

                // On every change
                return event_binder('change', function (x, y) {
                    setBackgroundPositionToViewElms(view_elm, x, y);
                });

            } catch(e) {
                return new Library.InternalError('Helpers.attachViews()', e);
            }
        },

        // Attach button to a drag position
        attachButton: function attachButton (button_elm, current, event_binder) {
            try {
                if (!Helpers.isDOMElement(button_elm)) throw 'button_elm is not a DOM element';
                if (typeof current !== 'object') throw 'current is not an object';
                if (typeof current.x !== 'number') throw 'current.x is not a number';
                if (typeof current.y !== 'number') throw 'current.y is not a number';
                if (typeof event_binder !== 'function') throw 'event_binder is not a function';

                Helpers.setPositionToButtonElement(button_elm, current.x, current.y);

                return event_binder('change', function (x, y) {
                    Helpers.setPositionToButtonElement(button_elm, x, y);
                });

            } catch(e) {
                return new Library.InternalError('Helpers.attachButton()', e);
            }
        }

    };


    /*********************************************************************/
    /* Constructor library */
    /*********************************************************************/
    var Library = {

        // Api error
        ApiError: function ApiErrorConstructor (context, msg) {
            console.error('Focuspoint error in ' + context + ':', msg);

            return {
                error: true,
                internal: false,
                context: context,
                message: msg
            };
        },

        // Internal error
        InternalError: function InternalErrorConstructor (context, msg) {
            console.error('Focuspoint internal error in ' + context + ':', msg);

            return {
                error: true,
                internal: true,
                context: context,
                message: msg
            };
        },

        // Current
        Current: function CurrentConstructor (x, y) {
            try {
                if (typeof x !== 'number') throw 'x is not a number.';
                if (typeof y !== 'number') throw 'y is not a number.';
                if (x < 0 || x > 1) throw 'x must be a number between 0 and 1.';
                if (y < 0 || y > 1) throw 'y must be a number between 0 and 1.';

                return {
                    x: x,
                    y: y
                };

            } catch(e) {
                return new Library.InternalError('Library.Current()', e);
            }
        },

        // Event system
        EventSystem: function EventSystemConstructor () {
            var self = this;

            self.possibleEvents = ['drag:start', 'drag:move', 'drag:end', 'change'];
            self.increment = 0;
            self.callbacks = [];

            self.applyEvent = function apply (event, args) {
                try {
                    if (self.possibleEvents.indexOf(event) === -1) throw 'Event "' + event + '" not found.';

                    args = args || [];
                    if (!Array.isArray(args)) throw 'Arguments is not an array.';

                    self.callbacks.forEach(function (o, index) {
                        if (o.event !== event) return;
                        if (typeof o.handler !== 'function') throw 'Callback is not a function.';

                        o.handler.apply(window, args);
                    });

                } catch(e) {
                    return new Library.InternalError('Library.EventSystem().applyEvent()', e);
                }
            };

            self.register = function register (event, handler) {
                try {
                    if (typeof event !== 'string') throw 'event is not a string';
                    if (self.possibleEvents.indexOf(event) === -1) throw 'event "' + event + '" does not exist';
                    if (typeof handler !== 'function') throw 'handler is not a function';

                    self.increment ++;

                    var id = self.increment;
                    var r = {
                        id: id,
                        event: event,
                        handler: handler
                    };

                    self.callbacks.push(r);

                    return id;

                } catch(e) {
                    return new Library.InternalError('Library.EventSystem().register()', e);
                }
            };

            self.unregister = function unregister (id) {
                try {
                    if (typeof id !== 'number') throw 'id should be a number.';

                    var match = null;
                    self.callbacks.forEach(function (o, index) {
                        if (match) return;
                        if (o.id !== id) return;
                        match = index;
                    });

                    if (match === null) throw 'Could not find listener for id: ' + id;

                    return !! self.callbacks.splice(match, 1);

                } catch(e) {
                    return new Library.InternalError('Library.EventSystem().unregister()', e);
                }
            };

            self.unregisterAll = function unregisterAll () {
                self.callbacks = [];
            };
        },

        // View options
        ViewOptions: function ViewOptionsConstructor (elm, options, error_handler) {
            try {
                options = options || {};

                // Validations
                if (!Helpers.isDOMElement(elm)) throw 'elm is not a DOM element.';
                if (typeof options !== 'object' || Array.isArray(options)) throw 'options exists, but is not an object.';
                if (typeof options.x !== 'number' && options.x) throw '"options.x" exists, but is not a number.';
                if (typeof options.y !== 'number' && options.y) throw '"options.y" exists, but is not a number.';
                if (typeof options.x === 'number' && (options.x < 0 || options.x > 1)) throw '"options.x" must be a number between 0 and 1.';
                if (typeof options.y === 'number' && (options.y < 0 || options.y > 1)) throw '"options.y" must be a number between 0 and 1.';

                // Defaults
                if (typeof options.x !== 'number') options.x = 0.5;
                if (typeof options.y !== 'number') options.y = 0.5;

                // Ouput
                return {
                    elm: elm,
                    x: options.x,
                    y: options.y
                };

            } catch(e) {
                error_handler(e);
            }
        },

        // View options
        EditOptions: function EditOptionsConstructor (element, options, error_handler) {
            try {
                options = options || {};

                // Validations
                if (!Helpers.isDOMElement(element)) throw 'element is not a DOM element.';
                if (typeof options !== 'object' || Array.isArray(options)) throw 'options exists, but is not an object.';
                if (typeof options.x !== 'undefined' && typeof options.x !== 'number') throw 'options.x exists, but is not a number.';
                if (typeof options.y !== 'undefined' && typeof options.y !== 'number') throw 'options.y exists, but is not a number.';
                if (typeof options.x === 'number' && (options.x < 0 || options.x > 1)) throw 'options.x must be a number between 0 and 1.';
                if (typeof options.y === 'number' && (options.y < 0 || options.y > 1)) throw 'options.y must be a number between 0 and 1.';
                if (typeof options.view_elm !== 'undefined' && (Array.isArray(options.view_elm) && !Helpers.areDOMElements(options.view_elm))) throw 'options.view_elm is an array, but not all items are elements.';
                if (typeof options.view_elm !== 'undefined' && (typeof options.view_elm !== 'object' || !Helpers.isDOMElement(options.view_elm))) throw 'options.view_elm is given, but is not a DOM element.';
                if (typeof options.button_elm !== 'undefined' && !Helpers.isDOMElement(options.button_elm)) throw 'options.button_elm is given, but is not a DOM element.';
                if (typeof options.hide_cursor !== 'undefined' && typeof options.hide_cursor !== 'boolean') throw 'options.hide_cursor exists, but is not a boolean.';
                if (typeof options.no_cursor_class !== 'undefined' && typeof options.no_cursor_class !== 'string') throw 'options.no_cursor_class exists, but is not a string.';

                // Defaults
                if (typeof options.x !== 'number') options.x = 0.5;
                if (typeof options.y !== 'number') options.y = 0.5;
                if (!options.button_elm) {
                    var btn = element.querySelector('.lfy-focuspoint-button');
                    if (!Helpers.isDOMElement(btn)) throw 'options.button_elm is not given, and could not find a button with class "lfy-focuspoint-button" as fallback';

                    options.button_elm = btn;
                }
                if (typeof options.hide_cursor !== 'boolean') options.hide_cursor = true;
                if (typeof options.no_cursor_class !== 'string') options.no_cursor_class = 'lfy-focuspoint-edit-hidecursor';

                // Ouput
                return {
                    elm: element,
                    view_elm: options.view_elm,
                    button_elm: options.button_elm,
                    hide_cursor: options.hide_cursor,
                    no_cursor_class: options.no_cursor_class,
                    x: options.x,
                    y: options.y
                };

            } catch(e) {
                error_handler(e);
            }
        }

    };


    /**
     * Focuspoint API
     *
     * @namespace Focuspoint
     */
    global.Focuspoint = {

        /**
         * View constructor
         *
         * @constructor Focuspoint.View
         * @memberof Focuspoint
         * @argument {Element} element - The View component element
         * @argument {Object} options - The options for the View component
         * @argument {Number} options.x - X coordinate to start with (number between 0 and 1)
         * @argument {Number} options.y - Y coordinate to start with (number between 0 and 1)
         *
         * @example
         * var view_element = document.querySelector('.lfy-focuspoint-view');
         * var focuspoint = new Focuspoint.View(view_element, {
         *     x: 0.752,
         *     y: 0.251
         * });
         */
        View: function View (element, options) {

            var _opts = new Library.ViewOptions(element, options, function (err) {
                new Library.ApiError('Focuspoint.View()', err);
            });
            var _c = new Library.Current(_opts.x, _opts.y);
            var _d = Helpers.setBackgroundPositionToElm(_opts.elm, _c.x, _c.y);
            var _killed = false;

            var Api = this;

            /**
             * @memberof Focuspoint.View
             * @name current
             * @type Object
             * @readonly
             *
             * @description
             * Holds the current x and y values
             *
             * @example
             * var x = focuspoint.current.x;
             */
            Api.current = _c;

            /**
             * @memberof Focuspoint.View
             * @name set
             * @type Function
             *
             * @description
             * Changes the x and y. This will:
             *  - Change the binded background-position
             *  - Update the coordinates in focuspoint.current
             *
             * @example
             * focuspoint.set(0.345, 0.577);
             *
             */
            Api.set = function (x, y) {
                try {
                    if (_killed) throw 'this Focuspoint.View has been killed';
                    if (typeof x !== 'number') throw 'the given x coordinate is not a number';
                    if (typeof y !== 'number') throw 'the given y coordinate is not a number';
                    if (x < 0 || x > 1) throw 'the x coordinate must be a number between 0 and 1';
                    if (y < 0 || y > 1) throw 'the y coordinate must be a number between 0 and 1';

                    var output = Helpers.setBackgroundPositionToElm(_opts.elm, x, y);
                    if (!output.error) {
                        Api.current.x = x;
                        Api.current.y = y;
                    }

                } catch(e) {
                    return new Library.ApiError('Focuspoint.View().set()', e);
                }
            };

            /**
             * @memberof Focuspoint.View
             * @name kill
             * @type Function
             *
             * @description
             * Kills the View instance, unbinds event handlers when present
             *
             * @example
             * focuspoint.kill();
             * delete focuspoint; // To fully kill the object, use 'delete focuspoint;' afterwards
             *
             */
            Api.kill = function () {
                try {
                    if (_killed) throw 'this Focuspoint.View has already been killed';

                    _killed = true;
                    delete Api.current;

                } catch(e) {
                    return new Library.ApiError('Focuspoint.View().kill()', e);
                }
            };

        },

        /**
         * Edit constructor
         *
         * @constructor Focuspoint.Edit
         * @memberof Focuspoint
         *
         * @argument {Element} element - The Edit component element
         * @argument {Object} options - The options for the Edit component
         * @argument {Number} [options.x] - X-coordinate to start with (number between 0 and 1)
         * @argument {Number} [options.y] - Y-coordinate to start with (number between 0 and 1)
         * @argument {Element/Array} [options.view_elm] - The view element(s) to bind to the Edit component
         * @argument {Element} [options.button_elm] - The button element when not using the class "lfy-focuspoint-button" or when the button is not inside the Edit component element
         * @argument {Boolean} [options.hide_cursor] - Whether the cursor should be hidden while moving the button
         * @argument {String} [options.no_cursor_class] - The class used to disable the cursor
         *
         * @example
         * var edit_element = document.querySelector('.lfy-focuspoint-edit');
         * var view_element = document.querySelector('.lfy-focuspoint-view');
         *
         * var focuspoint = new Focuspoint.Edit(edit_element, {
         *     view_elm: view_element
         * });
         *
         */
        Edit: function Edit (element, options) {

            var _opts = new Library.EditOptions(element, options, function (err) {
                new Library.ApiError('Focuspoint.Edit()', err);
            });
            var _e = new Library.EventSystem();
            var _c = new Library.Current(_opts.x, _opts.y);
            var _d = Helpers.initializeDrag(_opts.elm, _opts.button_elm, _c, _e, _opts.hide_cursor, _opts.no_cursor_class);
            if(_opts.view_elm) var _v = Helpers.attachViews(_opts.view_elm, _c, _e.register);
            var _b = Helpers.attachButton(_opts.button_elm, _c, _e.register);
            var _killed = false;

            var Api = this;

            /**
             * @memberof Focuspoint.Edit
             * @name current
             * @type Object
             * @readonly
             *
             * @description
             * Holds the current x and y values
             *
             * @example
             * var x = focuspoint.current.x;
             */
            Api.current = _c;

            /**
             * @memberof Focuspoint.Edit
             * @name set
             * @type Function
             *
             * @description
             * Changes the x and y. This will:
             *  - Change the button position
             *  - Change the possibly binded background-positions
             *  - Update the coordinates in focuspoint.current
             *  - Trigger the 'change' event
             *
             * @example
             * focuspoint.set(0.345, 0.577);
             *
             */
            Api.set = function (x, y) {
                try {
                    if (_killed) throw 'this Focuspoint.Edit has been killed';
                    if (typeof x !== 'number') throw 'the given x coordinate is not a number';
                    if (typeof y !== 'number') throw 'the given y coordinate is not a number';
                    if (x < 0 || x > 1) throw 'the x coordinate must be a number between 0 and 1';
                    if (y < 0 || y > 1) throw 'the y coordinate must be a number between 0 and 1';

                    var output = Helpers.setPositionToButtonElement(_opts.button_elm, x, y);
                    if (!output.error) {
                        Api.current.x = x;
                        Api.current.y = y;
                    }
                    _e.applyEvent('change', [Api.current.x, Api.current.y]);

                } catch (e) {
                    return new Library.ApiError('Focuspoint.Edit().set()', e);
                }
            };

            /**
             * @memberof Focuspoint.Edit
             * @name on
             * @type Function
             *
             * @param {String} event - Can be 'change', 'drag:start', 'drag:move' and 'drag:end'
             * @param {Function} handler - The passed arguments of the handler will always be [x, y].
             * @returns {Number} id - The event handler identification you'll need to unbind the handler
             *
             * @description
             * Binds a handler to an event
             *
             * @example
             * var id = focuspoint.on('drag:end', function () {
             *     // for example: some API call to save the new focuspoint
             * });
             *
             */
            Api.on = function (event, handler) {
                try {
                    if (_killed) throw 'this Focuspoint.Edit has been killed';
                    if (typeof event !== 'string') throw 'event is not a string';
                    if (typeof handler !== 'function') throw 'handler is not a function';
                    if (_e.possibleEvents.indexOf(event) === -1) throw 'event "' + event + '" does not exist';

                    _e.register(event, handler);

                } catch(e) {
                    return new Library.ApiError('Focuspoint.Edit().on()', e);
                }
            };

            /**
             * @memberof Focuspoint.Edit
             * @name off
             * @type Function
             *
             * @param {Number} id - The event handler identification of the handler you want to unbind
             *
             * @description
             * Unbinds a handler from an event
             *
             * @example
             * focuspoint.off(id);
             *
             */
            Api.off = function (id) {
                try {
                    if (_killed) throw 'this Focuspoint.Edit has been killed';
                    if (typeof id !== 'number') throw 'id is not a number';

                    _e.unregister(id);

                } catch(e) {
                    return new Library.ApiError('Focuspoint.Edit().off()', e);
                }
            };

            /**
             * @memberof Focuspoint.Edit
             * @name kill
             * @type Function
             *
             * @description
             * Kills the Edit instance, unbinds event handlers
             *
             * @example
             * focuspoint.kill();
             * delete focuspoint; // To fully kill the object, use 'delete focuspoint;' afterwards
             *
             */
            Api.kill = function () {
                try {
                    if (_killed) throw 'this Focuspoint.Edit has already been killed';

                    _e.unregisterAll();
                    _d();
                    _killed = true;
                    delete Api.current;

                } catch(e) {
                    return new Library.ApiError('Focuspoint.Edit().kill()', e);
                }
            };

        },

    };

})(window);
