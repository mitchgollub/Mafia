import Link from 'next/link';
import Header from '../components/header'

function Index() {
    return (
        <div>
            <Header />
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
        </div>
    );
}

export default Index;