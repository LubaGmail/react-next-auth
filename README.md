npx create-next-app  [app-name]
    npm i next-auth         npm i mongodb           npm i bcryptjs
        npx next dev

npm run build       npm start

useSession ReactJS hook that works only on client that returns states which helps you to update UI and it's made on top of getSession
        - vs -
getSession async function that read current cookies and returns session, works both on Client and Server

justify-content: (horizontally)   vs   align-items: (vertically)   

401     not authenticated
403     not authorized/forbidden
422     input incorrect

I.      HomePage        pages/index

        i.     Layout          components/layout/Layout -> MainNav 

        ii.    _app    
                wrap inside SessionProvider, then inside Layout

        iii.    styles for 
                a)     styles/global.css 
                b)     HomePage
                c)     Layout and MainNav

        iv.     Add links to pages

II.     pages/auth.js

        op === 'signup' or 'signin'
        
        i.      pages/auth/     ->      <SignupForm />       ->       pages/api/auth/signup.js
                form: email, pass, repeatPass, submit, clear, toSignin

        ii.     pages/auth/     ->      <SigninForm />       ->      pages/api/auth/signin.js
                form:   email, pass, submit, clear, toSignup

III.    Profile
        i.      pages/profile   ->      components/profile/user-profile <--> profile.form    <-->       pages/api/users/change-pass
        ii.     styles

IV.     Signout

VI.     Meta


        







