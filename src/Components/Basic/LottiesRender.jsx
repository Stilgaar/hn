import Lottie from "react-lottie";

function LottiesRender({ icon, height = 50, width = 50 }) {

    if (!icon) return

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: icon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (

        <Lottie height={height} width={width} options={defaultOptions} />
    );
}

export default LottiesRender;