npx create-next-app  [app-name]
    npm i next-auth         npm i mongodb           npm i bcryptjs
        npx next dev

npm run build       npm start

useSession ReactJS hook that works only on client that returns states which helps you to update UI and it's made on top of getSession
        - vs -
getSession async function that read current cookies and returns session, works both on Client and Server

401     not authenticated
403     not authorized/forbidden
422     input incorrect

I.      HomePage        pages/index

II.     Layout          components/layout/Layout -> MainNav 

III.    _app    
            wrap inside SessionProvider, then inside Layout

IV.     styles for the above pages and components



