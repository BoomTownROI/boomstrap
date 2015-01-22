# btFormatDateToLocal

## Filter

The `btFormatDateToLocal` filter will convert any date stored ass UTC to
local time, based on local machine settings. This filter accepts any
formatting options that Angular's `date` filter accepts.

> This filter assumes the stored date is already in UTC

#### Example Usage
```html
<span>{{dateObject|btFormatDateToLocal:'MM/DD/yyyy'}}</span>
```
