# btCurrency

## Filter

The `btCurrency` filter will format curreny in the same fashion as the
built in Angular curreny filter, with one difference; if the currency is
whole, that is $2.00, this filter leaves the 00.

> btCurrency respects the same l18n and l10n settings as Angular.

#### Example Usage
```html
<span>{{200.00|btCurrency}}</span> // $200.00
```
