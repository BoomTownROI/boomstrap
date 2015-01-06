# btAffix
## Directive (Attribute)

### Requirements ($window)


#### Parameters

Parameter | Type | Required | Description
--------- | ---- | :------: | :----------
offset | number | **no** | Number of pixels to add to scroll before element is affixed
scroll | bool | **no** | Indicates if the affixed element is allowed to scroll
fullHeight | bool | **no** | Indicates that the affixed element spans the entire height of the page
pinnedHeader | bool | **no** | Indicates that the affixed element spans the entire width of the page and is affixed to the top left

The `btAffix` element allows a user to affix an element at a given scroll point. Another element with the same height and width will take the place of the element to ensure that the page layout does not break upon affixing.

#### Example Usage
```html
<div bt-affix offset="500">
  <img src="images/fpo-he-man.jpg"/>
</div>
<img src="images/fpo-he-man.jpg"/>
<img src="images/fpo-he-man.jpg"/>
<img src="images/fpo-he-man.jpg"/>
<img src="images/fpo-he-man.jpg"/>
```
