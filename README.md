# Badger

![http://0.0.0.0:3000/badges/my-test](http://0.0.0.0:3000/badges/my-test)

Project badges made easy

ShieldsIo make it very simple to add badges to your project docs, but it requires for you to pass arguments to generate
the badge.

For instance if you want to create a badge with latest version number and share it, you are unable to.

Badger tries to solve this issue.

## API reference

**GET**     /badges

- Arguments: none
- Response code: 200
- Returns: List of badges

**GET**     /badges/<badgeName>

- Arguments: <badgeName>
- Response code: 200
- Returns: Badge

**POST**    /badges/set

- : Creates or updates a badge
- Authentication: Api Token
- Arguments: none
- JSON BodyLoad:

```json
{
    "badgeName" : <badgeName>,  // Badge internal name. *Required
    "label" : <label>,          // Badge label text. Def: null
    "message" : <message>,      // Badge message text. Def: null
    "style" : <style>,          // Badge style. Def: plastic
    "labelColor" : <labelColor>,// Badge label color (on the left). Def: blue
    "color" : <color>,          // Badge color (on the right). Def: lightgrey
    "link" : <link>             // URL to follow when clicking bade. Def: null
}
```
- Response code: 200
- Returns: Badge definition

```json
{
    "badgeName" : <badgeName>,
    "label" : <label>,
    "message" : <message>,
    "style" : <style>,
    "labelColor" : <labelColor>,
    "color" : <color>,
    "link" : <link>
}
```

## Badge specs

### Colors

Badge/Label colors:

brightgreen -> #4c1
green -> #97ca00
yellow -> #dfb317
yellowgreen -> #a4a61d
orange -> #fe7d37
red -> #e05d44
blue -> #007ec6
grey -> #555
lightgrey -> #9f9f9f

see: [https://github.com/badges/shields/blob/master/gh-badges/README.md#colors](https://github.com/badges/shields/blob/master/gh-badges/README.md#colors)

### Styles

- flat
- flat-square
- for-the-badge
- plastic
- social

see: [https://github.com/badges/shields/tree/master/gh-badges/templates](https://github.com/badges/shields/tree/master/gh-badges/templates)


## DEV

```bash
npm run dev
npm run test
```
