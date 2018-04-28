# Lesson 01
## Complex menu structure
* A menu (with a submenu) is created via object form.
* Added buttons for removing a menu item and a whole menu.

## Hamburger order form
* A simple form is created for customizing a hamburger order (size, stuffing, toppings) with radios and checkboxes. A total price and calorie calculation is performed with a **Calculate order** button.

# Lesson 02
## Picture gallery
* A simple picture gallery is designed with a full picture, a slider of small thumbnails with navigation arrows.
* A placeholder with an **«Image not available»** text is shown on error of loading the full-size image.
* Thumbnail info is loaded with a simple AJAX request from the local *scripts* folder.

## Internet shop menu
* A navigation menu is created with a **Create AJAX menu** button - a top section menu and a left-side catalog menu.

## AJAX request response
* A random successful/erroneous response is received and shown each time a user clicks a **Test request** button.

# Lesson 03
## Replace quotes in a text
* A textarea element with some quoted text is placed on the page. When a **Replace quotes** button is clicked, single quotes (around the words, excluding the ones inside these words) in this text are replaced with double quotes with the help of regexp pattern.

## Feedback form validation
* A simple feedback form is designed with some basic fields (*name*, *phone*, *email*, *message*) for a validation testing purposes. Each one has a hint text, showing the right input.
* A validation with regexp patterns is performed on these field when the user clicks the **Submit** button. Invalid fields borders are colored red and a validation result message is show below the form.

# Lesson 04
## Tabbed component
* Created a tabbed component with content fade effect on switching tabs and disable switching during this process. Tab's content is loaded with AJAX from the *scripts* folder **json** file.

## Advanced feedback form validation
* Changed email validation regexp pattern for more universal form.
* Added a **City** field, linked with an empty data list. This data list is filled with Russian city names, matching the entered pattern (**3+ chars**), fetched from VK API by **jsonp** cross-domain method. If the user enters less than 3 chars in the city field, this data list is cleared.

# Lesson 05
## Simple cart module
* Finalized the cart module with a method **remove**, which removes one item and recalculates total cart cost.

## User reviews module
* Designed a module, split in user and admin sections (left and right sides of the page respectively). A user can enter his name and a text to send it for approval, while the admin can approve (the review will be shown in the user section), disapprove (the review will not be shown in the user section) and delete (the review will be deleted from both sections) reviews. First set of reviews is loaded from **json** file.

# Lesson 06
## Advanced feedback form validation (with UI effects)
* Added a **Birthday** field to choose a date from a convenient UI calendar (with **yyyy/mm/dd** format). Required field with regexp validation.
## Addition to the simple cart module (drag & drop)
* Redesigned the cart module with a few goods and a shopping cart empty feature. Added a drag & drop feature for goods (to add to the cart) and the cart (to empty it).
