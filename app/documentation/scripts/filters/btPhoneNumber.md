# btPhoneNumber

## Filter

The `phoneNumberfilter` filter will format or unformat a phone number.

> btPhoneNUmber has no opinions about the phone number you are trying to
format. You will need to do any phone number validation.

#### Exmaple Usage
```html
<script>
  $scope.string1 = '1234567890';
  $scope.string2 = '123-456-7890';
</script>

<div>
  {{string1|phoneNumber:'add'}} // (123) 456-7890
  {{string2|phoneNumber:'remove'}} // 1234567890
</div>
```
