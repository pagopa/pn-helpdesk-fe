import fs from 'fs/promises';

const nodeModulesPath = 'node_modules';

const checkIfExist = async () => {
  try {
    await fs.access(nodeModulesPath);
    return true;
  } catch {
    return false;
  }
};

const cleanup = async () => {
  if (await checkIfExist()) {
    console.log('Removing node_modules...');
    try {
      await fs.rm(nodeModulesPath, { recursive: true });
      console.log('node_modules removed successfully');
    } catch (err) {
      console.error('Error while removing node_modules', err);
    }
  } else {
    console.log('No node_modules found');
  }
};

cleanup();
