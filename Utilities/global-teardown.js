import { exec, spawn } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function globalTeardown() {
  await execAsync('allure generate allure-results --clean -o allure-report');
  console.log('Allure report successfully generated.');

  const command = process.platform === 'win32' ? 'cmd.exe' : 'allure';
  const args = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'allure open allure-report']
    : ['open', 'allure-report'];
  const reportProcess = spawn(command, args, {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  await new Promise((resolve, reject) => {
    reportProcess.once('error', reject);
    reportProcess.once('spawn', resolve);
  });

  reportProcess.unref();
  console.log('Allure report opened.');
}
