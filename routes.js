
const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    
    if(url === "/") {
        res.setHeader("Content-type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">TEST</button></input></form>');
        res.write("<body>");
        res.write("</html>")
        return res.end();
    }

    if(url === "/message" && method === "POST") {

        const body = [];

        req.on("data", chunk => body.push(chunk));
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            console.log(message);
            fs.writeFile("message.txt", message, err => {
                res.statusCode = 302;
                res.setHeader("Location", "/"); 
                res.end();
            });
        });
    }

    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<body><h1>OUTSIDE ANY IF</h1><body>");
    res.write("</html>")
    res.end();
};

////////////////////////////

// module.exports = {
//     handler: requestHandler,
//     someText: "some hardcoded text"
// };

// OR 

// module.exports.handler = requestHandler;
// module.exports.text = "some hardcoded text";

// OR

exports.handler = requestHandler;
exports.text    = "some hardcoded text";

