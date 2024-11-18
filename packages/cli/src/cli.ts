#!/usr/bin/env node

import { program } from "commander";
import { setupCommand as setupCreateTemplateCommand } from "./create-template/cli";
import { setupCommand as setupGenerateClientsCommand } from "./generate-clients/cli";

function addCommands() {
	setupCreateTemplateCommand();
	setupGenerateClientsCommand();
}

addCommands();
program.parse();
