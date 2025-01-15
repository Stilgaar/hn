
function CardLayout({
    children,
    css = "",
    bg = "bg-white",
    El = "div",
    padding = "p-1"
}) {


    return (

        <El className={`${css} ${padding} general-card ${bg}`}>

            {children}

        </El>
    );
}

export default CardLayout;


