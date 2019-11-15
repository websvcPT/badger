# Badger

Project badges made easy

ShieldsIo make it very simple to add badges to your project docs, but it requires for you to pass arguments to generate
the badge.

For instance if you want to create a badge with latest version number and share it, you are unable to.

Badger tries to solve this issue.

Badge use in markdown files:

```
![http://0.0.0.0:3000/badges/my-test](http://0.0.0.0:3000/badges/my-test)

<img src="http://0.0.0.0:3000/badges/my-test"/>
```

## API reference

**GET**     /badges

- : Get list of existing badges
- Arguments: none
- Response code: 200
- Returns: List of badges

- Response code: 200

```json
{
    "Message": "ok",
    "badges": [
        "example",
        "my-test",
        "my-testx"
    ]
}
```

Example request:

```bash
curl -X GET http://0.0.0.0:3000/badges
```

**GET**     /badges/<badgeName>

- : Get a specific badge
- Arguments: <badgeName>
- Response code: 200
- Returns: Badge SVG

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
    // TODO: "link" : <link>             // URL to follow when clicking badge. Def: null
}
```

- Response code: 200

```json
{
    "Message": "ok",
    "badgeName": <badgeName>
}
```

- Response code: 400

```json
{
    "Message": "missing required data"
}
```

- Response code: 500

```json
{
    "Message": "internal error"
}
```

Example request:

```bash
curl -X POST \
  http://0.0.0.0:3000/badges/set \
  -H 'Authorization: APIKEY test' \
  -H 'Content-Type: application/json' \
  -d '{
    "badgeName" : "my-test",
    "label" : "version",
    "message" : "1.0.0",
    "style" : "plastic",
    "labelColor" : "blue",
    "color" : "lightgrey"
}'
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

## Development

### Using local machine

```bash
# Install dependencies
npm i
# Start server
npm run dev
# Run tests
npm run test
# Run Eslint
npm run eslint
# Make build
npm run build
# Serve build
npm run serve
```

### Using Docker-Compose

```bash
# Start environment
docker-compose up
```
