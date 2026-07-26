import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import Sonda from 'sonda/angular';

// ponytail: sonda only understands angular.json architect shape; map Nx project.json → temp shim
const project = JSON.parse(readFileSync('project.json', 'utf8'));
const outputPath = project.targets?.build?.options?.outputPath;
if (!outputPath)
	throw new Error('project.json missing targets.build.options.outputPath');

const configPath = join(mkdtempSync(join(tmpdir(), 'sonda-')), 'angular.json');
writeFileSync(
	configPath,
	JSON.stringify({
		projects: {
			[project.name]: {
				architect: { build: { options: { outputPath } } }
			}
		}
	})
);

await Sonda({ config: configPath, projects: [project.name] });
