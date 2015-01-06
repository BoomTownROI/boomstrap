# btAddClassOnLoad

## Directive (Attribute)

#### Parameters

Parameter | Type | Required
--------- | ---- | :------:
bt-add-class-on-load | string | **yes**

  The `btAddClassOnLoad` directive adds a class to an img tag when the image fires the load event.  This is useful for css transitions.

> This directive is useful for CSS Transitions

#### Example Usage
```html
<style type="text/css">
.my-img {
  opacity: 0;
  transition: opacity 5.0s linear;
}
.loaded {
  opacity: 1;
}
</style>
<img src="images/fpo-he-man.jpg" bt-add-class-on-load="loaded" class="my-img"/>
```
