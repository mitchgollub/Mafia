import Link from 'next/link';

function Index() {
    return (
        <div>
            <h1>Welcome to Mafia</h1>
            <Link href="narrator"><a>Start a game</a></Link>
            <Link href="join"><a>Join a game</a></Link>
        </div>
    );
}

export default Index;