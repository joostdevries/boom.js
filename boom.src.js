/**
 * BOOM.js v0.0.1
 * http://github.com/joostdevries/boom.js
 *
 * Copyright 2013 Joost de Vries / CloseAlert
 * Released under the MIT license
 *
 * BOOM is a little piece of JS which makes creating HTML trees
 * from JS a little easier. It also comes with some jQuery-like syntax
 * for which I am eternaly grateful to the great Resig.
 *
 * To create a BOOM, use boom:
 *
 * var myDiv = boom(['div', {cls:'my-div'}, {
 *     header: ['h2', {}, 'Some header in my-div'],
 *     form: ['form', {id: 'a-form-to-show-more-nesting'}, {
 *         textfield: ['input', {type:'text', name:'mytextfield', id:'mytextfield'}],
 *         submit ['input', {type:'submit', name:'mybutton', id:'mybutton', value:'My value'}],
 *     }]
 * }])
 *
 * After creating you BOOM, you can simply access all of its elements by name,
 * for example:
 *
 *    myDiv.header.html('I've changed the <b>header</b>');
 *    var val = myDiv.form.textfield.val();
 *    myDiv.form.listen('submit', function(evt) { });
 */
(function(s) {
    /**
     * Create a BOOM
     * @param string tag name
     * @param attrbutes for the element
     * @param mixed children (either an object or a string)
     * @return BOOM
     */
    function createBOOM(tagName, attributes, children) {
        return new BOOM(tagName, attributes, children);
    }

    /**
     * The sir.
     */
    function BOOM(tagName, attributes, children) {
        /**
         * @var The DOM element we're actually dealing with
         */
        if(tagName)
            this.el = document.createElement(tagName);

        // Set all the HTML attrbiutes
        // We've made a shorthandname for className: cls
        if(attributes) {
            for(var attName in attributes) {
                var _att = attName;
                if(attName=='cls') _att='className';
                this.el[_att] = attributes[attName];
            }
        }

        // Set the kiddies
        if(children && typeof children=='object')
            this.addChildren(children);
        else if(children)
            this.html(children);
    }

    /**
     * Accepts an object with name: arguments pairs to create children
     * @param object Children
     */
    BOOM.prototype.addChildren = function(children) {
        for(var childName in children) {
            this[childName] = createBOOM.apply(this,children[childName]);
            this[childName].appendTo(this.el);
        }
    };

    /**
     * Append this element to another element
     * @param HTMLElementObject
     */
    BOOM.prototype.appendTo = function(parent) {
        parent.appendChild(this.el);
    };

    /**
     * Get or set this elements HTML
     * @param string html if we've got to set it
     * @return string if no argument was supplied
     */
    BOOM.prototype.html = function(html) {
        if(html)
            this.el.innerHTML = html;
        else
            return this.el.innerHTML;
    };

    /**
     * Get or set this elements Text
     * @param string text if we've got to set it
     * @return string if no argument was supplied
     */
    BOOM.prototype.text = function(text) {
        if(html)
            this.el.innerText = text;
        else
            return this.el.innerText;
    };

    /**
     * Show this element
     */
    BOOM.prototype.show = function() {
        this.el.style.display='block';
    };

    /**
     * Hide this element
     */
    BOOM.prototype.hide = function() {
        this.el.style.display='';
    };

    /**
     * Set focus to this element
     */
    BOOM.prototype.focus = function() {
        this.el.focus();
    };

    /**
     * Get/set this elements value
     * @param mixed value if we've got to set it
     * @return mixed if no argument was supplied
     */
    BOOM.prototype.val = function(val) {
        if(val)
            this.el.value = val;
        else
            return this.el.value;
    };

    /**
     * Add a class to this element
     * @param string class name to add
     */
    BOOM.prototype.addClass = function(className) {
        this.el.className = this.el.className.indexOf(className)==-1 ? this.el.className+' '+className+'' : this.el.className;
    };

    /**
     * Remove a class to this element
     * @param string class name to remove
     */
    BOOM.prototype.removeClass = function(className) {
        this.el.className = this.el.className.replace(className, '').replace('  ', ' ');
    };

    /**
     * Checks whether or not this element has the given class name
     * @param string class name to remove
     */
    BOOM.prototype.hasClass = function(className,partial) {
        var pad=partial?'':' ';
        return (pad+this.el.className+pad).indexOf(pad+className+pad)!==-1;
    };

    /**
     * Add a listener to this object
     * @param string event name
     * @param function function to execute
     */
    BOOM.prototype.listen = function(evtName, fn) {
        var atfn = (window.attachEvent) ? 'attachEvent' : 'addEventListener',
            atargs = (window.attachEvent) ? ['on'+evtName, fn] : [evtName, fn, false];

        this.el[atfn].apply(this.el, atargs);
    };

    /**
     * Get/set a CSS attribute
     * @param string css attribute name
     * @param mixed attribute value
     */
    BOOM.prototype.css = function(att, val) {
        if(val)
            this.el.style[att] = val;
        else
            return this.el.style[att];
    };

    /**
     * Create a BOOM either from an array (the right way) or for one
     * HTMLElementObject because you want to use some helpers.
     * @param mixed Either an array or an HTMLElementObject
     * @return BOOM
     */
    s.boom = function(arg) {
        if(arg.length) {
            return createBOOM.apply(this, arg);
        }
        else {
            var b = new BOOM();
            b.el = arg;
            return b;
        }
    };
})(window);