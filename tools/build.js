const fs=require("fs");const path=require("path"), root=path.join(__dirname,".."), src=process.argv[2]||path.join(root,"src","stockpile.html"), out=process.argv[3]||path.join(root,"index.html");const s=fs.readFileSync(src,"utf8");
new Function(s.split("<script>")[1].split("</script>")[0]);
const i=s.indexOf("</style>")+8;
fs.writeFileSync(out,`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
${s.slice(0,i)}
</head>
<body>${s.slice(i)}
</body>
</html>
`);console.log("built, syntax ok");
