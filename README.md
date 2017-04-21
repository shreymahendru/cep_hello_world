#Documentation For CEP.

##Set up dev environment:

1. Check if CEP directory exists in route:
  /Library/Application Support/Adobe/

2. Copy the CEP folder from the above route to:
  ~/Library/Application Support/Adobe/

3. Extensions are not loaded by Adobe applications if they are not signed.
  But for development purposes set the adobe Player in debug mode by command:
      defaults write com.adobe.CSXS.7 PlayerDebugMode 1

4. Copy the extension to route:
    ~/Library/Application Support/Adobe/extensions/

5. Open Indesign and look for the extension under window menu > extensions > your_extension

#Links:

<https://medium.com/@HallgrimurTh/extending-adobe-cc-2014-apps-ba1d101e27da#.n515nswd1>
<https://github.com/majman/adobe-scripts-panel/blob/master/README.md>

<http://www.adobe.com/devnet/creativesuite/articles/a-short-guide-to-HTML5-extensions.html>
(deprecated adobe docs,
Project structure and Manifest file structure and explanation is correct here)
<https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CEP_7.0_HTML_Extension_Cookbook.pdf>

**Holy Grail** for the extendScript SDK:
<http://www.indesignjs.de/extendscriptAPI/indesign12/#about.html>

***NOTE:*** The Manifest file has to be correct without errors in order for the extension to be loaded

Some extend Script Docs
<http://yearbook.github.io/esdocs/#/>

This guy is **GOD** when it comes to Adobe 
<http://www.davidebarranca.com/>

This Link is on using external frameworks like React, etc for the UI

In order debug and see logs for log extendScript:
Use ExtendScript Toolkit 
