
const SigninForm = (props) => {

    return (
        <>
            <button onClick={props.toSignup}>Create a new account</button>
            <h2 className="center">
                Sign-in
            </h2>
        </>
    )
}

export default SigninForm