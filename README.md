# gnpm
Global Node Package Manager

## Install

Install gnpm with global flag.

    $ npm install gnpm -g

## Create account

Create an account with username, email and password.

    $ gnpm new

    prompt: username:
    prompt: email:
    prompt: password:

## Authenticate

Authenticate to add modules, to you're white list.

    $ gnpm login

    prompt: email:
    prompt: password:

## Add module

Add a module to white list. Only add global modules, not local modules. For Example: [grunt-cli](https://www.npmjs.com/package/grunt-cli).

> Add one module per command.
  Don't use:

    $ gnpm add strongloop, grunc-cli

> Correct commands:

    $ gnpm add strongloop
    $ gnpm add grunt-cli

## Install global modules

This command install all white list modules.

    $ gnpm install
