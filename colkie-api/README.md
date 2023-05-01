## Questions ? ##
Attila Fricz +34-623 1917 89 (WhatisApp) is available.
attila.fricz@gmail.com

## Install ##
    - setup docker,git in your computer
    - clone project from Github https://github.com/africz/colkie
      git clone git@github.com:africz/colkie.git 

    - run docker desktop first
    if it has conflict with docker engine
    stop docker engine with sudo systemctl stop docker.

    - launch in project root folder build script with parameter api
    ./build api
    other parameter is db if you need to build a custom build db image.

    - start docker system with ./st bash script. 
    I didn't set application to autostart in the container, more informative and more convience to me if I run it by myself in a terminal 
    window and I able to see the application messages in terminal window while I develop the application.

    - import initial database
    use ./dbi colkie-init.sql to import initial database
    sql file must be exists in colkie-api/sql folder

## Run application ##
    - launch ./r to run the application
    - launch your browser on http://localhost:8080 
    application can handle https protocol for production environement, but for simplicity in development 
    I am using here http.
    - follow the on screen instructions on main page
    - explore open Api explorer to try available API calls
    - JSDOC to read the generated document from source code
## Run tests ##
    - launch ./t 
## Authentication ##
    - initial username and password for authentication is  africz/africz
    this can be changable with /users/createUser api call and store the
    new one in src/config.json test section.
    - authentication use webtoken jwt.io to authenticate each of the api calls.
    - before call any api call you need to call /users/authUser to retrieve a valid
    token and used the this token in the next call token field.
## Documentation ##
    You can read in the source code all important notes and read in JSDOC on the main page.
    API call description and opportunity to execute them in API Explorer 
    http://localhost:8080/explorer
### Create a user ###
    Please read section authentication first!
    - call /users/authUser
    - call /users/createUser
### Create a room ###
    edit src/config.json room section id array.
### Add user to a room ###
    Please read section authentication first!
    Valid room ids in config.json
    - call /users/authUser
    - call /room/addUser
### Send a message to a room ###
    Please read section authentication first!
    Valid room ids in config.json
    - call /users/authUser
    - call /room/addUser
    - call /room/sendMessage
### Retrieve messages from room(s) ###
    Please read section authentication first!
    Valid room ids in config.json
    Sending messages only possible for those users who are
    already in roomuser table added by /room/addUser call.
    - call /users/authUser
    - call /room/getMessages
    Limit and start values are mandantory, limit must be bigger than zero and less than 250.
    This maximum limit is configurable in config.json room section max_limit entry.
    Start value is hold the room table id. Start and limit provide the functionality 
    for pagging for the frontend. Max_limit ensure the communication channel is not overloaded
    by tons of messages.

## Database ##
    - coolkie database
        - room      - chat rooms hold the messages
        - roomuser  - logged in users to different rooms 
        - user      - users of the system
        
        use ./dbi colkie-init.sql to import initial database
        sql file must be exists in colkie-api/sql folder

## Logging ##
    Logging system features.
    - store log files in project root/log folder.
    - node-roll-<date> hold the current application log
    - stream-roll-<date> not functional here hold the front end log.
      I did remove partially this function to make this project simplier.
      Generally in my system frontend log send the log thru an API call to an
      instance of this server run on port 2000 and handle only front end logs.
    - send emails on fatal level errors , removed also from here.
    - log by modules not used here.Useful to make sepate logs by anything by classes
      users etc.
    - log slow execution not used here also.  
    - insert into log the source code line number to identify problems more accurate
    - insert into log the authenticated user name, not used here. 
    - turn on/off levels in a running program not only at start, also not used here.
    - Log levels:
        - fatal I use it only for serious event that need immediatelly attention to support department
        - error all errors logged at that point where is the error happened.
        - info usually I use it to follow the the information flow, if a new developer arrive he can
          turn it on this level and study the log what happening in the system, but without any extra
          information just the pure flow.
        - debug this level for debugging purpses should contain all parameter passing and returning on
          main functions, frequently called helper functions are not including.
        - trace pretty much everything like a step by step debugger.
        Is this extensive logging make the system slow ? 
        In development environment yes, on production no, due error level should not create many I/O 
        requests.
        Turn on/off on the fly provide functionality we can use it when need trouble shooting without 
        restarting the application. 
        warn this level I use for easy to read current debugging scope and I did swithc to trace once
        trouble shooting is done.
        On a production system catch the trouble makers easy and fast with this extensive logging system
        much faster than with remote debugging only.Also very helpful if the problem is timming,parallel
        executing or rare edge cases that not always happening.
        




