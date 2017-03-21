import chalk from 'chalk';
import moment from 'moment';
import bundle from './tasks/bundle';
import serve from './tasks/serve';

const tasks = {
  bundle,
  serve
}

function run(task, options) {
  const start = moment();
  console.log(`Starting task '${task.name}'…`);
  return task(options).then(() => {
    console.log(`Finished task '${task.name}' in ${moment().diff(start)}ms `);
  });
}

if (process.argv.length > 2) {
  delete require.cache[__filename];
  const moduleName = process.argv[2];
  run(tasks[moduleName])
    .then(result => true)
    .catch(error => console.error(chalk.red(`An error occured while running ${task.name}`), error.stack));
}

export default run;
