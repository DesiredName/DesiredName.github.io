---
title: 'CSS Logical Properties'
description: 'Overview of CSS writing-mode property and how to use it on a page'
tags: ['html', 'css', 'textdirection', 'langauage', 'i18n']
year: 2024
month: 11
day: 5
order: 3
---

::the-article{:year='year' :month='month' :day='day'}

#header
CSS Logical Properties

#content
:::the-article-paragraph
I stumbled upon a great article by :the-article-link{:title='Adrian Roselli' :href='https://www.linkedin.com/in/adrianroselli' class='outstand'} about CSS logical properties.
:::

:::the-article-paragraph
If you want to read a full article, please, follow the :the-article-link{:title='link' :href='https://adrianroselli.com/2019/11/css-logical-properties.html'}.
:::

:::the-article-paragraph
In general, CSS logical properties allow us to set property values, that :the-article-link{:title='are direction dependent' :href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values'} (say in Arabic languages). We can define how we want to layout content using :the-article-link{:title='dir' :href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#dir'} attribute or setting :the-article-link{:title='writing-mode' :href='https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode'} CSS property on the root element or the element we target.
:::

:::the-article-paragraph
For example, instead of writing the following CSS to add the margin on the left of an element

::::the-article-code

```css
.some-class {
    margin-right: 20px;
}
```

::::

one should use this code:

```js
var a = 10;
```

```css
.some-class {
    margin-inline-end: 20px;
}
```

:::

:::the-article-paragraph
This way we secure text layout in case this text is rendered for RTL or TB languages.
:::

![example_001](/img/html/css-logical-properties/Example_001.png)

::

```

```
