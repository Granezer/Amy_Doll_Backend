// const { exec } = require('child_process');

// const runBuild = () => {
//   const buildProcess = exec('npm run build');

//   buildProcess.stdout.on('data', (data) => {
//     console.log(`[BUILD]: ${data}`);
//   });

//   buildProcess.stderr.on('data', (data) => {
//     console.error(`[BUILD ERROR]: ${data}`);
//   });

//   buildProcess.on('error', (error) => {
//     console.error(`[BUILD ERROR]: ${error.message}`);
//   });

//   buildProcess.on('close', (code) => {
//     if (code === 0) {
//       console.log('Build process completed successfully.');
//     } else {
//       console.error(`Build process exited with code ${code}.`);
//     }
//   });
// };

// runBuild();

const { exec } = require('child_process');
const zlib = require('zlib');
const fs = require('fs');

const runBuild = () => {
  const buildProcess = exec('npm run build');

  buildProcess.stdout.on('data', (data) => {
    console.log(`[BUILD]: ${data}`);
  });

  buildProcess.stderr.on('data', (data) => {
    console.error(`[BUILD ERROR]: ${data}`);
  });

  buildProcess.on('error', (error) => {
    console.error(`[BUILD ERROR]: ${error.message}`);
  });

  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Build process completed successfully.');

      // Compress the build files
      compressBuild();
    } else {
      console.error(`Build process exited with code ${code}.`);
    }
  });
};

const compressBuild = () => {
  // Read the build folder contents
  const buildPath = './build';
  fs.readdir(buildPath, (err, files) => {
    if (err) {
      console.error('[COMPRESSION ERROR]: Failed to read build folder.', err);
      return;
    }

    // Compress each file using gzip or Brotli
    files.forEach((file) => {
      const filePath = `${buildPath}/${file}`;
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(`${filePath}.gz`);
      const gzip = zlib.createGzip();

      readStream.pipe(gzip).pipe(writeStream);
    });

    console.log('Build files compressed successfully.');
  });
};

runBuild();
