const { spawn } = require('child_process');

const seed = async (text) => {
  //   const process = spawn('python', ['./switch_to_pseudo.py', text]);
  // const process = spawn('python', [__dirname + '/hello.py']);
  // var returnData = 'WHAT THE FUCK';
  // process.stdout.on('data', (data) => {
  //   return data.toString();
  // });
  // process.stderr.on('data', (err) => {
  //   returnData = 'No pseudocode conversion available!';
  // });

  // return returnData;
  const returnData = await pyProc(text);
  console.log('returnData', returnData);
  return pyProc(text);
};

const pyProc = (text) => {
  const process = spawn('python', [__dirname + '/hello.py']);
  process.stdout.on('data', (data) => {
    console.log('this is the ', data.toString());
    return data.toString();
  });
  process.stderr.on('data', (err) => {
    return 'No pseudocode conversion available!';
  });
};

const getWebViewContent = (text) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pseudo Code</title>
        </head>
        <body>
          <select>
            <option value="english">jj</option>
            <option value="french">kj</option>
            <option value="spanish">lj</option>
            <option value="korean">sj</option>
          </select>
          <pre>${text}</pre>
        </body>

        <script>
          const selector = document.querySelector("select");
          selector.addEventListener("change", (e) => {
            console.log(e.target.value);
          });
        </script>
    </html>
    `;
};

module.exports = {
  seed,
  getWebViewContent,
};
