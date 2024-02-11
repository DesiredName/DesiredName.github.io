---
title: 'CSS Logical Properties'
description: 'Overview of CSS writing-mode property and how to use it on a page'
tags: ['html', 'css', 'textdirection', 'langauage', 'i18n']
year: 2024
month: 11
day: 5
order: 3
---

I stumbled upon a great article by [Adrian Roselli](https://www.linkedin.com/in/adrianroselli/) about CSS logical properties.

If you want to read a full article, please, follow the [link](https://adrianroselli.com/2019/11/css-logical-properties.html).

In general, CSS logical properties allow us to set property values, that [are direction dependent](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) (say in Arabic languages). We can define how we want to layout content using [dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#dir) attribute or setting [writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) CSS property on the root element or the element we target.

For example, instead of writing the following CSS to add the margin on the left of an element

`.some-class {
    margin-right: 20px;
}`

one should use this code:

`.some-class {
    margin-inline-end: 20px;
}`

This way we secure text layout in case this text is rendered for RTL or TB languages.

![example_001](/img/html/css-logical-properties/Example_001.png)
