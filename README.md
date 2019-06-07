# amplify-next

amplify-next helps bootstrap an AWS AppSync + Next app

## Initial Setup (Because the npm module is not published yet)

```
npm i
npm link
```

## Creating a new Project

Create your project folder anywhere and do `npm init`.

Then, cd into the folder and do `amplify-next init`

Once, its done - add a script to the `package.json` as below:

```
"dev": "next"
"start": "next start"
"build": "next build"
```

## Creating a new Project

Update the api key and endpoint in `lib/config.js`
