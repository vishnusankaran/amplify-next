import arg from "arg";
import { exec, echo, config } from "shelljs";

config.reset();
config.verbose = true;

const passArgumentsIntoOptions = function(rawArgs) {
  const args = arg(
    {},
    {
      argv: rawArgs.slice(2)
    }
  );

  return { command: args._[0] };
};

exports.cli = function(args) {
  let options = passArgumentsIntoOptions(args);
  console.log(options);

  if (options.command === "init") {
    exec(
      "npm i next react react-dom graphql react-apollo apollo-boost@0.1.16 isomorphic-unfetch --save"
    );
    exec(`cp -r $(npm root -g)/amplify-next/lib ${process.cwd()}`);
    exec(`cp -r $(npm root -g)/amplify-next/pages ${process.cwd()}`);
    exec(`cp -r $(npm root -g)/amplify-next/components ${process.cwd()}`);
  } else {
    echo(`Try running -
    
    amplify-next init
    
    `);
  }
};
