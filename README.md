# Innowise Lab Internship: Level 2: Mini-paint

This project was created with React and Firebase.

[Demo](https://vitali-kruchkou.github.io/Innowise-Lab-Internship-Level-2-Mini-paint/)

## Available Scripts

1. Clone the develop branch.

`$ git clone https://github.com/vitali-kruchkou/Innowise-Lab-Internship-Level-2-Mini-paint -b develop`

2. Go to the directory

`$ cd Innowise-Lab-Internship-Level-2-Mini-paint`

3. Install the npm modules

`$ npm install`

4. **For working locally add .env file with firebase API keys.**

Create .env file by type

`REACT_APP_API_KEY=your API key`

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
App is ready to be deployed!

## Architecture solution

### Component folder

Component folder usually contains 2 files: .jsx/.tsx and .js/.ts ; there files and the folder are named with component name (f.e.
PageContent /
PageContent.jsx
StyledPageContent.js
)

## Database snapshot

    └──users
        └──userId
    	    ├──displayName
    	    └──email

## Storage snapshot

    └──images
        └──userId
    	    └──picId

## Application stack

List of packages I used for this app

### React-router-dom

Used to add routing

### Styled components

Used for style components

### React-hot-toast

Use to add Toast messages

### Redux & React-Redux

Used to provide the data

### React-app-rewire-alias

Used to add alias in our application

## Folders structure

    └──src                            #Main folder for source code
        ├──assets                     #Contains Icons
        ├──firebase                   #Contains firebase init script
        ├──modules                    #Contains the main component of the application
            ├──Authentication         #Contains the main components for authorization
            ├──PasswordReset          #Password reset component
            ├──SignIn                 #Sign In component
            ├──SignUp                 #Sign Up component
            └──Authentication.jsx
        └──Paint                      #Contains the main component for painting
            ├──Canvas                 #Canvas component
            ├──Gallery                #Gallery component
            ├──Toolbar                #Toolbar component
                ├──Tools                #Tools components
            └──Paint.tsx
        ├──routes                     #Routing files
        ├──store
            ├──actions                #Actions component
            ├──reducers               #Reducers component
            └──index.ts               #Store
        ├──types                      #Contains the main types
        └──index.js

## Styling

We use styled-components and ant design to work with styles in our application;

## Code formatting

This project contains .prettierrc file and .eslintrc.js file; it describes rules for Prettier code formatter and ESlint; according to these rules we are able to keep Code formatting the same for every project developer;
