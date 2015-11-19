# Summary #
This page contains the description of how to set up the necessary tools in order to start developing software for Web-OPM.

---

# Contents #
  1. Setting the Version Control System (VCS)
  1. Setting the Server side
    * Python 2.7
    * Google App Engine for Python
    * Jinja2
    * JSON and JSONPickle
  1. Setting the Client Side
    * Eclipse IDE
    * Eclipse Pydev Plug-in
    * Eclipse Web Tools Plug-in
    * Eclipse Mercurial Plug-in
  1. Checking out the project
  1. Launching the project on localhost

---

<br />
# Setting the Version Control System (VCS) #
The current VCS tool  for the project is Mercurial.
It can be downloaded from the official web-site http://mercurial.selenic.com/downloads/. Then follow the regular installation procedure. Nothing else is needed.
In order to check that Mercurial is successfully installed, launch Terminal (Unix) or Command Prompt(Win: Start->Run->cmd) and type there 'hg'.
The correct output should start with: <br />
Mercurial Distributed SCM ...<br />
# Setting the Server Side #
## Python 2.7 ##
Basic language of the server side is Python 2.7. Nothing is going to work w/o it. Nothing tricky about Python installation either. Download the necessary flavor at http://www.python.org/download/ (Windows or MacOS, Linux goes pre-installed with Python) and simply install.
## Google App Engine (GAE) ##
First, GAE should be downloaded from https://developers.google.com/appengine/downloads.

Please make sure you are downloading GAE SDK for Python!

During the installation it's important to set that Python path for GAE, which the application uses. In our case it's Python2.7.

The default Windows path: C:\Program Files\Python2.7\pythonw.exe.

The launching icon of GAE should appear at Start->Programs->GAE Launcher.
## Jinja2 ##
Jinja2 is a modern and designer friendly templating language for Python.
The installation manual is at http://jinja.pocoo.org/docs/intro/#installation<br />
**For those installing in the Windows Environment:**<br />
1. First download and unpack this Distribute package at http://pypi.python.org/pypi/distribute#downloads.<br />
2. Download and unpack the Jinja2 install at http://pypi.python.org/pypi/Jinja2#downloads<br />
To install a Python package load the command-line as an Administrator and type: `python setup.py install`.<br />
You should replace "python" with the direct path the Python interpreter location (e.g. `C:\Python2.7\python`).
<br />
## JSON and JSONPickle ##
JSON and JSONPickle are both used to package the messages sent from the Client side (JSON) and from the Server side (JSONPickle).<br />
To implement JSON on the client side, we included the JSON scripts (available in the Source section under `js`)<br />
**Implementing JSONPickle:**<br />
1. Download the JSONPickle package from http://pypi.python.org/pypi/jsonpickle/<br />
2. Install in the same manner as Jinja2.<br />
<br />
# Setting the Client Side #
## Eclipse IDE ##
Download Eclipse Classic at http://www.eclipse.org/downloads/.

Eclipse doesn't require any installation process.
## Pydev Plug in ##
Pydev is a Python IDE for Eclipse. In order to start using Pydev, two things are need to be done: a) download Pydev from Eclipse, b) configure it. The manual for step a) is available at  http://pydev.org/manual_101_install.html. For configuration of Python interpreter, see instructions here: http://pydev.org/manual_101_interpreter.html.
## Web Tools Plug in ##
Web Tools Platform(WTP) extends Eclipse IDE to enable the support of HTML, Javascript, CSS and XML.
WTP is contained in the release of the Eclipse version that you've installed.
For installation WTP go: Help->Install new software...
In the field 'Work with:' choose the version of Eclipse that you have. E.g. Indigo - http://download.eclipse.org/releases/indigo.
In the list of packages below, choose expand 'Web, XML, Java EE and OSGi Enterprise Development' and find 'Eclipse Web Developer Tools'.
Press 'Next' and proceed with further instructions of installation.
## Mercurial Plug in ##
Mercurial Eclipse http://javaforge.com/project/HGE is a plugin providing support for the Mercurial distributed version control system within the Eclipse IDE.
The installation process happens from the Eclipse IDE as well.
Go to Help->Install new software... Click button 'Add' and type for the Name: Mercurial, Location: http://hge.javaforge.com/hgeclips. Proceed with installation process.
# Checking out the project #
Now, when all necessary tools are installed, you are ready to clone the project. For this, open Eclipse IDE and click File->New->Other...
Choose 'Clone Existing Mercurial Repository' and click 'Next'.
Go to http://code.google.com/p/web-opm and enter with your google account. Go to the tab 'Source' and copy the link that you see theroccurede( e.g. 'https://google%40account.net@code.google.com/p/web-opm/ ') to the dialog window in the Eclipse IDE. It will retrieve username from the link automatically. Go back to Google Code Repo and click on 'googlecode.com password.' link. In bold you will see the password which you need to enter in Eclipse IDE. Check at Checkout as a project in the workspace and click 'Next'. Choose the branch 'default' and click 'Next' and then 'Finish'.
**Please, do NOT commit into default, create a separate branch**.
# Launching the project at localhost #
In order to check how your code looks like in browser, launch GAE Launcher from Start->Programs. Click File->Add Existing Application and choose the path to your project. Set the port, it's 8080 by default and click 'Add'.
The added app should appear in the window. Click on it and press Run. Open your browser and type address: 'http://localhost:8080'. You should see the application running. Otherwise, you should see the trace log of occurred error.