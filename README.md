# grunt-bowerrc

> Run Bower by .bowerrc files

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bowerrc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bowerrc');
```

## The "bowerrc" task

### Overview
In your project's Gruntfile, add a section named `bowerrc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bowerrc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.command
Type: `String`
Default value: `',  '`

The bower command to be run. Alternatively you can provide the command as cli option, for example `grunt bowerrc --update`.


#### Default Options
Provide paths to .bowerrc-files

```js
grunt.initConfig({
  bowerrc: {
    default_options: {
      options: {
        command: 'install'
      },
      cwd: 'app',
      src: ['**/.bowerrc']
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
