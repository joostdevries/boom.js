boom.js
=======

BOOM is a little piece of JS which makes creating HTML trees
from JS a little easier. It also comes with some jQuery-like syntax
for which I am eternaly grateful to the great Resig.

To create a BOOM, use boom:

```javascript
var myDiv = boom(['div', {cls:'my-div'}, {
    header: ['h2', {}, 'Some header in my-div'],
    form: ['form', {id: 'a-form-to-show-more-nesting'}, {
        textfield: ['input', {type:'text', name:'mytextfield', id:'mytextfield'}],
        submit ['input', {type:'submit', name:'mybutton', id:'mybutton', value:'My value'}],
    }]
}])
```

After creating you BOOM, you can simply access all of its elements by name,
for example:

```javascript
myDiv.header.html('I've changed the <b>header</b>');
var val = myDiv.form.textfield.val();
myDiv.form.listen('submit', function(evt) { });
```