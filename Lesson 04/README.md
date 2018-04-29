# Lesson 04 homework

## Tabbed component

* Created a tabbed component with content fade effect on switching tabs and disable switching during this process. Tab's content is loaded with AJAX from the *scripts* folder **json** file.

## Form validation

* Changed email validation regexp pattern for more universal form.
* Added a **City** field, linked with an empty data list. This data list is filled with Russian city names, matching the entered pattern (**3+ chars**), fetched from VK API by **jsonp** cross-domain method. If the user enters less than 3 chars in the city field, this data list is cleared.
