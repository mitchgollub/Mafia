import Link from 'next/link';

function Index() {
    return (
        <div>
            <div className={'container'}>
                <div className={'flex-item__grow'}></div>
                <div className={'flex-item'}>
                    <h1 style={{ textAlign: 'center', marginBottom: '64px' }}>Welcome to Mafia</h1>
                    <div className={'container'}>
                        <div className={'flex-item__grow button'}>
                            <Link href="narrator"><a style={{ textAlign: 'center' }}>Start a game</a></Link>
                        </div>
                        <div className={'flex-item__grow button'}>
                            <Link href="join"><a style={{ textAlign: 'center' }} className={'flex-item'}>Join a game</a></Link>
                        </div>
                    </div>
                </div>
                <div className={'flex-item__grow'}></div>
            </div>

            <style jsx>{`
                body {
                    background-color: yellow;
                }
                .button {
                    background-color: pink;
                    padding: 20px;
                    margin: 20px;
                    text-align: center;
                }
                .container {
                    display: flex;
                }
                .container-column {
                    display: flex;
                    flex-direction: column;
                }
                .flex-item {
                    flex: auto;
                }
                .flex-item__grow {
                    flex-grow: 1;
                }
                `}</style>
        </div>
    );
}

export default Index;