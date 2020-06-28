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
          <pre class="main-content">${text}</pre>
        </body>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script>
          const selector = document.querySelector(".lang-change");
          selector.addEventListener("change", (e) => {
            console.log(e.target.value);
            $.ajax({
              type: "GET",
              url: "https://www.naver.com",
              success: function log(response) {
                console.log("this shit is working", response);
              },
              error: function log(error) {
                console.log("this shit is not working WHAT THE FUCK", error);
              }
            });
          });
        </script>
    </html>
    `;
};

module.exports = {
  seed,
  getWebViewContent,
};
