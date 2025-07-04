import Link from "next/link";

const SpotifyPreviewBanner = () => {
    return (
        <Link href={'/signup'} className="bottom-banner">
            <div>
                <h4 className="font-semibold text-sm">Preview of Spotify</h4>
                <p className="text-sm">
                    Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
                </p>
            </div>

            <button className="btn">
                Sign up free
            </button>
        </Link>
    );
};

export default SpotifyPreviewBanner;
