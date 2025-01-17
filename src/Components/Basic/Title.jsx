function Title({
    text,
    css,
    children,
    El = "h1"
}) {


    return (

        <El className={`fw-b tt-u ${css} general-text`}>

            {children}

            {text}

        </El>

    );
}

export default Title;