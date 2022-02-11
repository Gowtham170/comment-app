# comment-app

step-1: Download the zip file. After,downloading it has one folder called comment-app-main 

step-2: open the terminal navigate to that folder(cd comment-app-main) it has two folders, one for the client and the another for the server-side.

step-3: Give a command cd comment_app_services from your terminal to navigate to the server-side folder.

step-4: open the code in your text editor and go the environment variable file(comment_app_services -> .env).

step-5: After that replace the mongoDB connecting string(MONGODB_URL) with your mongoDB connection string.

step-6: Now, give the 'npm start' command from the terminal, that will start the server and the logs the url of the server(Server is running on the http://localhost:5000) and the confirmation of the db connection(MongoDB Connected) on your terminal.

step-7: Next, open another terminal and navigate to the client folder(cd comment_app_client).

step-8: After that give the 'npm start' command to start the client. It will start the development server and open the application in the default browser.
