# Cmx-components

Clone package to your home directory

Run `npm install`

# Adding a core component

Suppose we are working on `myferitlome.com` and would like to add a Tooltip
component, which could also be used on `celmatix.com` or future projects. To
work on this component with live reload enabled you will need to do the
following.

1. Run `npm link` in `cmx-components` directory
2. Run `npm link cmx-components` from directory of `myfertilome.com` repo
3. Run `npm start` in cmx-components to have webpack watch all files in `src`
   directory

When finished run the following

1. `Ctrl + c` in `cmx-components`
2. Run `npm unlink` in `cmx-components`
3. Run `npm unlink cmx-components` in `myfertilome.com`

## What is npm link

When you run `npm install` in the `myfertilome.com` directory, npm looks at
`dependencies` in `package.json` file to identify all the packages it will need
to download into its `node_modules` directory.

Since npm supports pointing packages to relative files we point `cmx-components`
relatively using "file://./../cmx-components"`.

When npm installs the cmx-components package it looks at the `cmx-components` as
if it were any other npm package and copies it to `myfertilome.com/node_modules`
folder.

Using `npm link` we override downloading to node_modules folder and instead have
it symlink to `cmx-components` directory.
