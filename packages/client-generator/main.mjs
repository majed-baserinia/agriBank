#!/usr/bin/env node

import { program } from "commander";
import { generate } from "./src/generate.mjs";
import { schema } from "./src/cli.mjs";

await generate(schema.parse(program.parse().opts()));
