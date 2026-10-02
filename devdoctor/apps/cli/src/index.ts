#!/usr/bin/env node
import { createCli } from "./cli.js";

void createCli().parseAsync(process.argv);
